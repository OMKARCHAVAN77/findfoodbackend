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
      'https://messapp-mu.vercel.app'
    ];
    if (!origin ||
        allowedOrigins.includes(origin) ||
        /https:\/\/messapp.*\.vercel\.app$/.test(origin) ||
        /https:\/\/.*omkarchavan77s-projects\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  credentials: true,
  optionsSuccessStatus: 200  // ✅ fixes preflight for older browsers
}

// ✅ Must be before everything else
app.use(cors(corsOption));

// ✅ Handle ALL preflight requests immediately
app.options('*', cors(corsOption));

app.use(cookieParser());
app.use(express.json());
app.use(express.text());

app.use("/api/user/", router)
app.use("/api/user/", messDataRoutes)
app.use("/api/user/", customerRoute)

dbConnect()

module.exports = app;