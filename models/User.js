const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

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
    uname: {
      type: String
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
  },
  {
    timestamps: true
  }
);

UserSchema.index({ email: 1 }, { unique: true });

module.exports = User = mongoose.model("user", UserSchema);
