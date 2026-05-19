const mongoose = require("mongoose")

const timeDetailsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    morning: {
        from: { type: String, required: true },
        to: { type: String, required: true },
    },
    evening: {
        from: { type: String, required: true },
        to: { type: String, required: true },
    },
    holiday: {
        day: { type: String, required: true },
        period: { type: String, required: true },
    }
})

const TimeDetail = mongoose.model("TimeDetail", timeDetailsSchema)

module.exports = TimeDetail;
