const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema(
  {
    groupname: {
      type: String,
      required: true
    },
    groupcreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    private: {
      type: false
    },

    members: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

module.exports = Group = mongoose.model("group", GroupSchema);
