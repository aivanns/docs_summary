import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH, HOME } from "./shared/router/routes";
import { config as appConfig } from "./shared/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(appConfig.auth.JWT.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(appConfig.auth.JWT.REFRESH_TOKEN)?.value;

  if ((accessToken || refreshToken) && pathname === AUTH) {
    return NextResponse.redirect(new URL(HOME, request.url));
  }

  if (!accessToken && !refreshToken && pathname !== AUTH) {
    return NextResponse.redirect(new URL(AUTH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
