import { apiRequest } from "@/shared/api";
import { RegisterFormData } from "../types";

export const registerApi = {
  register: async (credentials: RegisterFormData) => {
    const response = await apiRequest.post("/auth/sign-up", credentials);
    return response.data;
  },
};
