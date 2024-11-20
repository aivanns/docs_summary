import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH, REGISTER, HOME } from "./shared/router/routes";
import { config as appConfig} from "./shared/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(appConfig.auth.JWT.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(appConfig.auth.JWT.REFRESH_TOKEN)?.value;

  // Публичные маршруты, доступные без авторизации
  const publicPaths = [AUTH, REGISTER];

  // Если есть токен и пытаемся зайти на публичные маршруты
  if ((accessToken || refreshToken) && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL(HOME, request.url));
  }

  // Если нет токенов и пытаемся зайти на защищенный маршрут
  if (!accessToken && !refreshToken && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL(AUTH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
