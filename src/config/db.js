// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongooseURL);
    console.log("✅ Database Connected");
  } catch (err) {
    console.log("❌ Failed to connect database", err);
  }
};

module.exports = connectDB;
