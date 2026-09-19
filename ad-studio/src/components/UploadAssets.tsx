"use client";

import { useEffect, useRef, useState } from "react";
import type { AssetRecord } from "@/lib/store";

export default function UploadAssets({
  selectedAssetId,
  onSelect
}: {
  selectedAssetId: string | null;
  onSelect: (assetId: string) => void;
}) {
  const [assets, setAssets] = useState<AssetRecord[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function refresh() {
    const res = await fetch("/api/assets/list");
    const data = await res.json();
    setAssets(data.assets ?? []);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/assets/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      await refresh();
      onSelect(data.asset.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Step 2 · Upload a product photo</h2>
      <p className="text-sm text-slate-600">
        One clean photo of your product is enough - we&apos;ll crop and reformat it into every ad size you need.
      </p>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        className="block text-sm"
      />
      {uploading && <p className="text-sm text-slate-500">Uploading…</p>}

      {assets.length > 0 && (
        <div>
          <p className="label">Your photos</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {assets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => onSelect(asset.id)}
                className={
                  "overflow-hidden rounded-lg border-2 " +
                  (selectedAssetId === asset.id ? "border-brand-600" : "border-transparent")
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.url} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
