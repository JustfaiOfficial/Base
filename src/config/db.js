// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://JUSTFAI:JUSTFAI123@cluster0.2diylnm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ Database Connected");
  } catch (err) {
    console.log("❌ Failed to connect database", err);
  }
};

module.exports = connectDB;
