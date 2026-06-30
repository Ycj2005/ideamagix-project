import Patient from "../models/Patient.js";

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-password");
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }
    res.json({ patient });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
