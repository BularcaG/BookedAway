import { NextRequest, NextResponse } from "next/server";
import { listCreatives } from "@/lib/store";
import { handleApiError } from "@/lib/api-utils";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const assetId = new URL(request.url).searchParams.get("assetId");
    const creatives = await listCreatives();
    return NextResponse.json({ creatives: assetId ? creatives.filter((c) => c.assetId === assetId) : creatives });
  } catch (error) {
    return handleApiError(error);
  }
}
