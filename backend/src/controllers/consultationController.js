import Consultation from "../models/Consultation.js";

export const createConsultation = async (req, res) => {
  try {
    const { DoctorId, illnessHistory, recentSurgery, surgeryTime, diabetic, allergies, others, transactionId } = req.body;
    const consultation = await Consultation.create({
      DoctorId,
      PatientId: req.user.id,
      illnessHistory,
      recentSurgery,
      surgeryTime,
      diabetic: diabetic === "true" || diabetic === true,
      allergies,
      others,
      transactionId,
    });
    res.status(201).json({ msg: "Consultation submitted", consultation });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getConsultationsForDoctor = async (req, res) => {
  try {
    const consultations = await Consultation.find({ DoctorId: req.user.id })
      .populate("PatientId", "name email age phone profileImage historyOfSurgery historyOfIllness")
      .sort({ createdAt: -1 });
    res.json({ consultations });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getConsultationsForPatient = async (req, res) => {
  try {
    const consultations = await Consultation.find({ PatientId: req.user.id })
      .populate("DoctorId", "name speciality profileImage")
      .sort({ createdAt: -1 });
    res.json({ consultations });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
