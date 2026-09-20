import { NextRequest, NextResponse } from "next/server";
import { listSpecs, saveSpec, getSpec, newId } from "@/lib/store";
import { blankSpec } from "@/lib/defaults";
import { handleApiError, jsonError } from "@/lib/api-utils";
import type { AdSpec } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ specs: await listSpecs() });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Creates a spec. With `duplicateFromId`, the new spec inherits every
 * setting of an existing one - the main way ads get made here, since most
 * new ads are a proven ad with a new creative or new copy.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as { duplicateFromId?: string; name?: string };
    const now = Date.now();
    const id = newId("spec");

    let spec: AdSpec;
    if (body.duplicateFromId) {
      const source = await getSpec(body.duplicateFromId);
      if (!source) return jsonError("Could not find the spec to duplicate", 404);
      spec = {
        ...structuredClone(source),
        id,
        name: body.name?.trim() || `${source.name || "Untitled"} (copy)`,
        status: "draft",
        duplicatedFromId: source.id,
        createdAt: now,
        updatedAt: now,
        submittedAt: null
      };
    } else {
      spec = blankSpec(id, now);
      if (body.name?.trim()) spec.name = body.name.trim();
    }

    return NextResponse.json({ spec: await saveSpec(spec) });
  } catch (error) {
    return handleApiError(error);
  }
}
