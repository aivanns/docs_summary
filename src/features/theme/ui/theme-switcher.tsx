"use client";

import { FloatButton } from "antd";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../model/theme-store";
import { config } from "@/shared/config";

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  return (
    <FloatButton
      icon={
        theme === config.theme.modes.LIGHT ? (
          <Moon className="text-black " size={16} />
        ) : (
          <Sun className="text-black" size={16} />
        )
      }
      onClick={setTheme}
      tooltip={
        theme === config.theme.modes.DARK
          ? config.theme.tooltips.DARK
          : config.theme.tooltips.LIGHT
      }
      style={{
        right: 24,
        bottom: 24,
      }}
    />
  );
}
