export const BASE_URL = "https://ideamagix-project.onrender.com";
export const API_URL = "https://ideamagix-project.onrender.com/api";

export const getImageUrl = (filename) => {
  if (!filename) return "";
  return BASE_URL + "/uploads/" + filename;
};

