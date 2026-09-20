import { NextRequest, NextResponse } from "next/server";
import { getSpec, saveSpec, deleteSpec } from "@/lib/store";
import { handleApiError, jsonError } from "@/lib/api-utils";
import type { AdSpec } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const spec = await getSpec(id);
    if (!spec) return jsonError("Spec not found", 404);
    return NextResponse.json({ spec });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const existing = await getSpec(id);
    if (!existing) return jsonError("Spec not found", 404);

    const body = (await request.json()) as Partial<AdSpec>;
    // id/createdAt are owned by the server; everything else is the form's to set.
    const merged: AdSpec = { ...existing, ...body, id: existing.id, createdAt: existing.createdAt };
    return NextResponse.json({ spec: await saveSpec(merged) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const removed = await deleteSpec(id);
    if (!removed) return jsonError("Spec not found", 404);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
