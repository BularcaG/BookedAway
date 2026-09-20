import { NextRequest, NextResponse } from "next/server";
import { getSpec, getAssets, saveSpec } from "@/lib/store";
import { buildBriefText, buildSpecPayload, validateSpec } from "@/lib/brief";
import { handleApiError, jsonError } from "@/lib/api-utils";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const spec = await getSpec(id);
    if (!spec) return jsonError("Spec not found", 404);

    const assets = await getAssets(spec.creative.assetIds);
    return NextResponse.json({
      brief: buildBriefText(spec, assets),
      payload: buildSpecPayload(spec, assets),
      issues: validateSpec(spec),
      assets
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/** Marks the spec as handed off, so the library shows what's already been sent. */
export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const spec = await getSpec(id);
    if (!spec) return jsonError("Spec not found", 404);

    const updated = await saveSpec({ ...spec, status: "submitted", submittedAt: Date.now() });
    return NextResponse.json({ spec: updated });
  } catch (error) {
    return handleApiError(error);
  }
}
