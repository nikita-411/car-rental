const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: mongoose.Schema.Types.String, required: true },
  password: { type: mongoose.Schema.Types.String, required: true },
  isAdmin: { type: Boolean, default: false },
  rentedCars: { type: String, default: null }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
