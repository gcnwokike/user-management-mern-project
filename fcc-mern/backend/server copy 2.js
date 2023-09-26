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

app.get("/api/users", (req, res) => {
  var pageNo = parseInt(req.query.page);
  var size = parseInt(req.query.per_page);
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1"
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  // Find some documents
  User.find({}, {}, query, function(err, data) {
    // Mongo command to fetch all data from collection.
    if (err) {
      response = { error: true, message: "Error fetching data" };
    } else {
      response = { error: false, message: data };
    }
    res.json(data);
  }).select("-password");
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
