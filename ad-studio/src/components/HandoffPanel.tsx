"use client";

import { useState } from "react";
import type { CreativeRecord } from "@/lib/store";

/**
 * Publishing to Facebook does NOT happen in this app. Once creatives are
 * selected, this panel gives the operator everything they need to hand off
 * to Claude (connected to Meta's official Ads MCP) to actually create the
 * Campaign/Ad Set/Ads - see GUIDE.md, Part 3.
 */
export default function HandoffPanel({ selected }: { selected: CreativeRecord[] }) {
  const [copied, setCopied] = useState(false);

  if (!selected.length) return null;

  const brief = [
    `Please publish these ${selected.length} ad creative(s) to Facebook via the Meta Ads MCP.`,
    "(If I'm running this app on localhost, that URL isn't reachable by you - I'll attach the downloaded image file to this chat instead.)",
    "",
    ...selected.map(
      (c, i) => `${i + 1}. ${window.location.origin}${c.url}  (${c.templateId}, ${c.format}) - headline: "${c.headline}"${c.subheadline ? `, subheadline: "${c.subheadline}"` : ""}, CTA: "${c.cta}"`
    ),
    "",
    "Campaign name: ",
    "Objective (Traffic / Sales / Engagement / Awareness / Leads): ",
    "Daily budget: $",
    "Destination URL: ",
    "Countries: ",
    "Status: Paused until I review it"
  ].join("\n");

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (e.g. non-HTTPS) - the textarea below is the fallback.
    }
  }

  return (
    <div className="card space-y-4 border-brand-200 bg-brand-50">
      <h2 className="text-lg font-semibold">Hand off to Claude to publish</h2>
      <p className="text-sm text-slate-600">
        This app never talks to Facebook directly. To actually create the campaign, download the image(s) below (or
        just copy the brief), then paste it to Claude in your chat - Claude creates the real Campaign → Ad Set → Ads
        through Meta&apos;s official Ads MCP. See <strong>GUIDE.md, Part 3</strong> for the full walkthrough.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {selected.map((c) => (
          <div key={c.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.url} alt="" className="w-full object-cover" style={{ aspectRatio: c.format === "story" ? "9/16" : c.format === "portrait" ? "4/5" : "1/1" }} />
            <div className="p-2">
              <a className="text-xs font-medium text-brand-600 underline" href={c.url} download>
                Download image
              </a>
              <p className="mt-1 text-xs text-slate-500">
                {c.templateId} · {c.format}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="label">Ad brief to paste to Claude</label>
        <textarea className="input h-40 font-mono text-xs" readOnly value={brief} onFocus={(e) => e.target.select()} />
        <button className="btn-secondary mt-2" onClick={copyBrief}>
          {copied ? "Copied!" : "Copy brief"}
        </button>
      </div>
    </div>
  );
}
