import mongoose from "mongoose";

const PerscreptionSchema = new mongoose.Schema(
  {
    consultationId: {
      type: mongoose.Types.ObjectId,
      ref: "consultation",
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: "doctor",
    },
    patientId: {
      type: mongoose.Types.ObjectId,
      ref: "patient",
    },
    care: {
      type: String,
    },
    medicines: {
      type: String,
    },
    pdf: {
      type: String,
    },
  },
  { timestamps: true },
);

const perscription = mongoose.models.perscription || mongoose.model('perscription', PerscreptionSchema);
export default perscription;