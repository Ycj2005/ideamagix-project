import express from "express";
import { getPatientById } from "../controllers/patientController.js";

const router = express.Router();

router.get("/:id", getPatientById);

export default router;
