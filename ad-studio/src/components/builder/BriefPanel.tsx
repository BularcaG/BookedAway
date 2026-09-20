"use client";

import { useState } from "react";
import type { AdSpec, CreativeAsset } from "@/lib/types";

interface BriefData {
  brief: string;
  payload: unknown;
  issues: string[];
  assets: CreativeAsset[];
}

export default function BriefPanel({ spec, onMarkedSent }: { spec: AdSpec; onMarkedSent: (spec: AdSpec) => void }) {
  const [data, setData] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<"brief" | "json" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/specs/${spec.id}/brief`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not build the brief");
      setData(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not build the brief");
    } finally {
      setLoading(false);
    }
  }

  async function copy(text: string, which: "brief" | "json") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard can be unavailable over plain http - the textarea below is the fallback.
    }
  }

  async function markSent() {
    const res = await fetch(`/api/specs/${spec.id}/brief`, { method: "POST" });
    const body = await res.json();
    if (res.ok) onMarkedSent(body.spec);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="section-title">Hand off</h2>
          <p className="section-hint">Build the brief, paste it to Claude, attach the creative files.</p>
        </div>
      </div>
      <div className="card-body">
        <button className="btn-primary w-full" onClick={generate} disabled={loading}>
          {loading ? "Building…" : "Build brief"}
        </button>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}

        {data && (
          <>
            {data.issues.length > 0 ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
                <p className="text-xs font-semibold text-amber-900">{data.issues.length} thing(s) to fix first</p>
                <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs text-amber-800">
                  {data.issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
                Looks complete - nothing missing.
              </p>
            )}

            <div>
              <label className="label">Brief</label>
              <textarea className="textarea h-56 font-mono text-[11px] leading-relaxed" readOnly value={data.brief} />
              <div className="mt-2 flex flex-wrap gap-2">
                <button className="btn-secondary px-3 py-1.5 text-xs" onClick={() => copy(data.brief, "brief")}>
                  {copied === "brief" ? "Copied!" : "Copy brief"}
                </button>
                <button
                  className="btn-secondary px-3 py-1.5 text-xs"
                  onClick={() => copy(JSON.stringify(data.payload, null, 2), "json")}
                >
                  {copied === "json" ? "Copied!" : "Copy JSON"}
                </button>
              </div>
            </div>

            {data.assets.length > 0 && (
              <div>
                <label className="label">Attach these files to the chat</label>
                <div className="space-y-1.5">
                  {data.assets.map((asset) => (
                    <a
                      key={asset.id}
                      href={asset.url}
                      download
                      className="flex items-center gap-2 rounded-lg border border-ink-100 px-2.5 py-2 text-xs text-ink-700 hover:bg-ink-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={asset.url} alt="" className="h-8 w-8 rounded object-cover" />
                      <span className="truncate font-medium">{asset.fileName}</span>
                      <span className="ml-auto shrink-0 text-ink-400">Download</span>
                    </a>
                  ))}
                </div>
                <p className="hint">Claude can&apos;t reach a localhost URL, so the actual files need attaching.</p>
              </div>
            )}

            {spec.status !== "submitted" && (
              <button className="btn-secondary w-full" onClick={markSent}>
                Mark as sent
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
