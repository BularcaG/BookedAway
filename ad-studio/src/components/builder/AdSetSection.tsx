"use client";

import Segmented from "./Segmented";
import Toggle from "../Toggle";
import { BID_STRATEGIES, BILLING_EVENTS, COUNTRY_OPTIONS, OPTIMIZATION_GOALS, PUBLISHER_PLATFORMS } from "@/lib/defaults";
import type { AdSetConfig, BidStrategy, BudgetType } from "@/lib/types";

export default function AdSetSection({
  adSet,
  objective,
  showBudget,
  onChange
}: {
  adSet: AdSetConfig;
  objective: string;
  showBudget: boolean;
  onChange: (patch: Partial<AdSetConfig>) => void;
}) {
  const goals = OPTIMIZATION_GOALS[objective] ?? OPTIMIZATION_GOALS.OUTCOME_SALES;
  const bidMeta = BID_STRATEGIES.find((b) => b.id === adSet.bidStrategy);

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2 className="section-title">Ad set</h2>
          <p className="section-hint">Budget, bidding, who sees it and what Meta optimizes toward.</p>
        </div>
      </div>

      <div className="card-body">
        <div>
          <label className="label">Ad set name</label>
          <input className="input" value={adSet.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="S3" />
        </div>

        {showBudget ? (
          <div className="space-y-4 rounded-xl border border-ink-100 bg-ink-50/50 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Budget type</label>
                <Segmented<BudgetType>
                  value={adSet.budgetType}
                  onChange={(budgetType) => onChange({ budgetType })}
                  options={[
                    { id: "daily", label: "Daily" },
                    { id: "lifetime", label: "Lifetime" }
                  ]}
                />
              </div>
              <div>
                <label className="label">Amount (USD)</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  className="input"
                  value={adSet.budgetAmount}
                  onChange={(e) => onChange({ budgetAmount: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="label">Bid strategy</label>
              <Segmented<BidStrategy>
                value={adSet.bidStrategy}
                onChange={(bidStrategy) => onChange({ bidStrategy })}
                options={BID_STRATEGIES.map((b) => ({ id: b.id, label: b.label }))}
              />
              <p className="hint">{bidMeta?.hint}</p>
            </div>

            {bidMeta?.needsAmount && (
              <div>
                <label className="label">{adSet.bidStrategy === "COST_CAP" ? "Target cost per result (USD)" : "Max bid (USD)"}</label>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  className="input"
                  value={adSet.bidAmount}
                  onChange={(e) => onChange({ bidAmount: Number(e.target.value) })}
                />
                <p className="hint">
                  {adSet.bidStrategy === "COST_CAP"
                    ? "Meta keeps average cost per result around this number."
                    : "Meta never bids above this in any single auction."}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="rounded-lg border border-ink-100 bg-ink-50 px-3 py-2 text-xs text-ink-400">
            Budget and bidding live on the campaign (CBO) for this ad. Switch to ad set budget above to set them here.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Optimization goal</label>
            <select className="select" value={adSet.optimizationGoal} onChange={(e) => onChange({ optimizationGoal: e.target.value })}>
              {goals.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
            <p className="hint">Only goals Meta accepts for this objective are listed.</p>
          </div>
          <div>
            <label className="label">Billing event</label>
            <select className="select" value={adSet.billingEvent} onChange={(e) => onChange({ billingEvent: e.target.value })}>
              {BILLING_EVENTS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Pixel ID (conversion tracking)</label>
            <input className="input" value={adSet.pixelId} onChange={(e) => onChange({ pixelId: e.target.value })} placeholder="506614892042719" />
          </div>
          <div>
            <label className="label">Conversion event</label>
            <input className="input" value={adSet.conversionEvent} onChange={(e) => onChange({ conversionEvent: e.target.value })} placeholder="PURCHASE" />
          </div>
        </div>

        <div>
          <label className="label">Countries</label>
          <div className="flex flex-wrap gap-2">
            {COUNTRY_OPTIONS.map((c) => {
              const on = adSet.countries.includes(c.code);
              return (
                <button
                  key={c.code}
                  type="button"
                  className={"checkbox-chip " + (on ? "checkbox-chip-on" : "checkbox-chip-off")}
                  onClick={() =>
                    onChange({ countries: on ? adSet.countries.filter((x) => x !== c.code) : [...adSet.countries, c.code] })
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Age min</label>
            <input
              type="number"
              min={13}
              max={65}
              className="input"
              value={adSet.ageMin}
              onChange={(e) => onChange({ ageMin: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="label">Age max</label>
            <input
              type="number"
              min={13}
              max={65}
              className="input"
              value={adSet.ageMax}
              onChange={(e) => onChange({ ageMax: Number(e.target.value) })}
            />
          </div>
        </div>

        <Toggle
          label="Advantage+ Audience"
          hint="On: Meta treats your targeting as a starting signal and looks wider. This is how your current live ad sets are set."
          checked={adSet.advantageAudience}
          onChange={(advantageAudience) => onChange({ advantageAudience })}
        />

        <Toggle
          label="Manual placements"
          hint="Off means automatic (Advantage+) placements - the recommended default. Turn on only to restrict where ads run."
          checked={adSet.manualPlacements}
          onChange={(manualPlacements) => onChange({ manualPlacements })}
        />
        {adSet.manualPlacements && (
          <div className="flex flex-wrap gap-2">
            {PUBLISHER_PLATFORMS.map((p) => {
              const on = adSet.publisherPlatforms.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  className={"checkbox-chip " + (on ? "checkbox-chip-on" : "checkbox-chip-off")}
                  onClick={() =>
                    onChange({
                      publisherPlatforms: on
                        ? adSet.publisherPlatforms.filter((x) => x !== p.id)
                        : [...adSet.publisherPlatforms, p.id]
                    })
                  }
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Start time (optional)</label>
            <input
              type="datetime-local"
              className="input"
              value={adSet.startTime}
              onChange={(e) => onChange({ startTime: e.target.value })}
            />
          </div>
          <div>
            <label className="label">End time (optional)</label>
            <input
              type="datetime-local"
              className="input"
              value={adSet.endTime}
              onChange={(e) => onChange({ endTime: e.target.value })}
            />
            <p className="hint">Required if you picked a lifetime budget.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
