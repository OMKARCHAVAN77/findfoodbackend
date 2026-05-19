const mongoose = require("mongoose")

const viewsSchema = mongoose.Schema({
    customerUserId: {
        type: String,
        required: true
    },
    messUserId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const View = mongoose.model("View", viewsSchema)

module.exports = View;
