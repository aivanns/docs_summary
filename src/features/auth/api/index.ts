import { apiRequest } from "@/shared/api";
import { AuthFormData } from "../types";

export const authApi = {
  login: async (credentials: AuthFormData) => {
    const response = await apiRequest.post("/auth/signin", credentials);
    return response.data;
  },
};
