import express from "express";
import { createConsultation, getConsultationsForDoctor, getConsultationsForPatient } from "../controllers/consultationController.js";
import auth from "../middleware/auth.js";
import doctorOnly from "../middleware/doctorOnly.js";
import patientOnly from "../middleware/patientOnly.js";

const router = express.Router();

router.post("/", auth, patientOnly, createConsultation);
router.get("/doctor", auth, doctorOnly, getConsultationsForDoctor);
router.get("/patient", auth, patientOnly, getConsultationsForPatient);

export default router;
