import axios from "axios";

import { supabase } from "./supabase";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

export const api = axios.create({
  // 개발: VITE_API_BASE_URL이 비어 있으면 `/api` → Vite proxy 사용
  // 운영: VITE_API_BASE_URL + `/api`
  baseURL: apiBaseUrl ? `${apiBaseUrl}/api` : "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
});

api.interceptors.request.use(async (config) => {
  if (supabase) {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (data.session) config.headers.set("Authorization", `Bearer ${data.session.access_token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
