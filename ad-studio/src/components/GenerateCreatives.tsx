"use client";

import { useState } from "react";
import type { CreativeRecord } from "@/lib/store";

const TEMPLATE_OPTIONS = [
  { id: "bold-bottom-bar", label: "Bold Bottom Bar" },
  { id: "top-banner-clean", label: "Top Banner Clean" },
  { id: "framed-badge", label: "Framed Badge" },
  { id: "passthrough", label: "No Overlay (Resize Only)" }
];

const OVERLAY_TEMPLATE_IDS = TEMPLATE_OPTIONS.filter((t) => t.id !== "passthrough").map((t) => t.id);

const FORMAT_OPTIONS = [
  { id: "square", label: "Square (Feed 1:1)" },
  { id: "portrait", label: "Portrait (Feed 4:5)" },
  { id: "story", label: "Story / Reel (9:16)" }
];

export default function GenerateCreatives({
  assetId,
  selectedCreativeIds,
  onToggleCreative,
  creatives,
  setCreatives
}: {
  assetId: string;
  selectedCreativeIds: string[];
  onToggleCreative: (id: string) => void;
  creatives: CreativeRecord[];
  setCreatives: (c: CreativeRecord[]) => void;
}) {
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [cta, setCta] = useState("Shop Now");
  const [brandColor, setBrandColor] = useState("#2a55d8");
  const [templates, setTemplates] = useState<string[]>(OVERLAY_TEMPLATE_IDS);
  const [formats, setFormats] = useState<string[]>(["square", "portrait"]);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(list: string[], setList: (v: string[]) => void, id: string) {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }

  async function generate() {
    const needsHeadline = templates.some((t) => t !== "passthrough");
    if (needsHeadline && !headline.trim()) {
      setError("Give your ad a headline first (or uncheck every template except \"No Overlay\")");
      return;
    }
    if (!templates.length || !formats.length) {
      setError("Pick at least one template and one format");
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/creatives/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId, headline, subheadline, cta, brandColor, templateIds: templates, formats })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not generate creatives");
      setCreatives([...data.creatives, ...creatives]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate creatives");
    } finally {
      setGenerating(false);
    }
  }

  const thisAssetCreatives = creatives.filter((c) => c.assetId === assetId);

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Step 3 · Generate ad creatives</h2>
      <p className="text-sm text-slate-600">
        Write your ad copy once. We&apos;ll stamp it onto your photo in every template and size you pick below -
        that&apos;s your batch of variations to test, exactly like a creative studio would hand you. Already have a
        finished creative (made elsewhere) and just want it resized to Facebook&apos;s ad sizes with no extra text?
        Uncheck everything except <strong>&quot;No Overlay (Resize Only)&quot;</strong> below.
      </p>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Headline</label>
          <input className="input" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Handmade candles, 30% off" />
        </div>
        <div>
          <label className="label">Call to action</label>
          <input className="input" value={cta} onChange={(e) => setCta(e.target.value)} placeholder="Shop Now" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Subheadline (optional)</label>
          <input className="input" value={subheadline} onChange={(e) => setSubheadline(e.target.value)} placeholder="Free shipping this week only" />
        </div>
        <div>
          <label className="label">Brand color</label>
          <input type="color" className="h-10 w-20 rounded border border-slate-300" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="label">Templates</p>
          <div className="space-y-1">
            {TEMPLATE_OPTIONS.map((t) => (
              <label key={t.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={templates.includes(t.id)} onChange={() => toggle(templates, setTemplates, t.id)} />
                {t.label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="label">Formats</p>
          <div className="space-y-1">
            {FORMAT_OPTIONS.map((f) => (
              <label key={f.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={formats.includes(f.id)} onChange={() => toggle(formats, setFormats, f.id)} />
                {f.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={generate} disabled={generating}>
        {generating ? "Generating…" : `Generate ${templates.length * formats.length || ""} creatives`}
      </button>

      {thisAssetCreatives.length > 0 && (
        <div>
          <p className="label">Pick the ones you want to publish</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {thisAssetCreatives.map((c) => (
              <button
                key={c.id}
                onClick={() => onToggleCreative(c.id)}
                className={"overflow-hidden rounded-lg border-2 text-left " + (selectedCreativeIds.includes(c.id) ? "border-brand-600" : "border-transparent")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.url} alt="" className="w-full object-cover" style={{ aspectRatio: c.format === "story" ? "9/16" : c.format === "portrait" ? "4/5" : "1/1" }} />
                <span className="block px-2 py-1 text-xs text-slate-600">
                  {c.templateId} · {c.format}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
