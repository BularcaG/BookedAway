"use client";

import Segmented from "./Segmented";
import Toggle from "../Toggle";
import { BID_STRATEGIES, OBJECTIVES, SPECIAL_AD_CATEGORIES } from "@/lib/defaults";
import type { BidStrategy, BudgetLevel, BudgetType, CampaignConfig } from "@/lib/types";

export default function CampaignSection({
  campaign,
  onChange
}: {
  campaign: CampaignConfig;
  onChange: (patch: Partial<CampaignConfig>) => void;
}) {
  const isCbo = campaign.budgetLevel === "campaign";
  const bidMeta = BID_STRATEGIES.find((b) => b.id === campaign.bidStrategy);

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2 className="section-title">Campaign</h2>
          <p className="section-hint">Where this ad lives, what it optimizes for, and who holds the budget.</p>
        </div>
      </div>

      <div className="card-body">
        <Segmented<"existing" | "new">
          value={campaign.mode}
          onChange={(mode) => onChange({ mode })}
          options={[
            { id: "existing", label: "Add to existing campaign" },
            { id: "new", label: "Create new campaign" }
          ]}
        />

        {campaign.mode === "existing" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Campaign name</label>
              <input
                className="input"
                value={campaign.existingCampaignName}
                onChange={(e) => onChange({ existingCampaignName: e.target.value })}
                placeholder="Testing Campaign"
              />
            </div>
            <div>
              <label className="label">Campaign ID (optional)</label>
              <input
                className="input"
                value={campaign.existingCampaignId}
                onChange={(e) => onChange({ existingCampaignId: e.target.value })}
                placeholder="120255230704660110"
              />
              <p className="hint">An ID removes any guesswork about which campaign is meant.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">New campaign name</label>
                <input
                  className="input"
                  value={campaign.newCampaignName}
                  onChange={(e) => onChange({ newCampaignName: e.target.value })}
                  placeholder="Cozy Mystery - Oct Test"
                />
              </div>
              <div>
                <label className="label">Objective</label>
                <select className="select" value={campaign.objective} onChange={(e) => onChange({ objective: e.target.value })}>
                  {OBJECTIVES.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <p className="hint">{OBJECTIVES.find((o) => o.id === campaign.objective)?.hint}</p>
              </div>
            </div>

            <Toggle
              label="Catalog campaign"
              hint="Advantage+ catalog / dynamic product ads that pull products from your catalog feed."
              checked={campaign.catalogCampaign}
              onChange={(catalogCampaign) => onChange({ catalogCampaign })}
            />
            {campaign.catalogCampaign && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Catalog ID</label>
                  <input className="input" value={campaign.catalogId} onChange={(e) => onChange({ catalogId: e.target.value })} />
                </div>
                <div>
                  <label className="label">Product set ID</label>
                  <input className="input" value={campaign.productSetId} onChange={(e) => onChange({ productSetId: e.target.value })} />
                </div>
              </div>
            )}

            <Toggle
              label="Special ad category"
              hint="Only for housing, employment, credit or social/political ads - it restricts targeting. Leave off for retail."
              checked={campaign.specialAdCategory}
              onChange={(specialAdCategory) => onChange({ specialAdCategory })}
            />
            {campaign.specialAdCategory && (
              <div className="flex flex-wrap gap-2">
                {SPECIAL_AD_CATEGORIES.map((cat) => {
                  const on = campaign.specialAdCategoryTypes.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={"checkbox-chip " + (on ? "checkbox-chip-on" : "checkbox-chip-off")}
                      onClick={() =>
                        onChange({
                          specialAdCategoryTypes: on
                            ? campaign.specialAdCategoryTypes.filter((c) => c !== cat.id)
                            : [...campaign.specialAdCategoryTypes, cat.id]
                        })
                      }
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="border-t border-ink-100 pt-4">
          <label className="label">Who holds the budget</label>
          <Segmented<BudgetLevel>
            value={campaign.budgetLevel}
            onChange={(budgetLevel) => onChange({ budgetLevel })}
            options={[
              { id: "adset", label: "Ad set budget (ABO)" },
              { id: "campaign", label: "Campaign budget (CBO)" }
            ]}
          />
          <p className="hint">
            {isCbo
              ? "Meta splits one campaign budget across its ad sets automatically."
              : "Each ad set gets its own budget - more control when testing one thing at a time."}
          </p>
        </div>

        {isCbo && (
          <div className="space-y-4 rounded-xl border border-ink-100 bg-ink-50/50 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Budget type</label>
                <Segmented<BudgetType>
                  value={campaign.budgetType}
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
                  value={campaign.budgetAmount}
                  onChange={(e) => onChange({ budgetAmount: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="label">Bid strategy</label>
              <Segmented<BidStrategy>
                value={campaign.bidStrategy}
                onChange={(bidStrategy) => onChange({ bidStrategy })}
                options={BID_STRATEGIES.map((b) => ({ id: b.id, label: b.label }))}
              />
              <p className="hint">{bidMeta?.hint}</p>
            </div>

            {bidMeta?.needsAmount && (
              <div>
                <label className="label">{campaign.bidStrategy === "COST_CAP" ? "Target cost per result (USD)" : "Max bid (USD)"}</label>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  className="input"
                  value={campaign.bidAmount}
                  onChange={(e) => onChange({ bidAmount: Number(e.target.value) })}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
