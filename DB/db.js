const mongoose = require("mongoose")

let isConnected = false;

const dbConnect = async() => {
    if (isConnected) {
        console.log("Using existing connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
        })
        isConnected = db.connections[0].readyState === 1;
        console.log("Database connected successfully ✅")
    } catch (error) {
        console.log("Database connection error:", error);
        throw error;
    }
}

module.exports = dbConnect;