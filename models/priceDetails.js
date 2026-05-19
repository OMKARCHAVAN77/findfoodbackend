const mongoose = require("mongoose");

const priceDetailsSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  monthlyCharges: {
    type: String,
    required: true,
  },
  singleDayCharges: {
    type: String,
    required: true,
  },
  specialDayVegCharges: {
    type: String,
    required: true,
  },
  specialDaynonVegCharges: {
    type: String,
    required: true,
  },
});

const PriceDetail = mongoose.model("PriceDetail", priceDetailsSchema);

module.exports = PriceDetail;
