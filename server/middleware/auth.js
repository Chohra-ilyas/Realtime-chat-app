import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
