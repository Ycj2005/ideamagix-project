import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const doctorRegister = async (req, res) => {
  try {
    const { name, speciality, email, phone, experience, password } = req.body;
    const existing = await Doctor.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(400).json({ msg: "Email or phone already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let profileImage = "";
    if (req.file) {
      profileImage = req.file.filename;
    }
    const doctor = await Doctor.create({
      name,
      speciality,
      email,
      phone,
      experience: parseFloat(experience) || 0,
      password: hashedPassword,
      profileImage,
    });
    const token = generateToken(doctor);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ msg: "Doctor registered", user: { id: doctor._id, name: doctor.name, role: doctor.role } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ msg: "Doctor not found" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }
    const token = generateToken(doctor);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ msg: "Login successful", user: { id: doctor._id, name: doctor.name, role: doctor.role } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const patientRegister = async (req, res) => {
  try {
    const { name, age, email, phone, password, historyOfSurgery, historyOfIllness } = req.body;
    const existing = await Patient.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(400).json({ msg: "Email or phone already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let profileImage = "";
    if (req.file) {
      profileImage = req.file.filename;
    }
    let surgeryArr = [];
    if (historyOfSurgery) {
      surgeryArr = historyOfSurgery.split(",").map((s) => s.trim()).filter((s) => s);
    }
    let illnessArr = [];
    if (historyOfIllness) {
      illnessArr = historyOfIllness.split(",").map((s) => s.trim()).filter((s) => s);
    }
    const patient = await Patient.create({
      name,
      age: parseInt(age),
      email,
      phone,
      password: hashedPassword,
      profileImage,
      historyOfSurgery: surgeryArr,
      historyOfIllness: illnessArr,
    });
    const token = generateToken(patient);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ msg: "Patient registered", user: { id: patient._id, name: patient.name, role: patient.role } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const patientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ msg: "Patient not found" });
    }
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }
    const token = generateToken(patient);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ msg: "Login successful", user: { id: patient._id, name: patient.name, role: patient.role } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    let user;
    if (req.user.role === "doctor") {
      user = await Doctor.findById(req.user.id).select("-password");
    } else {
      user = await Patient.findById(req.user.id).select("-password");
    }
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
};
