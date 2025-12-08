import axios from "axios";
import TokenStorage from "../cookies/cookie-storage";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000", 10),
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = TokenStorage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; 
    }

    return config;
  },
  (error) => Promise.reject(error)
);
