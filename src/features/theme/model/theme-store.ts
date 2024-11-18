import { create } from "zustand";
import { Theme, ThemeState } from "../types";
import { config } from "@/shared/config";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return config.theme.modes.LIGHT;

  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme &&
    (savedTheme === config.theme.modes.LIGHT ||
      savedTheme === config.theme.modes.DARK)
  ) {
    return savedTheme as Theme;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? config.theme.modes.DARK : config.theme.modes.LIGHT;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  setTheme: () =>
    set((state) => {
      const newTheme =
        state.theme === config.theme.modes.LIGHT
          ? config.theme.modes.DARK
          : config.theme.modes.LIGHT;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle(
          "dark",
          newTheme === config.theme.modes.DARK
        );
      }
      return { theme: newTheme };
    }),
}));
