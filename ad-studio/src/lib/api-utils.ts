import { NextResponse } from "next/server";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function handleApiError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  return jsonError(message, 500);
}
