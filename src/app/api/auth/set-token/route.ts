import { NextResponse } from "next/server";
import { config } from "@/shared/config";

export async function POST(request: Request) {
  const { token } = await request.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: config.auth.JWT.REFRESH_TOKEN,
    value: token,
    maxAge: config.auth.REFRESHTOKENLIVETIME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
}
