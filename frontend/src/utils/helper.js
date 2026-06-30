export const BASE_URL = "http://localhost:5500";
export const API_URL = "http://localhost:5500/api";

export const getImageUrl = (filename) => {
  if (!filename) return "";
  return BASE_URL + "/uploads/" + filename;
};
