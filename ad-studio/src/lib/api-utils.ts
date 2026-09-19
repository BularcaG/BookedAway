import { NextResponse } from "next/server";
import { FacebookGraphError } from "./facebook/graph";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof FacebookGraphError) {
    return jsonError(`Facebook API error: ${error.message}`, error.status >= 400 && error.status < 500 ? 400 : 502);
  }
  const message = error instanceof Error ? error.message : "Unexpected error";
  return jsonError(message, 500);
}
