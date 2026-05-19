const mongoose = require("mongoose");

const menuDetailsSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  morning: {
    Monday: [{ type: String, required: true }],
    Tuesday: [{ type: String, required: true }],
    Wednesday: [{ type: String, required: true }],
    Thursday: [{ type: String, required: true }],
    Friday: [{ type: String, required: true }],
    Saturday: [{ type: String, required: true }],
    Sunday: [{ type: String, required: true }],
  },
  evening: {
    Monday: [{ type: String, required: true }],
    Tuesday: [{ type: String, required: true }],
    Wednesday: [{ type: String, required: true }],
    Thursday: [{ type: String, required: true }],
    Friday: [{ type: String, required: true }],
    Saturday: [{ type: String, required: true }],
    Sunday: [{ type: String, required: true }],
  },
});

const MenuDetail = mongoose.model("MenuDetail", menuDetailsSchema);

module.exports = MenuDetail;
