import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH, HOME } from "./shared/router/routes";
import { config } from "./shared/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get(
    config.auth.JWT.REFRESH_TOKEN
  )?.value;

  if (refreshToken && pathname === AUTH) {
    return NextResponse.redirect(new URL(HOME, request.url));
  }

  if (!refreshToken && pathname === HOME) {
    return NextResponse.redirect(new URL(AUTH, request.url));
  }

  return NextResponse.next();
}

export const middlewareConfig = {
  matcher: [AUTH, HOME],
};
