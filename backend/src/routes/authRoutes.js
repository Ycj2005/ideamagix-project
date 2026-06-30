import express from "express";
import { doctorRegister, doctorLogin, patientRegister, patientLogin, getMe, logout } from "../controllers/authController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/doctor/register", upload.single("profileImage"), doctorRegister);
router.post("/doctor/login", doctorLogin);
router.post("/patient/register", upload.single("profileImage"), patientRegister);
router.post("/patient/login", patientLogin);
router.get("/me", auth, getMe);
router.get("/logout", auth, logout);

export default router;