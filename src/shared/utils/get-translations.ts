import { translations } from "../i18n/translations";
import type { Language } from "@/features/language/types";

export const getTranslations = (language: Language) => {
  return translations[language];
};
