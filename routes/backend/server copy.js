const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
//const Group = require("./models/group.model");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ extended: false }));

(async () => {
  await mongoose.connect("mongodb://localhost:27017/next", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log("Mongodb Database Connected");
})();

app.post("/api/users", async (req, res) => {
  console.log(req.body);
  const { fname, lname, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.send("User already Exists!!");
  }
  const newUser = new User({
    fname,
    lname,
    password,
    email
  });

  newUser.save();
  res.json({ msg: req.body });
});

app.get("/api/users", async (req, res) => {
  const users = await User.find().select("-password");
  if (users) {
    return res.json(users);
  }

  res.json("No users found");
});

/* const myName = new User({
  fname: "Giacomo",
  lname: "Nwokike",
  password: "123456",
  email: "u@u.com"
});

myName.save(); */

app.get("/", (req, res) => {
  res.send("This Here Now is the Homepage");
});

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
