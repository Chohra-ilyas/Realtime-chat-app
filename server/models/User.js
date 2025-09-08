import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

export const signUpValidationSchema = (userData) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().min(2).max(100).required(),
    password: Joi.string().min(6).required(),
    bio: Joi.string().max(500).optional(),
  });
  return schema.validate(userData);
};

export const loginValidationSchema = (userData) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(userData);
};
