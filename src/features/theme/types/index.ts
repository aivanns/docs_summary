import { config } from "@/shared/config";

type ThemeModes = typeof config.theme.modes;
export type Theme = ThemeModes[keyof ThemeModes];

export interface ThemeState {
  theme: Theme;
  setTheme: () => void;
} 