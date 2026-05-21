require('dotenv').config();
const express = require("express");
const app = express();
const dbConnect = require("./DB/db");
const router = require('./routes/authRoutes');
const messDataRoutes = require('./routes/messFormRoutes');
const customerRoute = require("./routes/customerRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ✅ COOP header fix — allows Google OAuth popup
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://messapp-mu.vercel.app',
    'https://messapp-8uim2u24z-omkarchavan77s-projects.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.options('*', cors({
  origin: [
    'http://localhost:4200',
    'https://messapp-mu.vercel.app',
    'https://messapp-8uim2u24z-omkarchavan77s-projects.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.text());

// Connect to database before every request
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    res.status(500).json({ success: false, msg: "Database connection failed" });
  }
});

app.use("/api/user/", router);
app.use("/api/user/", messDataRoutes);
app.use("/api/user/", customerRoute);

module.exports = app;