"use client";

import { useEffect, useRef, useState } from "react";
import Segmented from "./Segmented";
import Toggle from "../Toggle";
import { CALL_TO_ACTIONS } from "@/lib/defaults";
import type { AdFormat, CreativeAsset, CreativeConfig } from "@/lib/types";

export default function CreativeSection({
  creative,
  onChange
}: {
  creative: CreativeConfig;
  onChange: (patch: Partial<CreativeConfig>) => void;
}) {
  const [assets, setAssets] = useState<CreativeAsset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function refreshAssets() {
    const res = await fetch("/api/assets/list");
    const data = await res.json();
    setAssets(data.assets ?? []);
  }

  useEffect(() => {
    refreshAssets();
  }, []);

  async function upload(files: FileList) {
    setUploading(true);
    setError(null);
    try {
      const uploadedIds: string[] = [];
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/assets/upload", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        uploadedIds.push(data.asset.id);
      }
      await refreshAssets();
      // Newly uploaded creatives are almost always the ones meant for this ad.
      onChange({ assetIds: creative.format === "single" ? uploadedIds.slice(-1) : [...creative.assetIds, ...uploadedIds] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function toggleAsset(id: string) {
    const selected = creative.assetIds.includes(id);
    if (creative.format === "single") {
      onChange({ assetIds: selected ? [] : [id] });
      return;
    }
    onChange({ assetIds: selected ? creative.assetIds.filter((x) => x !== id) : [...creative.assetIds, id] });
  }

  const selectedAssets = creative.assetIds
    .map((id) => assets.find((a) => a.id === id))
    .filter((a): a is CreativeAsset => Boolean(a));

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2 className="section-title">Ad &amp; creative</h2>
          <p className="section-hint">The image, the copy, and where the click goes.</p>
        </div>
      </div>

      <div className="card-body">
        <div>
          <label className="label">Format</label>
          <Segmented<AdFormat>
            value={creative.format}
            onChange={(format) =>
              onChange({ format, assetIds: format === "single" ? creative.assetIds.slice(0, 1) : creative.assetIds })
            }
            options={[
              { id: "single", label: "Single image" },
              { id: "carousel", label: "Carousel" },
              { id: "collection", label: "Collection" }
            ]}
          />
          <p className="hint">
            {creative.format === "single"
              ? "One image, one link. The default and the simplest to test."
              : creative.format === "carousel"
              ? "Multiple swipeable cards - pick 2 or more creatives below, in order."
              : "A main creative with a product grid underneath, pulled from your catalog."}
          </p>
        </div>

        <Toggle
          label="Shop surface under the creative"
          hint="Adds the shop/collection strip beneath a static ad. Off by default."
          checked={creative.shopEnabled}
          onChange={(shopEnabled) => onChange({ shopEnabled })}
        />

        <div className="space-y-4 border-t border-ink-100 pt-4">
          <div>
            <label className="label">Primary text</label>
            <textarea
              className="textarea"
              value={creative.primaryText}
              onChange={(e) => onChange({ primaryText: e.target.value })}
              placeholder={"📚 Cozy Mystery Readers — This One's For You\nSave 25% For A Limited Time!\nShop: bookedaway.shop/sale"}
            />
            <p className="hint">The block of copy above the image.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Headline</label>
              <input
                className="input"
                value={creative.headline}
                onChange={(e) => onChange({ headline: e.target.value })}
                placeholder="Night Owl T-Shirt"
              />
              <p className="hint">Bold line under the image.</p>
            </div>
            <div>
              <label className="label">Description</label>
              <input
                className="input"
                value={creative.description}
                onChange={(e) => onChange({ description: e.target.value })}
                placeholder="★★★★★ 10,000+ Happy Readers"
              />
              <p className="hint">Small grey line under the headline.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Call to action</label>
              <select className="select" value={creative.callToAction} onChange={(e) => onChange({ callToAction: e.target.value })}>
                {CALL_TO_ACTIONS.map((cta) => (
                  <option key={cta} value={cta}>
                    {cta.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Destination URL</label>
              <input
                className="input"
                value={creative.destinationUrl}
                onChange={(e) => onChange({ destinationUrl: e.target.value })}
                placeholder="https://bookedaway.shop/products/night-owl?variant=..."
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Facebook Page ID</label>
              <input className="input" value={creative.pageId} onChange={(e) => onChange({ pageId: e.target.value })} />
            </div>
            <div>
              <label className="label">Instagram account ID (optional)</label>
              <input
                className="input"
                value={creative.instagramAccountId}
                onChange={(e) => onChange({ instagramAccountId: e.target.value })}
              />
              <p className="hint">Leave blank and the ad won&apos;t deliver on Instagram surfaces.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-ink-100 pt-4">
          <div className="flex items-center justify-between">
            <label className="label mb-0">Creative files</label>
            <button className="btn-secondary px-3 py-1.5 text-xs" onClick={() => inputRef.current?.click()} disabled={uploading}>
              {uploading ? "Uploading…" : "Upload creative"}
            </button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple={creative.format !== "single"}
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) upload(e.target.files);
            }}
          />
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}

          {assets.length === 0 ? (
            <p className="rounded-lg border border-dashed border-ink-200 px-3 py-6 text-center text-xs text-ink-400">
              No creatives uploaded yet. Upload the finished image you want to run.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
              {assets.map((asset) => {
                const index = creative.assetIds.indexOf(asset.id);
                const selected = index !== -1;
                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => toggleAsset(asset.id)}
                    className={
                      "relative overflow-hidden rounded-lg border-2 transition " +
                      (selected ? "border-brand-600" : "border-transparent hover:border-ink-200")
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset.url} alt="" className="aspect-square w-full bg-ink-50 object-cover" />
                    {selected && creative.format !== "single" && (
                      <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                        {index + 1}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
          {selectedAssets.length > 0 && (
            <p className="text-xs text-ink-400">
              {selectedAssets.length} selected · {selectedAssets.map((a) => a.fileName).join(", ")}
            </p>
          )}
        </div>

        <div className="space-y-3 border-t border-ink-100 pt-4">
          <Toggle
            label="Advantage+ creative enhancements"
            hint="Meta auto-adjusts your image and text per impression. Off keeps the creative exactly as you made it."
            checked={creative.advantagePlusCreative}
            onChange={(advantagePlusCreative) => onChange({ advantagePlusCreative })}
          />
          <div>
            <label className="label">AI content disclosure</label>
            <Segmented<"" | "OPT_IN" | "OPT_OUT">
              value={creative.aiDisclosure}
              onChange={(aiDisclosure) => onChange({ aiDisclosure })}
              options={[
                { id: "", label: "Not declared" },
                { id: "OPT_OUT", label: "No AI used" },
                { id: "OPT_IN", label: "AI used" }
              ]}
            />
            <p className="hint">Your call to make - required in some regions when a creative was made or edited with generative AI.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
