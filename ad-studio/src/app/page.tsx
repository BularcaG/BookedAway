"use client";

import { useState } from "react";
import StepNav from "@/components/StepNav";
import ConnectFacebook from "@/components/ConnectFacebook";
import UploadAssets from "@/components/UploadAssets";
import GenerateCreatives from "@/components/GenerateCreatives";
import PublishCampaign from "@/components/PublishCampaign";
import type { CreativeRecord } from "@/lib/store";

export default function Home() {
  const [step, setStep] = useState(1);
  const [fbReady, setFbReady] = useState(false);
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
        <p className="mt-1 text-slate-600">Upload a product photo, generate ad creatives, publish straight to Facebook Ads Manager.</p>
      </header>

      <StepNav current={step} />

      <div className="space-y-6">
        {step === 1 && <ConnectFacebook onReady={setFbReady} />}

        {step === 2 && <UploadAssets selectedAssetId={assetId} onSelect={setAssetId} />}

        {step === 3 && assetId && (
          <GenerateCreatives
            assetId={assetId}
            selectedCreativeIds={selectedCreativeIds}
            onToggleCreative={toggleCreative}
            creatives={creatives}
            setCreatives={setCreatives}
          />
        )}

        {step === 4 && <PublishCampaign selectedCreatives={selectedCreatives} />}

        <div className="flex justify-between">
          <button className="btn-secondary" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
            Back
          </button>
          <button
            className="btn-primary"
            disabled={
              (step === 1 && !fbReady) ||
              (step === 2 && !assetId) ||
              (step === 3 && !selectedCreativeIds.length) ||
              step === 4
            }
            onClick={() => setStep((s) => Math.min(4, s + 1))}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
