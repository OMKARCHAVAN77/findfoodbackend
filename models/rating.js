const mongoose = require("mongoose")

const ratingSchema = mongoose.Schema({
    customerUserId: {
        type: String,
        required: true
    },
    messUserId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Rating = mongoose.model("Rating", ratingSchema)

module.exports = Rating;
