import axios, { AxiosError, AxiosResponse } from "axios";

export const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 0,
});

apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      alert("logout");
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    if (error?.response?.status === 400) {
      alert("Bad Request");
    }
    return Promise.reject(error);
  },
);
