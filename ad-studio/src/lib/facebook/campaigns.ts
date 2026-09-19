import { graphRequest } from "./graph";
import type { CampaignObjective } from "./types";

export interface CreateCampaignInput {
  adAccountId: string;
  accessToken: string;
  name: string;
  objective: CampaignObjective;
  status: "PAUSED" | "ACTIVE";
}

export async function createCampaign(input: CreateCampaignInput): Promise<string> {
  const result = await graphRequest<{ id: string }>(`${input.adAccountId}/campaigns`, {
    method: "POST",
    accessToken: input.accessToken,
    form: {
      name: input.name,
      objective: input.objective,
      status: input.status,
      special_ad_categories: JSON.stringify([])
    }
  });
  return result.id;
}

export interface CreateAdSetInput {
  adAccountId: string;
  accessToken: string;
  campaignId: string;
  name: string;
  dailyBudgetCents: number;
  countries: string[];
  status: "PAUSED" | "ACTIVE";
  optimizationGoal?: string;
  billingEvent?: string;
}

export async function createAdSet(input: CreateAdSetInput): Promise<string> {
  const targeting = {
    geo_locations: { countries: input.countries },
    age_min: 18,
    age_max: 65
  };

  const result = await graphRequest<{ id: string }>(`${input.adAccountId}/adsets`, {
    method: "POST",
    accessToken: input.accessToken,
    form: {
      name: input.name,
      campaign_id: input.campaignId,
      daily_budget: input.dailyBudgetCents,
      billing_event: input.billingEvent ?? "IMPRESSIONS",
      optimization_goal: input.optimizationGoal ?? "LINK_CLICKS",
      bid_strategy: "LOWEST_COST_WITHOUT_CAP",
      targeting: JSON.stringify(targeting),
      status: input.status
    }
  });
  return result.id;
}

export interface CreateAdInput {
  adAccountId: string;
  accessToken: string;
  adSetId: string;
  creativeId: string;
  name: string;
  status: "PAUSED" | "ACTIVE";
}

export async function createAd(input: CreateAdInput): Promise<string> {
  const result = await graphRequest<{ id: string }>(`${input.adAccountId}/ads`, {
    method: "POST",
    accessToken: input.accessToken,
    form: {
      name: input.name,
      adset_id: input.adSetId,
      creative: JSON.stringify({ creative_id: input.creativeId }),
      status: input.status
    }
  });
  return result.id;
}
