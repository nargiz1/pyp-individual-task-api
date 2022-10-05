const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

module.exports = mongoose.model("User", userSchema);
