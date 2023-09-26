const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
    trim: true
  },
  lname: {
    type: String,
    require: true,
    trim: true
  },
  oname: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

AdminSchema.indexes({ email: 1, oname: 1 }, { unique: true });

module.exports = Admin = mongoose.model("admin", AdminSchema);
