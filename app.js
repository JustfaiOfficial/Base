const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const freelancerRoutes = require("./src/Route/FreelancerRoutes.routes.js");

dotenv.config();
const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://justfaitech.vercel.app"  // frontend on Vercel
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// ✅ Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ Routes
app.use("/api/signup/freelancers", freelancerRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// ❌ No app.listen on Vercel
module.exports = app;
