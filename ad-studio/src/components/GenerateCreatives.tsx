"use client";

import { useState } from "react";
import type { CreativeRecord } from "@/lib/store";
import AddTextToCreative from "./AddTextToCreative";

const TEMPLATE_OPTIONS = [
  { id: "bold-bottom-bar", label: "Bold Bottom Bar" },
  { id: "top-banner-clean", label: "Top Banner Clean" },
  { id: "framed-badge", label: "Framed Badge" },
  { id: "deal-card", label: "Deal Card (stars + CTA)" },
  { id: "passthrough", label: "No Overlay (Resize Only)" }
];

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
  const [templates, setTemplates] = useState<string[]>(["passthrough"]);
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
        By default this just crops/resizes your photo - no text added. If you want a template to stamp copy onto
        it, check one below and fill in a headline first. Prefer to decide on text later, one image at a time?
        Generate with no text, then click <strong>&quot;+ Add text&quot;</strong> under any result and type the
        exact words you want - nothing is guessed or reworded for you.
      </p>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Headline (only needed if a template below is checked)</label>
          <input className="input" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Handmade candles, 30% off" />
        </div>
        <div>
          <label className="label">Call to action</label>
          <input className="input" value={cta} onChange={(e) => setCta(e.target.value)} placeholder="Shop Now" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Subheadline / social proof (optional)</label>
          <input
            className="input"
            value={subheadline}
            onChange={(e) => setSubheadline(e.target.value)}
            placeholder="Free shipping this week only - or, for Deal Card: 10,000+ Happy Readers"
          />
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
              <div key={c.id} className={"overflow-hidden rounded-lg border-2 " + (selectedCreativeIds.includes(c.id) ? "border-brand-600" : "border-transparent")}>
                <button onClick={() => onToggleCreative(c.id)} className="block w-full text-left">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.url} alt="" className="w-full object-cover" style={{ aspectRatio: c.format === "story" ? "9/16" : c.format === "portrait" ? "4/5" : "1/1" }} />
                  <span className="block px-2 py-1 text-xs text-slate-600">
                    {c.templateId} · {c.format}
                  </span>
                </button>
                <div className="px-2 pb-2">
                  <AddTextToCreative creative={c} onAdded={(newCreative) => setCreatives([newCreative, ...creatives])} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
