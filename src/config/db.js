require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("MONGO_URI=mongodb+srv://JUSTFAI:JUSTFAI123@cluster0.2diylnm.mongodb.net/test?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected");
  } catch (err) {
    console.log("❌ Failed to connect database", err);
  }
};

module.exports = connectDB;
