import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // milliseconds
    httpOnly: true, // prevent XSS (cross-site scripting) attacks
    sameSite: "strict", // prevent CSRF (cross-site request forgery) attacks,
    secure: process.env.NOTE_ENV !== "development"
  });
};