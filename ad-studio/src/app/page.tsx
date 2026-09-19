"use client";

import { useState } from "react";
import StepNav from "@/components/StepNav";
import UploadAssets from "@/components/UploadAssets";
import GenerateCreatives from "@/components/GenerateCreatives";
import HandoffPanel from "@/components/HandoffPanel";
import type { CreativeRecord } from "@/lib/store";

export default function Home() {
  const [step, setStep] = useState(1);
  const [assetId, setAssetId] = useState<string | null>(null);
  const [creatives, setCreatives] = useState<CreativeRecord[]>([]);
  const [selectedCreativeIds, setSelectedCreativeIds] = useState<string[]>([]);

  function toggleCreative(id: string) {
    setSelectedCreativeIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const selectedCreatives = creatives.filter((c) => selectedCreativeIds.includes(c.id));

  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">BookedAway Ad Studio</h1>
        <p className="mt-1 text-slate-600">
          Upload a product photo, generate ad creatives, then hand them to Claude to publish via Meta&apos;s official
          Ads MCP - this app never talks to Facebook itself.
        </p>
      </header>

      <StepNav current={step} />

      <div className="space-y-6">
        {step === 1 && <UploadAssets selectedAssetId={assetId} onSelect={setAssetId} />}

        {step === 2 && assetId && (
          <>
            <GenerateCreatives
              assetId={assetId}
              selectedCreativeIds={selectedCreativeIds}
              onToggleCreative={toggleCreative}
              creatives={creatives}
              setCreatives={setCreatives}
            />
            <HandoffPanel selected={selectedCreatives} />
          </>
        )}

        <div className="flex justify-between">
          <button className="btn-secondary" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
            Back
          </button>
          {step === 1 && (
            <button className="btn-primary" disabled={!assetId} onClick={() => setStep(2)}>
              Continue
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
