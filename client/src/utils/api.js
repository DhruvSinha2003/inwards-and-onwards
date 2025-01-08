// src/utils/api.js
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("iao-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("API Success");
    return response;
  },
  (error) => {
    console.error("API Error Details:", {
      message: error.response?.data?.message || error.message,
      fullError: error,
    });
    return Promise.reject(error);
  }
);
export default api;
