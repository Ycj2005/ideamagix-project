import axios from "axios";
import { API_URL } from "../utils/helper.js";

const api = axios.create({
  baseURL: API_URL + "/auth",
  withCredentials: true,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const doctorRegister = (formData) => {
  return api.post("/doctor/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const doctorLogin = (data) => {
  return api.post("/doctor/login", data);
};

export const patientRegister = (formData) => {
  return api.post("/patient/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const patientLogin = (data) => {
  return api.post("/patient/login", data);
};

export const getMe = () => {
  return api.get("/me");
};

export const logout = () => {
  return api.get("/logout");
};
