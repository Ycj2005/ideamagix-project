import Prescription from "../models/Prescription.js";
import Consultation from "../models/Consultation.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatePdf = (prescription, consultation, patient, doctor) => {
  return new Promise((resolve, reject) => {
    const pdfDir = path.join(__dirname, "../uploads/pdfs");
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
    const pdfName = "prescription-" + prescription._id + ".pdf";
    const pdfPath = path.join(pdfDir, pdfName);
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    doc.fontSize(20).text("Prescription", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text("Doctor: " + doctor.name);
    doc.text("Specialty: " + (doctor.speciality || "N/A"));
    doc.moveDown();
    doc.text("Patient: " + patient.name);
    doc.text("Age: " + patient.age);
    doc.moveDown();
    doc.text("Illness History: " + (consultation.illnessHistory || "N/A"));
    doc.text("Recent Surgery: " + (consultation.recentSurgery || "N/A"));
    doc.text("Surgery Time: " + (consultation.surgeryTime || "N/A"));
    doc.text("Diabetic: " + (consultation.diabetic ? "Yes" : "No"));
    doc.text("Allergies: " + (consultation.allergies || "N/A"));
    doc.moveDown();
    doc.fontSize(14).text("Care to be taken:", { underline: true });
    doc.fontSize(12).text(prescription.care || "N/A");
    doc.moveDown();
    doc.fontSize(14).text("Medicines:", { underline: true });
    doc.fontSize(12).text(prescription.medicines || "N/A");
    doc.moveDown(2);
    doc.text("Date: " + new Date().toLocaleDateString(), { align: "right" });

    doc.end();
    stream.on("finish", () => resolve("pdfs/" + pdfName));
    stream.on("error", reject);
  });
};

export const createPrescription = async (req, res) => {
  try {
    const { consultationId, care, medicines } = req.body;
    if (!care) {
      return res.status(400).json({ msg: "Care to be taken is required" });
    }
    const consultation = await Consultation.findById(consultationId)
      .populate("PatientId", "name age")
      .populate("DoctorId", "name speciality");
    if (!consultation) {
      return res.status(404).json({ msg: "Consultation not found" });
    }
    const prescription = await Prescription.create({
      consultationId,
      doctorId: req.user.id,
      patientId: consultation.PatientId._id,
      care,
      medicines,
    });
    const pdfPath = await generatePdf(prescription, consultation, consultation.PatientId, consultation.DoctorId);
    prescription.pdf = pdfPath;
    await prescription.save();
    consultation.status = "Prescribed";
    await consultation.save();
    res.status(201).json({ msg: "Prescription created", prescription });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const editPrescription = async (req, res) => {
  try {
    const { care, medicines } = req.body;
    if (!care) {
      return res.status(400).json({ msg: "Care to be taken is required" });
    }
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ msg: "Prescription not found" });
    }
    prescription.care = care;
    prescription.medicines = medicines;
    await prescription.save();
    const consultation = await Consultation.findById(prescription.consultationId)
      .populate("PatientId", "name age")
      .populate("DoctorId", "name speciality");
    const pdfPath = await generatePdf(prescription, consultation, consultation.PatientId, consultation.DoctorId);
    prescription.pdf = pdfPath;
    await prescription.save();
    res.json({ msg: "Prescription updated", prescription });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const sendPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ msg: "Prescription not found" });
    }
    const consultation = await Consultation.findById(prescription.consultationId);
    if (consultation) {
      consultation.status = "Sent";
      await consultation.save();
    }
    res.json({ msg: "Prescription sent to patient" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getPrescriptionsForDoctor = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctorId: req.user.id })
      .populate("consultationId")
      .populate("patientId", "name email age phone")
      .sort({ createdAt: -1 });
    res.json({ prescriptions });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getPrescriptionsForPatient = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.user.id })
      .populate("consultationId")
      .populate("doctorId", "name speciality")
      .sort({ createdAt: -1 });
    res.json({ prescriptions });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const downloadPdf = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription || !prescription.pdf) {
      return res.status(404).json({ msg: "PDF not found" });
    }
    const pdfPath = path.join(__dirname, "../uploads", prescription.pdf);
    res.download(pdfPath);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
