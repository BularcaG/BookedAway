import { NextRequest, NextResponse } from "next/server";
import { saveSpec, newId } from "@/lib/store";
import { blankSpec } from "@/lib/defaults";
import { handleApiError, jsonError } from "@/lib/api-utils";
import type { AdSpec } from "@/lib/types";

export const runtime = "nodejs";

/**
 * Creates a spec from pasted JSON. Anything the JSON omits falls back to the
 * blank-spec defaults, so a partial object (e.g. just the ad set settings read
 * off a live campaign) is enough to seed the library.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as { spec?: Partial<AdSpec> } | Partial<AdSpec> | null;
    if (!body) return jsonError("Could not parse that JSON");

    const raw = ("spec" in body && body.spec ? body.spec : body) as Record<string, unknown>;
    // Seed files carry `_comment` notes for whoever reads them; don't persist those.
    const incoming = Object.fromEntries(Object.entries(raw).filter(([key]) => !key.startsWith("_"))) as Partial<AdSpec>;
    const now = Date.now();
    const base = blankSpec(newId("spec"), now);

    const spec: AdSpec = {
      ...base,
      ...incoming,
      // Server owns identity and lifecycle regardless of what the JSON claims.
      id: base.id,
      status: "draft",
      duplicatedFromId: null,
      createdAt: now,
      updatedAt: now,
      submittedAt: null,
      campaign: { ...base.campaign, ...(incoming.campaign ?? {}) },
      adSet: { ...base.adSet, ...(incoming.adSet ?? {}) },
      creative: { ...base.creative, ...(incoming.creative ?? {}) }
    };

    return NextResponse.json({ spec: await saveSpec(spec) });
  } catch (error) {
    return handleApiError(error);
  }
}
