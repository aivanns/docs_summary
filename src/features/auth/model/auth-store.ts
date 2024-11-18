import { create } from "zustand";
import { AuthState } from "../types";
import { useSessionStore } from "@/entities/session";

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,

  login: async () => {
    try {
      set({ isLoading: true, error: null });
      const sessionStore = useSessionStore.getState();
      await sessionStore.refreshTokens();
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async () => {
    try {
      set({ isLoading: true, error: null });
      const sessionStore = useSessionStore.getState();
      await sessionStore.refreshTokens();
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));
