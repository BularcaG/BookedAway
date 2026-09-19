const GRAPH_VERSION = process.env.FB_GRAPH_VERSION || "v21.0";
export const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;

export class FacebookGraphError extends Error {
  status: number;
  fbCode?: number;
  fbSubcode?: number;
  fbType?: string;
  raw: unknown;

  constructor(message: string, status: number, raw: unknown) {
    super(message);
    this.name = "FacebookGraphError";
    this.status = status;
    this.raw = raw;
    const err = (raw as any)?.error;
    if (err) {
      this.fbCode = err.code;
      this.fbSubcode = err.error_subcode;
      this.fbType = err.type;
    }
  }
}

interface GraphRequestOptions {
  method?: "GET" | "POST" | "DELETE";
  accessToken: string;
  params?: Record<string, string | number | boolean | undefined>;
  form?: Record<string, string | number | boolean | undefined>;
}

/**
 * Thin wrapper around the Graph API. Facebook accepts params as querystring
 * on GET and as x-www-form-urlencoded body on POST - both are handled here
 * so every caller just deals with plain objects.
 */
export async function graphRequest<T = any>(path: string, options: GraphRequestOptions): Promise<T> {
  const { method = "GET", accessToken, params = {}, form } = options;

  const url = new URL(`${GRAPH_BASE}/${path.replace(/^\//, "")}`);

  if (method === "GET") {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
    url.searchParams.set("access_token", accessToken);
  }

  let body: URLSearchParams | undefined;
  if (method !== "GET") {
    body = new URLSearchParams();
    for (const [key, value] of Object.entries(form ?? params)) {
      if (value !== undefined) body.set(key, String(value));
    }
    body.set("access_token", accessToken);
  }

  const res = await fetch(url.toString(), {
    method,
    headers: method !== "GET" ? { "Content-Type": "application/x-www-form-urlencoded" } : undefined,
    body,
    cache: "no-store"
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = json?.error?.message || `Facebook Graph API request failed (${res.status})`;
    throw new FacebookGraphError(message, res.status, json);
  }

  return json as T;
}

/**
 * Multipart upload (used for /act_{id}/adimages) - Graph API wants the image
 * bytes as a real multipart field, not base64-in-form, once files get large.
 */
export async function graphUpload<T = any>(
  path: string,
  accessToken: string,
  fileField: string,
  file: Buffer,
  fileName: string,
  extraFields: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${GRAPH_BASE}/${path.replace(/^\//, "")}`);
  url.searchParams.set("access_token", accessToken);

  const form = new FormData();
  for (const [key, value] of Object.entries(extraFields)) form.append(key, value);
  form.append(fileField, new Blob([file]), fileName);

  const res = await fetch(url.toString(), { method: "POST", body: form });
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = json?.error?.message || `Facebook Graph API upload failed (${res.status})`;
    throw new FacebookGraphError(message, res.status, json);
  }

  return json as T;
}
