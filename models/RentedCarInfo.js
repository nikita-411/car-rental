const mongoose = require("mongoose");

const booking = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  v_number: {
    type: String,
    required: true
  },
  issue_date: {
    type: Date,
    require: true
  },
  return_date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("RentedCarInfo", booking);
