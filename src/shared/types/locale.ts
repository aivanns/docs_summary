export type Language = "en" | "ru";

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}
