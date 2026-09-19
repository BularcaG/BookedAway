import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForShortLivedToken, getLongLivedToken, getMe } from "@/lib/facebook/auth";
import { saveConnection } from "@/lib/store";

export const runtime = "nodejs";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const errorDescription = searchParams.get("error_description");
  const cookieState = request.cookies.get("fb_oauth_state")?.value;

  if (errorDescription) {
    return NextResponse.redirect(`${APP_URL}/?fb_error=${encodeURIComponent(errorDescription)}`);
  }
  if (!code || !state || !cookieState || state !== cookieState) {
    return NextResponse.redirect(`${APP_URL}/?fb_error=${encodeURIComponent("Login could not be verified, please try connecting again.")}`);
  }

  try {
    const shortLivedToken = await exchangeCodeForShortLivedToken(code);
    const { accessToken, expiresInSeconds } = await getLongLivedToken(shortLivedToken);
    const me = await getMe(accessToken);

    await saveConnection({
      accessToken,
      tokenExpiresAt: Date.now() + expiresInSeconds * 1000,
      userId: me.id,
      userName: me.name,
      connectedAt: Date.now()
    });

    const res = NextResponse.redirect(`${APP_URL}/?fb_connected=1`);
    res.cookies.delete("fb_oauth_state");
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to connect to Facebook";
    return NextResponse.redirect(`${APP_URL}/?fb_error=${encodeURIComponent(message)}`);
  }
}
