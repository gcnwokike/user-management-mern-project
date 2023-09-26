const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      admin: false,
      genuser: false,
      agent: false
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = User = mongoose.model("user", UserSchema);
