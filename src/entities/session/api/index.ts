import { apiRequest } from "@/shared/api";

export const sessionApi = {
  refreshToken: async (token: string) => {
    const response = await apiRequest.post(`/auth/refresh`, {
      refreshToken: token,
    });
    return response.data;
  },
};
