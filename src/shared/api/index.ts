import axios from "axios";
import Cookies from "js-cookie";
import { config as appConfig } from "@/shared/config";
export const apiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Добавляем интерцептор для добавления заголовка авторизации
apiRequest.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(appConfig.auth.JWT.ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
