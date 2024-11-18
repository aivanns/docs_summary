"use client";

import { useLanguageStore } from "@/features/language";
import { translations } from "../i18n/translations";

export const useTranslations = () => {
  const { language } = useLanguageStore();
  return translations[language];
};
