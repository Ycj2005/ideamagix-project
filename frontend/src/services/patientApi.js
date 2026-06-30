import axios from "axios";
import { API_URL } from "../utils/helper.js";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const submitConsultation = (data) => {
  return api.post("/consultations", data);
};

export const getMyConsultations = () => {
  return api.get("/consultations/patient");
};

export const getMyPrescriptions = () => {
  return api.get("/prescriptions/patient");
};

export const downloadPdf = (id) => {
  return api.get("/prescriptions/" + id + "/pdf", { responseType: "blob" });
};
