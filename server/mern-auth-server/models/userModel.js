const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Layer 1.
  // name: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    min: 2
  }, // this technically is the user id
  password: {
    type: String,
    required: true,
    min: 6
  },
  isPolitician: {
    type: Boolean,
    required: false,
    default: false
  }
})

const User = mongoose.model("user", userSchema);

module.exports = User;
