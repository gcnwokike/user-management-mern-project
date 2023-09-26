const mongoose = require("mongoose");

const RolesSchema = mongoose.Schema({
  admin: false,
  genuser: false,
  agent: false
});

module.exports = Role = mongoose.model("role", RolesSchema);
