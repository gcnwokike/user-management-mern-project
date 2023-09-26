const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
router.get("/", (req, res) => {
  res.send("User Route");
});

router.post(
  "/",
  [
    check("fname", "first name is required")
      .not()
      .isEmpty(),
    check("lname", "last name is required")
      .not()
      .isEmpty(),
    check("oname", " organization name is required")
      .not()
      .isEmpty(),
    check("password", "password must be at least 6 characters long").isLength({
      min: 6
    }),
    check("email", "Invalid email input, email is required").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    const { fname, lname, oname, email, password } = req.body;
    //See if the user Exists, if user exist return a respone with error

    mongoose
      .connect(
        `mongodb://localhost:27017/${oname}`,
        //MONGO_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        },
        //() => {
        console.log("MongoDb Running..")
        //}
      )
      .catch(err => {
        console.log(err.message);
        process.exit(1);
      });

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // res.send("User Registered");

      //Get users gravatar

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      user = new User({
        fname,
        lname,
        oname,
        email,
        avatar,
        password
      });
      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // res.send("User Registered");

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
        { expiresIn: 50000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );

      // try not to keep token in code
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        errors: [{ msg: "Server Error!! Organization May Already Exist!!" }]
      });
    }
  }
);
module.exports = router;
