const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');


const connectDB = require("./src/config/db.js");
const freelancerRoutes = require("./src/Route/FreelancerRoutes.routes.js"); // ✅ fix path (Route vs routes)

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// DB connection
connectDB();
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // if you need cookies/auth headers
}));

// Routes
app.use("/api/signup/freelancers", freelancerRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
