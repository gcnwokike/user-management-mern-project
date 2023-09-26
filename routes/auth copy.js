const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
var csv = require("fast-csv");
const db = require("../db/connect");
const randomstring = require("randomstring");

router.get("/", auth, async (req, res) => {
  try {
    db(req.user.oname);

    //const user = await Admin.findById(req.user.id).select("-password");
    const user = await User.find().select("-password");

    //console.log(user);

    res.json(user);
    await mongoose.connection.close(() => {
      console.log("connection closed");
    });
  } catch (err) {
    await mongoose.connection.close();

    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("oname", "Organzation name is required")
      .not()
      .isEmpty()
      .matches(/^[A-Za-z]+$/)
      .withMessage(
        "Orgainzation Name Should Have No Special Characters or Numbers in it for example @#$%^&*()_+<>?"
      ),
    check("password", "password is required")
      .not()
      .isEmpty(),
    check("email", "email is required ").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { oname, email, password } = req.body;

    db(oname);

    //See if the user Exists, if user exist return a respone with error
    try {
      let user = await Admin.findOne({ email });
      let org = await Admin.findOne({ oname });

      if (!org) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials Organization Does not Exist" }]
        });
      }
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }]
        });
      }

      //Check if password is accurate

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
          oname: user.oname
        }
      };

      jwt.sign(
        payload,
        "mysecretetoken",
        { expiresIn: 500000 },
        (err, token) => {
          if (err) throw err;
          res.header = { "x-auth-token": token };
          return res.json({ token });
        }
      );

      await mongoose.connection.close();

      // try not to keep token in code
    } catch (err) {
      await mongoose.connection.close();

      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.delete("/delete/:id", auth, (req, res) => {
  db(req.user.oname);

  User.findByIdAndDelete(req.params.id)
    .then(() => {
      mongoose.connection.close();
      return res.send("User Deleted!");
    })
    .catch(err => {
      mongoose.connection.close();

      return res.status(400).json("Error: " + err);
    });
});

router.post(
  "/create",
  [
    auth,
    [
      check("fname", "first name is required")
        .not()
        .isEmpty(),
      check("lname", "last name is required")
        .not()
        .isEmpty(),
      check("password", "password must be at least 6 characters long").isLength(
        {
          min: 6
        }
      ),
      check("email", "Invalid email input, email is required").isEmail()
    ]
  ],
  async (req, res) => {
    db(req.user.oname);

    // db("uba");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send("Invalid input check your input fields and try again!!");
    }

    //else
    //console.log(req.body);

    const { fname, lname, email, password } = req.body;
    if (!password) {
      return res.send(" User Must Have a password When Creating New User");
    }
    let user = new User({
      _id: new mongoose.Types.ObjectId(),
      fname,
      lname,
      email,
      password
    });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    await mongoose.connection.close();

    return res.send("User Created");
  }
);

router.post("/update/:id", auth, async (req, res) => {
  db(req.user.oname);

  if (!req.body.password) {
    User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email
      }
    )
      .then(() => {
        mongoose.connection.close();

        return res.json("Users updated!");
      })
      .catch(err => {
        mongoose.connection.close();

        return res.status(400).json("Error" + err);
      });
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);

    encryptedPassword = await bcrypt.hash(req.body.password, salt);

    User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: encryptedPassword
      }
    )
      .then(() => {
        mongoose.connection.close();

        return res.json("Users updated!");
      })
      .catch(err => res.status(400).json("Error" + err));
  }
});

router.post("/upload", auth, async (req, res) => {
  db(req.user.oname);

  if (!req.files) return res.status(400).send("No files were uploaded.");

  var userFile = req.files.file;

  var users = [];

  csv
    .parseString(userFile.data.toString(), {
      headers: true,
      ignoreEmpty: true
    })
    .on("data", async function(data, err) {
      data["_id"] = new mongoose.Types.ObjectId();

      //      data["email"] = data.email.toLowerCase();
      // console.log(users);
      //console.log(data["password"]);
      const salt = await bcrypt.genSalt(10);

      var password = data["password"];

      //data["password"] = randomstring.generate(7);

      data["password"] = await bcrypt.hash(password, salt);
      users.push(data);

      //console.log(data["password"]);
      //console.log(users.email);
      //console.log(users);
      //console.log(users);
    })
    .on("end", async function() {
      console.log(users);
      await User.create(users, async function(err, documents) {
        console.log("Reached Here");
        if (err) {
          //console.log(err);
          //console.log(err.message);
          //mongoose.connection.close();
          await mongoose.connection.close();

          return res.send(
            "File Error!! your upload does not match the required specifications plese visit the <a href='http://google.com'>link </a> and modify your file to the indicated specifications"
          );
        }

        const nosofusers = await User.countDocuments();
        await mongoose.connection.close();

        return res.send(nosofusers + " Users have been successfully uploaded.");
      });
    });
});

module.exports = router;
