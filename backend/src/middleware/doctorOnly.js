const doctorOnly = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ msg: "Access denied, doctors only" });
  }
  next();
};

export default doctorOnly;
