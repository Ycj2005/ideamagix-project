import mongoose from "mongoose";
const DoctorSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
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
    experience: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "doctor",
    },
  },
  { timestamps: true },
);

const doctor = mongoose.models.doctor || mongoose.model("doctor", DoctorSchema);
export default doctor;
