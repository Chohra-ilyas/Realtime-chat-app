import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getMessages,
  getUsersForSideBar,
  markMessagesAsSeen,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", authMiddleware, getUsersForSideBar);
messageRouter.get("/:id", authMiddleware, getMessages);
messageRouter.put("/mark-seen/:id", authMiddleware, markMessagesAsSeen);



export default messageRouter;
