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
  // ✅ NOT required — only filled when mess type is Non-veg
  specialDaynonVegCharges: {
    type: String,
    required: false,
    default: "0",
  },
});

const PriceDetail = mongoose.model("PriceDetail", priceDetailsSchema);

module.exports = PriceDetail;