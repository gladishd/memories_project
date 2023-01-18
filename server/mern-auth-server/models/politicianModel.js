const mongoose = require("mongoose");
// isPolitician variable todo
// Use the front-end to access the back-end! Set default isPolitician to false.
const politicianSchema = new mongoose.Schema({
  //Layer 2.
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  inOffice: {
    type: Boolean,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  personalPhone: {
    type: String,
    required: true
  },  // this is your personal phone number, for 2 Factor Authentication
  politicianId: {
    type: Number,
    required: true,
    default: -1
  }, // this is a little more complicated, than user id.
  idFront: {
    type: String,
    required: true
  },
  idBack: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  // Layer 3.
  bio: {
    type: String,
    required: false
  },
});

const Politician = mongoose.model("politician", politicianSchema);

module.exports = Politician;
