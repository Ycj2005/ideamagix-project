const patientOnly = (req, res, next) => {
  if (req.user.role !== "patient") {
    return res.status(403).json({ msg: "Access denied, patients only" });
  }
  next();
};

export default patientOnly;
