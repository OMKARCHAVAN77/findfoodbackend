require('dotenv').config();
const express = require("express");
const app = express();
const dbConnect = require("./DB/db");
const router = require('./routes/authRoutes');
const messDataRoutes = require('./routes/messFormRoutes');
const customerRoute = require("./routes/customerRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ✅ COOP header fix
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

// ✅ FIXED CORS — allow all Vercel preview URLs
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:4200',
      'https://messapp-mu.vercel.app',
      'https://messapp-8uim2u24z-omkarchavan77s-projects.vercel.app',
      'https://messapp-639d49dw2-omkarchavan77s-projects.vercel.app'
    ];

    // ✅ Allow requests with no origin (mobile apps, postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // ✅ Allow all vercel preview deployments automatically
      if (origin.includes('omkarchavan77s-projects.vercel.app') ||
          origin.includes('messapp-mu.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.options('*', cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.includes('omkarchavan77s-projects.vercel.app') ||
        origin.includes('messapp-mu.vercel.app') ||
        origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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