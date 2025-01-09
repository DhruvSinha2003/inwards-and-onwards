import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("iao-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("API Success:", {
      endpoint: response.config.url,
      method: response.config.method,
      status: response.status,
    });
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const errorResponse = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      endpoint: originalRequest?.url,
      method: originalRequest?.method,
    };

    if (error.response?.status === 401) {
      console.error("Authentication error:", errorResponse);

      localStorage.removeItem("iao-token");
      localStorage.removeItem("iao-user");

      window.dispatchEvent(
        new CustomEvent("auth-error", {
          detail: errorResponse,
        })
      );
    }
    // Handle server errors
    else if (error.response?.status >= 500) {
      console.error("Server error:", errorResponse);
    }
    // Handle validation errors
    else if (error.response?.status === 400) {
      console.error("Validation error:", errorResponse);
    }
    // Handle other client errors
    else if (error.response?.status >= 400) {
      console.error("Client error:", errorResponse);
    }
    // Handle network errors
    else if (error.request) {
      console.error("Network error - no response received:", {
        ...errorResponse,
        request: error.request,
      });
    }
    // Handle other errors
    else {
      console.error("Error:", errorResponse);
    }

    return Promise.reject(error);
  }
);

export default api;
