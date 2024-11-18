import { config } from "@/shared/config";

type Languages = typeof config.locale.languages;
export type Language = Languages[keyof Languages];

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
} 