import { NextResponse } from "next/server";
import { getConnection, clearConnection, saveConnection } from "@/lib/store";
import { handleApiError } from "@/lib/api-utils";

export const runtime = "nodejs";

// If a System User token is provided via env, this app is "always connected"
// without anyone going through the OAuth dialog - the recommended path for a
// solo store owner automating their own ad account (see GUIDE.md, Option B).
async function autoConnectWithSystemUserToken() {
  const token = process.env.FB_SYSTEM_USER_TOKEN;
  if (!token) return null;
  const existing = await getConnection();
  if (existing?.accessToken === token) return existing;
  const conn = {
    accessToken: token,
    tokenExpiresAt: null,
    connectedAt: Date.now()
  };
  await saveConnection({ ...existing, ...conn });
  return conn;
}

export async function GET() {
  try {
    await autoConnectWithSystemUserToken();
    const conn = await getConnection();
    if (!conn) return NextResponse.json({ connected: false });

    return NextResponse.json({
      connected: true,
      userName: conn.userName ?? "System User",
      adAccountId: conn.adAccountId ?? null,
      adAccountName: conn.adAccountName ?? null,
      pageId: conn.pageId ?? null,
      pageName: conn.pageName ?? null,
      expiresAt: conn.tokenExpiresAt
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE() {
  try {
    await clearConnection();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
