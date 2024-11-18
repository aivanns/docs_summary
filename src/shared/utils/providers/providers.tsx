"use client";

import { PropsWithChildren } from "react";
import { QueryProvider } from "./query-provider";
import { App } from "antd";
import { ThemeProvider } from "@/features/theme";
import { AntdConfigProvider } from "../components/components-configuration";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AntdConfigProvider>
          <App>{children}</App>
        </AntdConfigProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
