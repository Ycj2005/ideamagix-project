import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "patient",
    },
    historyOfSurgery: {
      type: [String],
    },
    historyOfIllness: {
      type: [String],
    },
  },
  { timestamps: true },
);

const patient =
  mongoose.models.patient || mongoose.model("patient", PatientSchema);
export default patient;