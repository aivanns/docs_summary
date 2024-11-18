"use client";

import { Button } from "antd";
import { useLanguageStore } from "../model/language-store";
import { config } from "@/shared/config";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(
      language === config.locale.languages.EN
        ? config.locale.languages.RU
        : config.locale.languages.EN
    );
  };

  return (
    <Button onClick={toggleLanguage} className="fixed top-4 right-4">
      {language === config.locale.languages.EN
        ? config.locale.languages.RU
        : config.locale.languages.EN}
    </Button>
  );
}
