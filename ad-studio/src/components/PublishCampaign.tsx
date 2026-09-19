"use client";

import { useState } from "react";
import type { CreativeRecord } from "@/lib/store";

const OBJECTIVES = [
  { id: "OUTCOME_TRAFFIC", label: "Traffic (send people to your store)" },
  { id: "OUTCOME_SALES", label: "Sales (conversions)" },
  { id: "OUTCOME_ENGAGEMENT", label: "Engagement" },
  { id: "OUTCOME_AWARENESS", label: "Awareness" },
  { id: "OUTCOME_LEADS", label: "Leads" }
];

const CTAS = ["SHOP_NOW", "LEARN_MORE", "SIGN_UP", "GET_OFFER", "SUBSCRIBE"];

export default function PublishCampaign({ selectedCreatives }: { selectedCreatives: CreativeRecord[] }) {
  const [campaignName, setCampaignName] = useState("");
  const [objective, setObjective] = useState("OUTCOME_TRAFFIC");
  const [budget, setBudget] = useState("10");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [primaryText, setPrimaryText] = useState("");
  const [headline, setHeadline] = useState("");
  const [callToAction, setCallToAction] = useState("SHOP_NOW");
  const [countries, setCountries] = useState("US");
  const [status, setStatus] = useState<"PAUSED" | "ACTIVE">("PAUSED");
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ manageUrl: string; id: string } | null>(null);

  async function publish() {
    setError(null);
    if (!campaignName.trim()) return setError("Give your campaign a name");
    if (!destinationUrl.trim()) return setError("Where should ads link to? Add your store or product URL");
    if (!selectedCreatives.length) return setError("Go back and select at least one creative to publish");

    setPublishing(true);
    try {
      const res = await fetch("/api/campaigns/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignName,
          objective,
          dailyBudgetCents: Math.round(parseFloat(budget) * 100),
          destinationUrl,
          primaryText,
          headline,
          callToAction,
          countries: countries.split(",").map((c) => c.trim().toUpperCase()).filter(Boolean),
          creativeIds: selectedCreatives.map((c) => c.id),
          status
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not publish this campaign");
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish this campaign");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Step 4 · Configure & publish to Facebook</h2>
      <p className="text-sm text-slate-600">
        This creates a real Campaign → Ad Set → Ad in Ads Manager for every creative you selected. Default status is{" "}
        <strong>Paused</strong> so nothing spends money until you review and switch it on yourself in Ads Manager.
      </p>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {result ? (
        <div className="space-y-3 rounded-lg bg-green-50 p-4 text-sm text-green-800">
          <p>🎉 Published! Campaign ID: {result.id}</p>
          <a className="btn-primary" href={result.manageUrl} target="_blank" rel="noreferrer">
            Open in Ads Manager
          </a>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500">{selectedCreatives.length} creative(s) selected for this campaign.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Campaign name</label>
              <input className="input" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="Fall Candle Launch" />
            </div>
            <div>
              <label className="label">Objective</label>
              <select className="input" value={objective} onChange={(e) => setObjective(e.target.value)}>
                {OBJECTIVES.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Daily budget (USD)</label>
              <input className="input" type="number" min="1" step="0.5" value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
            <div>
              <label className="label">Countries (comma separated)</label>
              <input className="input" value={countries} onChange={(e) => setCountries(e.target.value)} placeholder="US, CA, GB" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Destination URL (your store / product page)</label>
              <input className="input" value={destinationUrl} onChange={(e) => setDestinationUrl(e.target.value)} placeholder="https://your-store.com/products/candle" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Primary text (above the image)</label>
              <textarea className="input" rows={2} value={primaryText} onChange={(e) => setPrimaryText(e.target.value)} placeholder="Hand-poured, small batch, ships in 2 days." />
            </div>
            <div>
              <label className="label">Ad headline (leave blank to reuse creative headline)</label>
              <input className="input" value={headline} onChange={(e) => setHeadline(e.target.value)} />
            </div>
            <div>
              <label className="label">Call to action button</label>
              <select className="input" value={callToAction} onChange={(e) => setCallToAction(e.target.value)}>
                {CTAS.map((c) => (
                  <option key={c} value={c}>
                    {c.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Publish as</label>
              <select className="input" value={status} onChange={(e) => setStatus(e.target.value as "PAUSED" | "ACTIVE")}>
                <option value="PAUSED">Paused (review before it spends)</option>
                <option value="ACTIVE">Active (starts spending immediately)</option>
              </select>
            </div>
          </div>

          <button className="btn-primary" onClick={publish} disabled={publishing || !selectedCreatives.length}>
            {publishing ? "Publishing…" : "Publish to Facebook Ads Manager"}
          </button>
        </>
      )}
    </div>
  );
}
