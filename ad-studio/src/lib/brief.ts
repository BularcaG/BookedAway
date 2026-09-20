import type { AdSpec, CreativeAsset } from "./types";
import { BID_STRATEGIES, OBJECTIVES } from "./defaults";

function money(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/** Facebook budgets/bids are in minor units (cents for USD). */
function toMinorUnits(amount: number): number {
  return Math.round(amount * 100);
}

function labelFor(list: { id: string; label: string }[], id: string): string {
  return list.find((x) => x.id === id)?.label ?? id;
}

/**
 * The machine-readable half of the brief: field names here match the Meta
 * Ads MCP tool parameters exactly, so submitting is a transcription job
 * rather than a re-interpretation of what the operator meant.
 */
export function buildSpecPayload(spec: AdSpec, assets: CreativeAsset[]) {
  const { campaign, adSet, creative } = spec;
  const isCbo = campaign.budgetLevel === "campaign";

  const targeting: Record<string, unknown> = {
    geo_locations: { countries: adSet.countries, location_types: ["home", "recent", "frequently_in"] },
    age_min: adSet.ageMin,
    age_max: adSet.ageMax
  };
  if (adSet.manualPlacements) {
    targeting.publisher_platforms = adSet.publisherPlatforms;
  }

  const campaignPayload: Record<string, unknown> =
    campaign.mode === "existing"
      ? { use_existing_campaign_id: campaign.existingCampaignId, use_existing_campaign_name: campaign.existingCampaignName }
      : {
          ad_account_id: spec.adAccountId,
          campaign_name: campaign.newCampaignName,
          objective: campaign.objective,
          buying_type: campaign.buyingType,
          special_ad_categories: campaign.specialAdCategory ? campaign.specialAdCategoryTypes : [],
          ...(isCbo
            ? {
                [campaign.budgetType === "daily" ? "campaign_daily_budget" : "campaign_lifetime_budget"]: toMinorUnits(campaign.budgetAmount),
                campaign_bid_strategy: campaign.bidStrategy
              }
            : {})
        };

  const adSetPayload: Record<string, unknown> = {
    ad_account_id: spec.adAccountId,
    ad_set_name: adSet.name,
    billing_event: adSet.billingEvent,
    optimization_goal: adSet.optimizationGoal,
    targeting,
    ...(isCbo
      ? {}
      : {
          [adSet.budgetType === "daily" ? "daily_budget" : "lifetime_budget"]: toMinorUnits(adSet.budgetAmount),
          bid_strategy: adSet.bidStrategy,
          ...(adSet.bidStrategy !== "LOWEST_COST_WITHOUT_CAP" ? { bid_amount: toMinorUnits(adSet.bidAmount) } : {})
        }),
    ...(adSet.pixelId
      ? { promoted_object: { pixel_id: adSet.pixelId, custom_event_type: adSet.conversionEvent } }
      : {}),
    ...(adSet.startTime ? { start_time: adSet.startTime } : {}),
    ...(adSet.endTime ? { end_time: adSet.endTime } : {})
  };

  const creativePayload: Record<string, unknown> = {
    ad_account_id: spec.adAccountId,
    page_id: creative.pageId,
    link_url: creative.destinationUrl,
    message: creative.primaryText,
    headline: creative.headline,
    description: creative.description,
    call_to_action_type: creative.callToAction,
    ...(creative.displayLink ? { display_link: creative.displayLink } : {}),
    ...(creative.instagramAccountId ? { instagram_user_id: creative.instagramAccountId } : {}),
    ...(creative.advantagePlusCreative ? { advantage_plus_creative: true } : {}),
    ...(creative.aiDisclosure ? { self_ai_disclosure: creative.aiDisclosure } : {}),
    ...(campaign.catalogCampaign && campaign.productSetId ? { product_set_id: campaign.productSetId } : {})
  };

  return {
    format: creative.format,
    shop_surface_requested: creative.shopEnabled,
    launch_status: spec.launchStatus,
    ad_name: spec.adName,
    campaign: campaignPayload,
    ad_set: adSetPayload,
    creative: creativePayload,
    creative_assets: assets.map((a) => ({ file: a.fileName, local_url: a.url, width: a.width, height: a.height }))
  };
}

/**
 * The human-readable half: what the operator reads back before handing it
 * over, written so anything ambiguous is visible rather than buried.
 */
export function buildBriefText(spec: AdSpec, assets: CreativeAsset[]): string {
  const { campaign, adSet, creative } = spec;
  const isCbo = campaign.budgetLevel === "campaign";
  const bidLabel = (id: string) => BID_STRATEGIES.find((b) => b.id === id)?.label ?? id;

  const lines: string[] = [];

  lines.push(`Please create this ad in Facebook via the Meta Ads MCP.`);
  lines.push(``);
  lines.push(`Ad account: ${spec.adAccountId}`);
  lines.push(`Launch status: ${spec.launchStatus}${spec.launchStatus === "PAUSED" ? " (do not activate)" : " (start spending immediately)"}`);
  lines.push(``);

  lines.push(`--- CAMPAIGN ---`);
  if (campaign.mode === "existing") {
    lines.push(`Use the EXISTING campaign: ${campaign.existingCampaignName || "(name not given)"}${campaign.existingCampaignId ? ` (id ${campaign.existingCampaignId})` : ""}`);
  } else {
    lines.push(`Create a NEW campaign: ${campaign.newCampaignName}`);
    lines.push(`Objective: ${labelFor(OBJECTIVES, campaign.objective)} (${campaign.objective})`);
    lines.push(`Buying type: ${campaign.buyingType}`);
    lines.push(`Special ad category: ${campaign.specialAdCategory ? campaign.specialAdCategoryTypes.join(", ") || "yes (type not set)" : "none"}`);
    lines.push(`Catalog campaign: ${campaign.catalogCampaign ? `yes - catalog ${campaign.catalogId || "(not set)"}, product set ${campaign.productSetId || "(not set)"}` : "no"}`);
  }
  lines.push(`Budget level: ${isCbo ? "CAMPAIGN budget (CBO)" : "AD SET budget (ABO)"}`);
  if (isCbo) {
    lines.push(`Campaign budget: ${money(campaign.budgetAmount)} ${campaign.budgetType}`);
    lines.push(`Bid strategy: ${bidLabel(campaign.bidStrategy)}${campaign.bidStrategy !== "LOWEST_COST_WITHOUT_CAP" ? ` at ${money(campaign.bidAmount)}` : ""}`);
  }
  lines.push(``);

  lines.push(`--- AD SET ---`);
  lines.push(`Name: ${adSet.name}`);
  if (!isCbo) {
    lines.push(`Budget: ${money(adSet.budgetAmount)} ${adSet.budgetType}`);
    lines.push(`Bid strategy: ${bidLabel(adSet.bidStrategy)}${adSet.bidStrategy !== "LOWEST_COST_WITHOUT_CAP" ? ` at ${money(adSet.bidAmount)}` : ""}`);
  }
  lines.push(`Optimization goal: ${adSet.optimizationGoal}`);
  lines.push(`Billing event: ${adSet.billingEvent}`);
  lines.push(`Conversion tracking: ${adSet.pixelId ? `pixel ${adSet.pixelId}, event ${adSet.conversionEvent}` : "none"}`);
  lines.push(`Countries: ${adSet.countries.join(", ")}`);
  lines.push(`Age: ${adSet.ageMin}-${adSet.ageMax}`);
  lines.push(`Advantage+ Audience: ${adSet.advantageAudience ? "ON" : "OFF"}`);
  lines.push(`Placements: ${adSet.manualPlacements ? `MANUAL - ${adSet.publisherPlatforms.join(", ")}` : "Automatic (Advantage+)"}`);
  if (adSet.startTime) lines.push(`Start: ${adSet.startTime}`);
  if (adSet.endTime) lines.push(`End: ${adSet.endTime}`);
  lines.push(``);

  lines.push(`--- AD / CREATIVE ---`);
  lines.push(`Ad name: ${spec.adName}`);
  lines.push(`Format: ${creative.format}${creative.shopEnabled ? " + shop/collection surface ON" : ""}`);
  lines.push(`Page: ${creative.pageId}${creative.instagramAccountId ? ` / IG ${creative.instagramAccountId}` : ""}`);
  lines.push(`Primary text:`);
  lines.push(creative.primaryText || "(empty)");
  lines.push(`Headline: ${creative.headline || "(empty)"}`);
  lines.push(`Description: ${creative.description || "(empty)"}`);
  lines.push(`Call to action: ${creative.callToAction}`);
  lines.push(`Destination URL: ${creative.destinationUrl || "(empty)"}`);
  if (creative.displayLink) lines.push(`Display link: ${creative.displayLink}`);
  lines.push(`Advantage+ creative enhancements: ${creative.advantagePlusCreative ? "ON" : "OFF"}`);
  lines.push(`AI content disclosure: ${creative.aiDisclosure || "not declared"}`);
  lines.push(``);

  lines.push(`--- CREATIVE FILES ---`);
  if (assets.length) {
    assets.forEach((a, i) => lines.push(`${i + 1}. ${a.fileName} (${a.width}x${a.height})`));
    lines.push(`(Attach these image files to the chat - a localhost URL isn't reachable from outside this machine.)`);
  } else {
    lines.push(`No creative file attached yet.`);
  }

  if (spec.notes.trim()) {
    lines.push(``);
    lines.push(`--- NOTES ---`);
    lines.push(spec.notes.trim());
  }

  return lines.join("\n");
}

/** Blocking problems worth catching before anything reaches Facebook. */
export function validateSpec(spec: AdSpec): string[] {
  const issues: string[] = [];
  const { campaign, adSet, creative } = spec;

  if (!spec.adName.trim()) issues.push("Ad name is empty");
  if (campaign.mode === "existing" && !campaign.existingCampaignId.trim() && !campaign.existingCampaignName.trim()) {
    issues.push("Pick which existing campaign to use (name or ID)");
  }
  if (campaign.mode === "new" && !campaign.newCampaignName.trim()) issues.push("New campaign needs a name");
  if (campaign.specialAdCategory && campaign.specialAdCategoryTypes.length === 0) {
    issues.push("Special ad category is on but no category is selected");
  }
  if (campaign.catalogCampaign && !campaign.productSetId.trim()) {
    issues.push("Catalog campaign is on but no product set ID is set");
  }
  if (!adSet.name.trim()) issues.push("Ad set name is empty");
  if (!adSet.countries.length) issues.push("No target country selected");

  const budgetAmount = campaign.budgetLevel === "campaign" ? campaign.budgetAmount : adSet.budgetAmount;
  if (!budgetAmount || budgetAmount < 1) issues.push("Budget must be at least $1.00");

  const bidStrategy = campaign.budgetLevel === "campaign" ? campaign.bidStrategy : adSet.bidStrategy;
  const bidAmount = campaign.budgetLevel === "campaign" ? campaign.bidAmount : adSet.bidAmount;
  if (bidStrategy !== "LOWEST_COST_WITHOUT_CAP" && (!bidAmount || bidAmount <= 0)) {
    issues.push(`${bidStrategy === "COST_CAP" ? "Cost cap" : "Bid cap"} is selected but no amount is set`);
  }

  if (adSet.optimizationGoal === "OFFSITE_CONVERSIONS" && !adSet.pixelId.trim()) {
    issues.push("Optimizing for conversions requires a pixel ID");
  }
  if (!creative.destinationUrl.trim()) issues.push("Destination URL is empty");
  if (!creative.headline.trim()) issues.push("Headline is empty");
  if (!creative.assetIds.length) issues.push("No creative image attached");
  if (creative.format === "carousel" && creative.assetIds.length < 2) {
    issues.push("Carousel needs at least 2 images");
  }

  return issues;
}
