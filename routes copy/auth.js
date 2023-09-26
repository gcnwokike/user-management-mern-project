const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("oname", "Organzation name is required")
      .not()
      .isEmpty(),
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

    //See if the user Exists, if user exist return a respone with error
    try {
      let user = await User.findOne({ email });
      let org = await User.findOne({ oname });

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
        { expiresIn: 50000 },
        (err, token) => {
          if (err) throw err;
          res.header = { "x-auth-token": token };
          return res.json({ token });
        }
      );

      // try not to keep token in code
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
