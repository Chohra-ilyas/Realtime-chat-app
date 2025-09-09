import express from "express";

const userRouter = express.Router();
import { updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

userRouter.put("/update-profile", authMiddleware, updateProfile);

export default userRouter;
