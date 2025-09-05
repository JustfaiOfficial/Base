import express from "express";
import { usersignup } from "../controllers/UserRegister.controller";
const router=express.Router();
router.post("/register",usersignup)

export default router;
