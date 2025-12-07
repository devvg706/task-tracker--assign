// src/utils/axiosConnector.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
  withCredentials: false, // default - override per-request if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// optional: attach interceptors (token refresh, error logging) here

export const apiConnector = (method, url, bodyData = null, headers = {}, params = {}, withCredentials = false) => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? null,
    headers: Object.keys(headers).length ? headers : undefined,
    params: Object.keys(params).length ? params : undefined,
    withCredentials,
  });
};
