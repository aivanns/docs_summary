import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LanguageState } from "../types";
import { config } from "@/shared/config";

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: config.locale.languages.EN,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
    }
  )
);
