import express from "express";

const authRoutes = express.Router();
import { signUp, login, checkAuth } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

authRoutes.post("/register", signUp);
authRoutes.post("/login", login);
authRoutes.get("/check", authMiddleware, checkAuth);

export default authRoutes;
