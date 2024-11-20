"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/shared/config";
import { useSessionStore } from "@/entities/session";
import { AUTH, REGISTER } from "@/shared/router/routes";
import Cookies from 'js-cookie';

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const { refreshTokens } = useSessionStore();

  useEffect(() => {
    const accessToken = Cookies.get(config.auth.JWT.ACCESS_TOKEN);
    const currentPath = window.location.pathname;
    const publicPaths = [AUTH, REGISTER];

    if (!accessToken && !publicPaths.includes(currentPath)) {
      router.push(AUTH);
      return;
    }

    const refreshInterval = setInterval(
      refreshTokens,
      config.auth.REFRESHTOKENLIVETIME * 1000
    );

    return () => clearInterval(refreshInterval);
  }, [refreshTokens, router]);

  return <>{children}</>;
}
