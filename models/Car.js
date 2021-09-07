const mongoose = require("mongoose");

const car_schema = new mongoose.Schema({
  v_number: {
    type: String,
    required: true,
    unique: true
  },

  model: {
    type: String,
    required: true
  },

  seats: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },

  rent_per_day: {
    type: Number,
    required: true
  },

  booking_status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Car", car_schema);
