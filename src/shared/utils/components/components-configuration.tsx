"use client";
import { ConfigProvider, theme } from "antd";
import { useThemeStore } from "@/features/theme";
import "@/shared/styles/globals.css";

export function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme: currentTheme } = useThemeStore();

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
          Select: {
            colorBgContainer: "var(--input-background)",
            colorBorder: "var(--input-border)",
            colorTextPlaceholder: "var(--secondary)",
            controlItemBgActive: "var(--primary)",
            controlItemBgHover: "var(--input-background)",
            colorBgElevated: "var(--card-background)",
          },
          DatePicker: {
            colorBgContainer: "var(--input-background)",
            colorBorder: "var(--input-border)",
            colorTextPlaceholder: "var(--secondary)",
            colorBgElevated: "var(--card-background)",
          },
          Modal: {
            colorBgElevated: "var(--card-background)",
            colorText: "var(--foreground)",
            colorIcon: "var(--foreground)",
            colorBgMask: "rgba(0, 0, 0, 0.45)",
          },
          Drawer: {
            colorBgElevated: "var(--card-background)",
            colorText: "var(--foreground)",
            colorIcon: "var(--foreground)",
            colorBgMask: "rgba(0, 0, 0, 0.45)",
          },
          Table: {
            colorBgContainer: "var(--card-background)",
            colorText: "var(--foreground)",
            colorBgElevated: "var(--card-background)",
            colorBorderSecondary: "var(--border)",
            colorFillAlter: "var(--background)",
          },
          Tabs: {
            colorBgContainer: "transparent",
            colorText: "var(--foreground)",
            colorPrimary: "var(--primary)",
            colorBorderSecondary: "var(--border)",
          },
          Card: {
            colorBgContainer: "var(--card-background)",
            colorBorderSecondary: "var(--border)",
            colorText: "var(--foreground)",
          },
          Dropdown: {
            colorBgElevated: "var(--card-background)",
            colorText: "var(--foreground)",
            controlItemBgHover: "var(--input-background)",
          },
          Menu: {
            colorBgContainer: "var(--card-background)",
            colorText: "var(--foreground)",
            colorPrimary: "var(--primary)",
            colorBgElevated: "var(--card-background)",
          },
          Checkbox: {
            colorPrimary: "var(--primary)",
            colorBgContainer: "var(--input-background)",
            colorBorder: "var(--input-border)",
          },
          Radio: {
            colorPrimary: "var(--primary)",
            colorBgContainer: "var(--input-background)",
            colorBorder: "var(--input-border)",
          },
          Switch: {
            colorPrimary: "var(--primary)",
            colorPrimaryHover: "var(--primary-hover)",
            colorTextQuaternary: "var(--checkbox-foreground)",
          },
          Pagination: {
            colorBgContainer: "var(--card-background)",
            colorPrimary: "var(--primary)",
            colorText: "var(--foreground)",
            colorBorder: "var(--border)",
          },
          Steps: {
            colorPrimary: "var(--primary)",
            colorText: "var(--foreground)",
            colorBgContainer: "var(--card-background)",
          },
          Alert: {
            colorText: "var(--foreground)",
            colorSuccess: "var(--success)",
            colorError: "var(--error)",
            colorWarning: "var(--warning)",
          },
          Message: {
            colorBgElevated: "var(--card-background)",
            colorText: "var(--foreground)",
            colorIcon: "var(--foreground)",
            colorBgContainer: "transparent",
            colorFillContent: "var(--card-background)",
          },
          Notification: {
            colorBgElevated: "var(--card-background)",
            colorText: "var(--foreground)",
            colorIcon: "var(--foreground)",
            colorBgContainer: "var(--card-background)",
          },
          Tag: {
            colorBgContainer: "var(--card-background)",
            colorText: "var(--foreground)",
            colorBorder: "var(--border)",
          },
          Timeline: {
            colorPrimary: "var(--primary)",
            colorText: "var(--foreground)",
          },
          Tooltip: {
            colorBgSpotlight: "var(--card-background)",
            colorText: "var(--foreground)",
            colorBgElevated: "var(--card-background)",
          },
          Popover: {
            colorBgElevated: "var(--card-background)",
            colorText: "var(--foreground)",
          },
          Skeleton: {
            colorFill: "var(--border)",
            colorFillContent: "var(--border)",
          },
          FloatButton: {
            colorFill: "var(--primary)",
            colorFillContent: "var(--primary)",
            colorText: "var(--primary-foreground)",
            colorPrimary: "var(--primary)",
            colorBgContainer: "var(--primary)",
            colorPrimaryHover: "var(--primary-hover)",
            colorBgElevated: "var(--primary)",
          },
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
