import { create } from "zustand";
import { config } from "@/shared/config";
import { SessionState } from "../types";
import { sessionApi } from "../api";
import Cookies from 'js-cookie';

const getInitialAuthState = () => {
  if (typeof window === "undefined") return false;
  return !!Cookies.get(config.auth.JWT.ACCESS_TOKEN);
};

export const useSessionStore = create<SessionState>((set) => ({
  isLoading: false,
  isAuthenticated: getInitialAuthState(),
  error: null,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  refreshTokens: async () => {
    try {
      set({ isLoading: true, error: null });
      const refreshToken = Cookies.get(config.auth.JWT.REFRESH_TOKEN);

      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const data = await sessionApi.refreshToken(refreshToken);

      if (data.refreshToken && data.accessToken) {
        await fetch("/api/auth/set-token", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            accessToken: data.accessToken,
            refreshToken: data.refreshToken 
          }),
        });
      }

      set({ isAuthenticated: true });
      return data;
    } catch (error) {
      await fetch("/api/auth/remove-token", { method: "POST" });
      set({
        error: error as Error,
        isAuthenticated: false,
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/remove-token", { method: "POST" });
      set({ isAuthenticated: false });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  },
}));
