"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CampaignSection from "./CampaignSection";
import AdSetSection from "./AdSetSection";
import CreativeSection from "./CreativeSection";
import BriefPanel from "./BriefPanel";
import Segmented from "./Segmented";
import type { AdSetConfig, AdSpec, CampaignConfig, CreativeConfig, LaunchStatus } from "@/lib/types";

export default function AdSpecBuilder({ specId }: { specId: string }) {
  const router = useRouter();
  const [spec, setSpec] = useState<AdSpec | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch(`/api/specs/${specId}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load this ad");
        setSpec(data.spec);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load this ad"))
      .finally(() => setLoading(false));
  }, [specId]);

  const persist = useCallback(async (next: AdSpec) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/specs/${next.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next)
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      setSavedAt(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }, []);

  // Debounced autosave - typing in a field shouldn't cost a round trip per keystroke.
  const update = useCallback(
    (patch: Partial<AdSpec>) => {
      setSpec((current) => {
        if (!current) return current;
        const next = { ...current, ...patch };
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => persist(next), 600);
        return next;
      });
    },
    [persist]
  );

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  if (loading) return <div className="card card-body text-sm text-ink-400">Loading…</div>;
  if (!spec) return <div className="card card-body text-sm text-red-700">{error ?? "Ad not found"}</div>;

  const onCampaign = (patch: Partial<CampaignConfig>) => update({ campaign: { ...spec.campaign, ...patch } });
  const onAdSet = (patch: Partial<AdSetConfig>) => update({ adSet: { ...spec.adSet, ...patch } });
  const onCreative = (patch: Partial<CreativeConfig>) => update({ creative: { ...spec.creative, ...patch } });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <button className="btn-ghost -ml-2.5 mb-1" onClick={() => router.push("/")}>
            ← Ad Library
          </button>
          <input
            className="w-full max-w-md rounded-lg border border-transparent bg-transparent px-1 py-0.5 text-2xl font-bold tracking-tight text-ink-900 hover:border-ink-200 focus:border-brand-500 focus:bg-white focus:outline-none"
            value={spec.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Name this ad spec"
          />
          {spec.duplicatedFromId && <p className="mt-1 pl-1 text-xs text-ink-400">Duplicated from an earlier spec</p>}
        </div>
        <div className="flex items-center gap-2 text-xs text-ink-400">
          {saving ? "Saving…" : savedAt ? "Saved" : ""}
          <span className={"badge " + (spec.status === "submitted" ? "badge-submitted" : "badge-draft")}>
            {spec.status === "submitted" ? "Sent" : "Draft"}
          </span>
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <section className="card">
            <div className="card-body">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Ad name (shown in Ads Manager)</label>
                  <input className="input" value={spec.adName} onChange={(e) => update({ adName: e.target.value })} placeholder="3.1" />
                </div>
                <div>
                  <label className="label">Ad account ID</label>
                  <input className="input" value={spec.adAccountId} onChange={(e) => update({ adAccountId: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label">Launch as</label>
                <Segmented<LaunchStatus>
                  value={spec.launchStatus}
                  onChange={(launchStatus) => update({ launchStatus })}
                  options={[
                    { id: "PAUSED", label: "Paused (review first)" },
                    { id: "ACTIVE", label: "Active (spends now)" }
                  ]}
                />
              </div>
            </div>
          </section>

          <CampaignSection campaign={spec.campaign} onChange={onCampaign} />
          <AdSetSection
            adSet={spec.adSet}
            objective={spec.campaign.mode === "new" ? spec.campaign.objective : "OUTCOME_SALES"}
            showBudget={spec.campaign.budgetLevel === "adset"}
            onChange={onAdSet}
          />
          <CreativeSection creative={spec.creative} onChange={onCreative} />

          <section className="card">
            <div className="card-body">
              <label className="label">Notes for Claude (optional)</label>
              <textarea
                className="textarea"
                value={spec.notes}
                onChange={(e) => update({ notes: e.target.value })}
                placeholder="Anything unusual about this one - e.g. match the settings on ad set S1, or hold until Friday."
              />
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-5 lg:self-start">
          <BriefPanel spec={spec} onMarkedSent={(next) => setSpec(next)} />
        </div>
      </div>
    </div>
  );
}
