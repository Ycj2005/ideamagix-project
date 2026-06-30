import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema(
  {
    DoctorId: {
      type: mongoose.Types.ObjectId,
      ref: "doctor",
    },
    PatientId: {
      type: mongoose.Types.ObjectId,
      ref: "patient",
    },
    illnessHistory: {
      type: String,
    },
    recentSurgery: {
      type: String,
    },
    surgeryTime: {
      type: String,
      default: "0 Months",
    },
    diabetic: {
      type: Boolean,
      default: false,
      required: true,
    },
    allergies: {
      type: String,
      default: "no",
    },
    others: {
      type: String,
      default: "",
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
);

const consultation =
  mongoose.models.consultation ||
  mongoose.model("consultation", ConsultationSchema);
export default consultation;