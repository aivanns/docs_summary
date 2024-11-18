import { config } from "@/shared/config";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.delete(config.auth.JWT.REFRESH_TOKEN);

  return response;
}
