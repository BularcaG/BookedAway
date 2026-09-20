"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdSpec, CreativeAsset } from "@/lib/types";

function timeAgo(ts: number): string {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function money(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function LibraryPage() {
  const router = useRouter();
  const [specs, setSpecs] = useState<AdSpec[]>([]);
  const [assets, setAssets] = useState<CreativeAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [importJson, setImportJson] = useState("");

  async function refresh() {
    const [specRes, assetRes] = await Promise.all([fetch("/api/specs"), fetch("/api/assets/list")]);
    const specData = await specRes.json();
    const assetData = await assetRes.json();
    setSpecs(specData.specs ?? []);
    setAssets(assetData.assets ?? []);
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  async function createSpec(duplicateFromId?: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/specs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicateFromId ? { duplicateFromId } : {})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create the ad");
      router.push(`/builder?id=${data.spec.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the ad");
      setBusy(false);
    }
  }

  async function importSpec() {
    setBusy(true);
    setError(null);
    try {
      const parsed = JSON.parse(importJson);
      const res = await fetch("/api/specs/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      router.push(`/builder?id=${data.spec.id}`);
    } catch (err) {
      setError(err instanceof Error ? `Import failed: ${err.message}` : "Import failed");
      setBusy(false);
    }
  }

  async function removeSpec(id: string) {
    if (!confirm("Delete this ad spec? This can't be undone.")) return;
    await fetch(`/api/specs/${id}`, { method: "DELETE" });
    await refresh();
  }

  const thumbFor = (spec: AdSpec) => assets.find((a) => a.id === spec.creative.assetIds[0]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">Ad Library</h1>
          <p className="mt-1 text-sm text-ink-400">
            Build the full spec here - campaign, budget, bid cap, targeting, creative - then hand it off to be published
            through Meta&apos;s official connection. Duplicating an ad that already works is usually the fastest route.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => setImportOpen((v) => !v)}>
            Import spec
          </button>
          <button className="btn-primary" onClick={() => createSpec()} disabled={busy}>
            + New ad
          </button>
        </div>
      </div>

      {importOpen && (
        <div className="card card-body">
          <div>
            <label className="label">Paste a spec JSON</label>
            <textarea
              className="textarea h-40 font-mono text-[11px]"
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder='Paste the contents of seeds/testing-campaign-baseline.json, or any spec JSON Claude gives you.'
            />
            <p className="hint">
              Anything the JSON leaves out falls back to defaults, so a partial spec is fine. Useful for seeding settings
              read off a campaign that already runs in Ads Manager.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={importSpec} disabled={busy || !importJson.trim()}>
              Import
            </button>
            <button className="btn-secondary" onClick={() => setImportOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {loading ? (
        <div className="card card-body text-sm text-ink-400">Loading…</div>
      ) : specs.length === 0 ? (
        <div className="card card-body text-center">
          <p className="text-sm font-medium text-ink-900">No ads built yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-ink-400">
            Create your first one from scratch. After that, most ads are faster to make by duplicating a previous one and
            swapping the creative or the copy.
          </p>
          <div className="mt-4">
            <button className="btn-primary" onClick={() => createSpec()} disabled={busy}>
              + New ad
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((spec) => {
            const thumb = thumbFor(spec);
            const isCbo = spec.campaign.budgetLevel === "campaign";
            const budget = isCbo ? spec.campaign.budgetAmount : spec.adSet.budgetAmount;
            const budgetType = isCbo ? spec.campaign.budgetType : spec.adSet.budgetType;
            const bidStrategy = isCbo ? spec.campaign.bidStrategy : spec.adSet.bidStrategy;

            return (
              <div key={spec.id} className="card flex flex-col overflow-hidden">
                <div className="flex gap-3 p-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-ink-100 bg-ink-50">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb.url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-ink-400">No image</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={"badge " + (spec.status === "submitted" ? "badge-submitted" : "badge-draft")}>
                        {spec.status === "submitted" ? "Sent" : "Draft"}
                      </span>
                      {spec.duplicatedFromId && <span className="badge badge-accent">Duplicate</span>}
                    </div>
                    <p className="mt-1.5 truncate text-sm font-semibold text-ink-900">{spec.name || spec.adName || "Untitled ad"}</p>
                    <p className="truncate text-xs text-ink-400">
                      {spec.campaign.mode === "existing"
                        ? spec.campaign.existingCampaignName || "Existing campaign"
                        : spec.campaign.newCampaignName || "New campaign"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 px-4 pb-3 text-xs">
                  <span className="badge badge-muted">{money(budget)} {budgetType}</span>
                  <span className="badge badge-muted">{isCbo ? "CBO" : "ABO"}</span>
                  {bidStrategy !== "LOWEST_COST_WITHOUT_CAP" && (
                    <span className="badge badge-accent">{bidStrategy === "COST_CAP" ? "Cost cap" : "Bid cap"}</span>
                  )}
                  {spec.creative.format !== "single" && <span className="badge badge-accent">{spec.creative.format}</span>}
                  {spec.campaign.catalogCampaign && <span className="badge badge-accent">Catalog</span>}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-ink-100 px-3 py-2">
                  <span className="pl-1 text-[11px] text-ink-400">{timeAgo(spec.updatedAt)}</span>
                  <div className="flex items-center gap-0.5">
                    <button className="btn-ghost" onClick={() => router.push(`/builder?id=${spec.id}`)}>
                      Open
                    </button>
                    <button className="btn-ghost" onClick={() => createSpec(spec.id)} disabled={busy}>
                      Duplicate
                    </button>
                    <button className="btn-danger" onClick={() => removeSpec(spec.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
