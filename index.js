require('dotenv').config();
const express = require("express")
const app = express()
const dbConnect = require("./DB/db");
const router = require('./routes/authRoutes');
const messDataRoutes = require('./routes/messFormRoutes')
const customerRoute = require("./routes/customerRoutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const corsOption = {
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:4200',
      'http://localhost:3000',
      'https://messapp-mu.vercel.app',  // ✅ main domain
      'https://messapp.vercel.app'       // ✅ possible alias
    ];
    if (!origin ||
        allowedOrigins.includes(origin) ||
        /https:\/\/messapp.*\.vercel\.app$/.test(origin) ||
        /https:\/\/.*omkarchavan77s.*\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked:', origin); // ✅ log blocked origins
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOption));
app.options('*', cors(corsOption));

dbConnect()

module.exports = app;
