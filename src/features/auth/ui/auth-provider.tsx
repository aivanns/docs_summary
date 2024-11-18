"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/shared/config";
import { useSessionStore } from "@/entities/session";
import { AUTH } from "@/shared/router/routes";

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isAuthenticated, refreshTokens } = useSessionStore();

  useEffect(() => {
    const refreshInterval = setInterval(
      refreshTokens,
      config.auth.REFRESHTOKENLIVETIME * 1000
    );

    return () => clearInterval(refreshInterval);
  }, [refreshTokens]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(AUTH);
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
