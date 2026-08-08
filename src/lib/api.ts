import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

export const api = axios.create({
  // 개발: VITE_API_BASE_URL이 비어 있으면 `/api` → Vite proxy 사용
  // 운영: VITE_API_BASE_URL + `/api`
  baseURL: apiBaseUrl ? `${apiBaseUrl}/api` : "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
