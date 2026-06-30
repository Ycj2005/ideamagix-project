import axios from "axios";
import { API_URL } from "../utils/helper.js";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getAllDoctors = () => {
  return api.get("/doctors");
};

export const getDoctorById = (id) => {
  return api.get("/doctors/" + id);
};

export const getConsultationsForDoctor = () => {
  return api.get("/consultations/doctor");
};

export const createPrescription = (data) => {
  return api.post("/prescriptions", data);
};

export const editPrescription = (id, data) => {
  return api.put("/prescriptions/" + id, data);
};

export const sendPrescription = (id) => {
  return api.put("/prescriptions/" + id + "/send");
};

export const getPrescriptionsForDoctor = () => {
  return api.get("/prescriptions/doctor");
};

export const downloadPdf = (id) => {
  return api.get("/prescriptions/" + id + "/pdf", { responseType: "blob" });
};
