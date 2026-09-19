import { NextResponse } from "next/server";
import { listAssets } from "@/lib/store";
import { handleApiError } from "@/lib/api-utils";

export const runtime = "nodejs";

export async function GET() {
  try {
    const assets = await listAssets();
    return NextResponse.json({ assets });
  } catch (error) {
    return handleApiError(error);
  }
}
