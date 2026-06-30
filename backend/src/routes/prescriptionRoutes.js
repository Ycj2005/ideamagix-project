import express from "express";
import { createPrescription, editPrescription, sendPrescription, getPrescriptionsForDoctor, getPrescriptionsForPatient, downloadPdf } from "../controllers/prescriptionController.js";
import auth from "../middleware/auth.js";
import doctorOnly from "../middleware/doctorOnly.js";
import patientOnly from "../middleware/patientOnly.js";

const router = express.Router();

router.post("/", auth, doctorOnly, createPrescription);
router.put("/:id", auth, doctorOnly, editPrescription);
router.put("/:id/send", auth, doctorOnly, sendPrescription);
router.get("/doctor", auth, doctorOnly, getPrescriptionsForDoctor);
router.get("/patient", auth, patientOnly, getPrescriptionsForPatient);
router.get("/:id/pdf", auth, downloadPdf);

export default router;
