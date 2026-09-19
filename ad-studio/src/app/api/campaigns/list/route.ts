import { NextResponse } from "next/server";
import { listCampaigns } from "@/lib/store";
import { handleApiError } from "@/lib/api-utils";

export const runtime = "nodejs";

export async function GET() {
  try {
    const campaigns = await listCampaigns();
    return NextResponse.json({ campaigns });
  } catch (error) {
    return handleApiError(error);
  }
}
