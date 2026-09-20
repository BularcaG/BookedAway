import { NextResponse } from "next/server";
import { listAssets } from "@/lib/store";
import { handleApiError } from "@/lib/api-utils";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ assets: await listAssets() });
  } catch (error) {
    return handleApiError(error);
  }
}
