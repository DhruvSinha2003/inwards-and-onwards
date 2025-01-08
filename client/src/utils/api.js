// src/utils/api.js
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000, // Add timeout to prevent infinite loading
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("iao-token");
  console.log("API Request:", {
    url: config.url,
    method: config.method,
    data: config.data, // Log request data
    headers: config.headers,
  });

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("API Success:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("API Error Details:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      fullError: error,
    });
    return Promise.reject(error);
  }
);
export default api;
