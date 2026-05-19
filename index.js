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
        /https:\/\/messapp-.*\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'POST,GET,PATCH,DELETE,HEAD,OPTIONS',
  credentials: true,
}