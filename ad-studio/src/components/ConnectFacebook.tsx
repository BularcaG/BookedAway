"use client";

import { useEffect, useState } from "react";

interface Status {
  connected: boolean;
  userName?: string;
  adAccountId?: string | null;
  adAccountName?: string | null;
  pageId?: string | null;
  pageName?: string | null;
}

interface AdAccountOption {
  id: string;
  name: string;
  currency: string;
}

interface PageOption {
  id: string;
  name: string;
}

export default function ConnectFacebook({ onReady }: { onReady: (ready: boolean) => void }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [adAccounts, setAdAccounts] = useState<AdAccountOption[]>([]);
  const [pages, setPages] = useState<PageOption[]>([]);
  const [adAccountId, setAdAccountId] = useState("");
  const [pageId, setPageId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshStatus() {
    const res = await fetch("/api/auth/facebook/status");
    const data = await res.json();
    setStatus(data);
    if (data.adAccountId) setAdAccountId(data.adAccountId);
    if (data.pageId) setPageId(data.pageId);
    onReady(Boolean(data.connected && data.adAccountId && data.pageId));
    return data as Status;
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fbError = params.get("fb_error");
    if (fbError) setError(fbError);

    refreshStatus()
      .then(async (data) => {
        if (data.connected) {
          const metaRes = await fetch("/api/facebook/meta");
          if (metaRes.ok) {
            const meta = await metaRes.json();
            setAdAccounts(meta.adAccounts);
            setPages(meta.pages);
          }
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveSelection() {
    if (!adAccountId || !pageId) return;
    setSaving(true);
    setError(null);
    try {
      const account = adAccounts.find((a) => a.id === adAccountId);
      const page = pages.find((p) => p.id === pageId);
      const res = await fetch("/api/facebook/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adAccountId, adAccountName: account?.name, pageId, pageName: page?.name })
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to save selection");
      await refreshStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function disconnect() {
    await fetch("/api/auth/facebook/status", { method: "DELETE" });
    setStatus({ connected: false });
    setAdAccounts([]);
    setPages([]);
    onReady(false);
  }

  if (loading) return <div className="card">Checking Facebook connection…</div>;

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Step 1 · Connect your Facebook Ads account</h2>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {!status?.connected && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            Click connect, log into Facebook, and approve access. We only ever ask for permission to manage ads on
            accounts you already control.
          </p>
          <a className="btn-primary" href="/api/auth/facebook/start">
            Connect Facebook
          </a>
        </div>
      )}

      {status?.connected && (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Connected as <span className="font-semibold">{status.userName}</span>.{" "}
            <button className="text-brand-600 underline" onClick={disconnect}>
              Disconnect
            </button>
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Ad account to publish to</label>
              <select className="input" value={adAccountId} onChange={(e) => setAdAccountId(e.target.value)}>
                <option value="">Select an ad account…</option>
                {adAccounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.currency})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Facebook Page ads run as</label>
              <select className="input" value={pageId} onChange={(e) => setPageId(e.target.value)}>
                <option value="">Select a Page…</option>
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn-primary" onClick={saveSelection} disabled={saving || !adAccountId || !pageId}>
            {saving ? "Saving…" : "Save & Continue"}
          </button>
        </div>
      )}
    </div>
  );
}
