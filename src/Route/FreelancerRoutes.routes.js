// routes/FreelancerRoutes.routes.js
const express = require("express");
const { usersignup } = require("../controllers/UserRegister.controller");

const router = express.Router();
router.post("/register", usersignup);

module.exports = router;
