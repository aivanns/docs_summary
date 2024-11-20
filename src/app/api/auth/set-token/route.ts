import { NextResponse } from "next/server";
import { config } from "@/shared/config";

export async function POST(request: Request) {
  const { accessToken, refreshToken } = await request.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: config.auth.JWT.ACCESS_TOKEN,
    value: accessToken,
    maxAge: 60 * 60, // 1 hour
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  response.cookies.set({
    name: config.auth.JWT.REFRESH_TOKEN,
    value: refreshToken,
    maxAge: config.auth.REFRESHTOKENLIVETIME,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
}
