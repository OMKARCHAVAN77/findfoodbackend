const mongoose = require("mongoose");

const messDetailsSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  messName: {
    type: String,
    required: true,
  },
  address: {
    shopNumber: {
      type: Number,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
  },
  contact: {
    mobileNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  license: {
    licenseNumber: {
      type: String,
      required: true,
    },
    licenseImage: {
      type: String,
      required: true,
    },
  },
  foodType: {
    type: String,
    required: true,
  },
  messImages: [
    {
      type: String,
      required: true,
    },
  ],
});

const MessDetail = mongoose.model("MessDetail", messDetailsSchema);

module.exports = MessDetail;
