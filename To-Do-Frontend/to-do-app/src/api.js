import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Add token automatically to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "null") {   // <- prevent sending null
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
