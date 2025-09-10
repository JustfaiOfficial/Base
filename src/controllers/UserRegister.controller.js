const bcrypt = require("bcryptjs");
const Signup = require("../models/Signup.js");

async function usersignup(req, res) {
  try {
    const {
      email,
      password,
      FullName,
      experienceYears,
      availability,
      PhoneNumber,
      Username,
      Skills,
      AboutMe,
      Country,
      Language,
      Title,
      portfolioFiles,
      resumeFile,
      hourlyRate,
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const freelancer = new Signup({
      email,
      password: hashedPassword,
      FullName,
      experienceYears,
      availability,
      PhoneNumber,
      Username,
      Skills,
      AboutMe,
      Country,
      Language,
      Title,
      portfolioFiles,
      resumeFile,
      hourlyRate,
    });

    const savedFreelancer = await freelancer.save();

    res.status(201).json({
      success: true,
      message: "Freelancer registered successfully",
      data: savedFreelancer,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email, Phone, or Username already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to save freelancer",
      error: err.message,
    });
  }
}

module.exports = { usersignup };
