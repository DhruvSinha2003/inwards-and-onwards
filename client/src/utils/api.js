import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("iao-token");
  console.log("API Interceptor:", {
    endpoint: config.url,
    method: config.method,
    hasToken: token ? "Yes" : "No",
  });

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      endpoint: response.config.url,
      status: response.status,
      hasData: response.data ? "Yes" : "No",
    });
    return response;
  },
  (error) => {
    console.error("API Error:", {
      endpoint: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    return Promise.reject(error);
  }
);

export default api;
