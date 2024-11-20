"use client";
import { ConfigProvider, theme } from "antd";
import { useThemeStore } from "@/features/theme";
import { useState, useEffect } from "react";

export function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme: currentTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "var(--primary)",
          colorBgBase: "var(--background)",
          colorBgContainer: "var(--background)",
          colorText: "var(--foreground)",
          colorBorder: "var(--border)",
          colorError: "var(--error)",
          colorSuccess: "var(--success)",
          colorLinkHover: "var(--primary-hover)",
          colorWarning: "var(--warning)",
          colorTextBase: "var(--foreground)",
        },
        components: {
          Button: {
            colorPrimary: "var(--primary)",
            colorPrimaryHover: "var(--primary-hover)",
            algorithm: true,
          },
          Input: {
            colorBgContainer: "var(--input-background)",
            colorBorder: "var(--input-border)",
            algorithm: true,
          },
          FloatButton: {
            colorFill: "var(--primary)",
            colorFillContent: "var(--primary)",
            colorText: "var(--primary-foreground)",
            colorPrimary: "var(--primary)",
            colorBgContainer: "var(--primary)",
            colorPrimaryHover: "var(--primary-hover)",
            colorBgElevated: "var(--primary)",
          }
        },
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export const messageConfig = {
  duration: 2,
  maxCount: 3,
};
