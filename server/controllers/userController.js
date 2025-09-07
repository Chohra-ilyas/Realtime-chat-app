import { generateToken } from "../lib/utils";
import User, { signUpValidationSchema } from "../models/User";
import bcrypt from "bcryptjs";

//Sign Up a User
export const signUp = async (req, res) => {
  const { error } = signUpValidationSchema(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }
  const { email, fullName, password, bio } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
    res
      .status(500)
      .json({ success: false, message: "Error signing up user", error });
  }
};
