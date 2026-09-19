import { NextResponse } from "next/server";
import crypto from "crypto";
import { buildLoginUrl } from "@/lib/facebook/auth";
import { handleApiError } from "@/lib/api-utils";

export const runtime = "nodejs";

export async function GET() {
  try {
    const state = crypto.randomBytes(16).toString("hex");
    const loginUrl = buildLoginUrl(state);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.set("fb_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10
    });
    return res;
  } catch (error) {
    return handleApiError(error);
  }
}
