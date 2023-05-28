const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Define your user schema fields here, e.g., username, password, etc.
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
