"use client";

import { PropsWithChildren, useEffect } from "react";
import { useThemeStore } from "../model/theme-store";
import { ThemeSwitcher } from "./theme-switcher";
import { config } from "@/shared/config";

export function ThemeProvider({ children }: PropsWithChildren) {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle(
      config.theme.modes.DARK,
      theme === config.theme.modes.DARK
    );
  }, [theme]);

  return (
    <>
      {children}
      <ThemeSwitcher />
    </>
  );
}
