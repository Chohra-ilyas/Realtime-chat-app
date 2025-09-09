import express from "express";
import { updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.put("/update-profile", authMiddleware, updateProfile);

export default userRouter;
