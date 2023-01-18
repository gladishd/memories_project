const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  name: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
})

const Voter = mongoose.model("voter", voterSchema);

module.exports = Voter;
