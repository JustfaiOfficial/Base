const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./src/config/db.js");
const freelancerRoutes = require("./src/Route/FreelancerRoutes.routes.js");

dotenv.config();
const app = express();

// ✅ Place CORS middleware at the very top
const allowedOrigins = [
  "http://localhost:3000",          // local dev
  "https://justfaitech.vercel.app"  // Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// ✅ Handle preflight requests globally
app.options("*", cors());

// Middleware
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/api/signup/freelancers", freelancerRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
