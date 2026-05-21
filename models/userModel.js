const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    googleId: {
        type: String
    },
    email: {
        type: String
    },
    photo: {
        type: String
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;