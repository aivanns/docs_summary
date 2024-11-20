"use client";

import { PropsWithChildren } from "react";
import { QueryProvider } from "./query-provider";
import { App } from "antd";
import { AntdConfigProvider } from "../components/components-configuration";
import { SocketProvider } from "@/shared/providers/socket-provider";
import { ThemeProvider } from "@/features/theme/ui/theme-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AntdConfigProvider>
          <SocketProvider>
            <App>{children}</App>
          </SocketProvider>
        </AntdConfigProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
