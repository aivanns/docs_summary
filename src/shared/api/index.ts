import axios from "axios";

export const apiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Добавляем интерцептор для добавления заголовка авторизации
apiRequest.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
