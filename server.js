const express = require("express");
//const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const cfbRouter = require("./routes/cfb.js");
var fileUpload = require("express-fileupload");

const app = express();
const cors = require("cors");
const helmet = require("helmet");

app.use(fileUpload());
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use(helmet.hidePoweredBy());

app.use(helmet.hidePoweredBy({ setTo: "PHP 7.1.0" }));

app.use(express.json({ extended: false }));
const PORT = 5000; //process.env.PORT || 5000;
//const MONGO_URI = "mongodb://localhost:27017/next6"; //process.env.MONGO_URI || "mongodb://localhost:27017/app";

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/cfb", cfbRouter);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
