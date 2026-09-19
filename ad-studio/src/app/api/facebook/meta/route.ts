import { NextRequest, NextResponse } from "next/server";
import { listAdAccounts, listPages } from "@/lib/facebook/auth";
import { getConnection, saveConnection } from "@/lib/store";
import { handleApiError, jsonError } from "@/lib/api-utils";

export const runtime = "nodejs";

export async function GET() {
  try {
    const conn = await getConnection();
    if (!conn) return jsonError("Not connected to Facebook yet", 401);

    const [adAccounts, pages] = await Promise.all([listAdAccounts(conn.accessToken), listPages(conn.accessToken)]);

    return NextResponse.json({
      adAccounts,
      pages,
      selectedAdAccountId: conn.adAccountId ?? null,
      selectedPageId: conn.pageId ?? null
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const conn = await getConnection();
    if (!conn) return jsonError("Not connected to Facebook yet", 401);

    const body = await request.json();
    const { adAccountId, adAccountName, pageId, pageName } = body as Record<string, string | undefined>;
    if (!adAccountId || !pageId) return jsonError("adAccountId and pageId are required");

    await saveConnection({ ...conn, adAccountId, adAccountName, pageId, pageName });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
