import Doctor from "../models/Doctor.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }
    res.json({ doctor });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
