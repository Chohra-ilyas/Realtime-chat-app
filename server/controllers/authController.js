import { generateToken } from "../lib/utils.js";
import User, {
  loginValidationSchema,
  signUpValidationSchema,
} from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * User signup controller
 * @route POST /api/users/auth/register
 * @access Public
 * @returns JSON response with user data and token or error message
 */
export const signUp = async (req, res) => {
  const { error } = signUpValidationSchema(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details: error.details[0].message,
    });
  }
  const { email, fullName, password, bio } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
      bio,
    });
    const token = generateToken(newUser);
    res.status(201).json({ success: true, user: newUser, token });
  } catch (error) {
    console.error("Error signing up user:", error);
    res
      .status(500)
      .json({ success: false, message: "Error signing up user", error });
  }
};

/**
 * Login controller
 * @route POST /api/users/auth/login
 * @access Public
 * @returns JSON response with user data and token or error message
 */
export const login = async (req, res) => {
  const { error } = loginValidationSchema(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details: error.details,
    });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = generateToken(user);
    res
      .status(200)
      .json({ success: true, user, token, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ success: false, message: "Error logging in user", error });
  }
};

/** * Check authentication status controller
 * @route GET /api/users/auth/check
 * @access Private
 * @returns JSON response with user data if authenticated
 */
export const checkAuth = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};
