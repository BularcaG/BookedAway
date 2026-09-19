import { GRAPH_BASE, graphRequest } from "./graph";
import type { AdAccountOption, PageOption } from "./types";

const APP_ID = process.env.FB_APP_ID;
const APP_SECRET = process.env.FB_APP_SECRET;
const REDIRECT_URI = process.env.FB_REDIRECT_URI;

// Scopes needed to manage ads on an account you are already an admin/advertiser of.
// These are "Standard Access" for your own business - no App Review needed as long
// as you only ever use the token against ad accounts / pages you own. See GUIDE.md.
const SCOPES = ["ads_management", "business_management", "pages_show_list", "pages_read_engagement"].join(",");

export function assertOAuthConfigured() {
  if (!APP_ID || !APP_SECRET || !REDIRECT_URI) {
    throw new Error(
      "Facebook OAuth is not configured. Set FB_APP_ID, FB_APP_SECRET and FB_REDIRECT_URI in .env.local " +
        "(or set FB_SYSTEM_USER_TOKEN instead to skip OAuth entirely - see GUIDE.md)."
    );
  }
}

export function buildLoginUrl(state: string): string {
  assertOAuthConfigured();
  const url = new URL(`https://www.facebook.com/${process.env.FB_GRAPH_VERSION || "v21.0"}/dialog/oauth`);
  url.searchParams.set("client_id", APP_ID!);
  url.searchParams.set("redirect_uri", REDIRECT_URI!);
  url.searchParams.set("state", state);
  url.searchParams.set("scope", SCOPES);
  url.searchParams.set("response_type", "code");
  return url.toString();
}

export async function exchangeCodeForShortLivedToken(code: string): Promise<string> {
  assertOAuthConfigured();
  const url = new URL(`${GRAPH_BASE}/oauth/access_token`);
  url.searchParams.set("client_id", APP_ID!);
  url.searchParams.set("client_secret", APP_SECRET!);
  url.searchParams.set("redirect_uri", REDIRECT_URI!);
  url.searchParams.set("code", code);

  const res = await fetch(url.toString());
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || "Failed to exchange code for access token");
  return json.access_token as string;
}

/**
 * Short-lived user tokens expire in ~1-2 hours. Facebook lets you trade one
 * for a long-lived token (~60 days) in a single extra call.
 */
export async function getLongLivedToken(shortLivedToken: string): Promise<{ accessToken: string; expiresInSeconds: number }> {
  assertOAuthConfigured();
  const url = new URL(`${GRAPH_BASE}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", APP_ID!);
  url.searchParams.set("client_secret", APP_SECRET!);
  url.searchParams.set("fb_exchange_token", shortLivedToken);

  const res = await fetch(url.toString());
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || "Failed to extend access token");
  return { accessToken: json.access_token, expiresInSeconds: json.expires_in ?? 60 * 24 * 60 * 60 };
}

export async function getMe(accessToken: string): Promise<{ id: string; name: string }> {
  return graphRequest("me", { accessToken, params: { fields: "id,name" } });
}

export async function listAdAccounts(accessToken: string): Promise<AdAccountOption[]> {
  const data = await graphRequest<{ data: any[] }>("me/adaccounts", {
    accessToken,
    params: { fields: "id,name,currency,account_status", limit: 100 }
  });
  return data.data.map((a) => ({
    id: a.id,
    name: a.name || a.id,
    currency: a.currency,
    accountStatus: a.account_status
  }));
}

export async function listPages(accessToken: string): Promise<PageOption[]> {
  const data = await graphRequest<{ data: any[] }>("me/accounts", {
    accessToken,
    params: { fields: "id,name", limit: 100 }
  });
  return data.data.map((p) => ({ id: p.id, name: p.name }));
}
