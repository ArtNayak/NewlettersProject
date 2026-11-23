import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Faculty from "../models/Faculty.js";

// Register Faculty
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, inviteCode } = req.body;
    if (!process.env.FACULTY_INVITE_CODE || inviteCode !== process.env.FACULTY_INVITE_CODE)
      return res.status(403).json({ message: "Invalid invite code" });
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await Faculty.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const faculty = new Faculty({ name, email, password: hashed });
    await faculty.save();

    res.status(201).json({ message: "Faculty registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Faculty
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const faculty = await Faculty.findOne({ email });
    if (!faculty) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, faculty.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: faculty._id, email: faculty.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
