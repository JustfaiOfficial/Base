const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const freelancerRoutes = require("./src/Route/FreelancerRoutes.routes.js");

dotenv.config();
const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://justfaitech.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/api/signup/freelancers", freelancerRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// ❌ No app.listen() in Vercel serverless
module.exports = app;
