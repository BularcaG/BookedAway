export type BudgetLevel = "campaign" | "adset";
export type BudgetType = "daily" | "lifetime";
export type BidStrategy = "LOWEST_COST_WITHOUT_CAP" | "COST_CAP" | "LOWEST_COST_WITH_BID_CAP";
export type AdFormat = "single" | "carousel" | "collection";
export type LaunchStatus = "PAUSED" | "ACTIVE";
export type SpecStatus = "draft" | "submitted";

export interface CreativeAsset {
  id: string;
  fileName: string;
  url: string;
  width: number;
  height: number;
  sizeBytes: number;
  createdAt: number;
}

export interface CampaignConfig {
  /** Reuse a campaign that already exists in Ads Manager, or stand up a new one. */
  mode: "existing" | "new";
  existingCampaignName: string;
  existingCampaignId: string;

  newCampaignName: string;
  objective: string;
  buyingType: string;

  /** Off unless the ads fall under housing / employment / credit / social issues. */
  specialAdCategory: boolean;
  specialAdCategoryTypes: string[];

  /** CBO (budget on the campaign) vs ABO (budget on each ad set). */
  budgetLevel: BudgetLevel;
  budgetType: BudgetType;
  /** Whole currency units as typed by the operator - converted to minor units in the brief. */
  budgetAmount: number;
  bidStrategy: BidStrategy;
  /** Cost target for COST_CAP, or max bid for LOWEST_COST_WITH_BID_CAP. */
  bidAmount: number;

  /** Advantage+ catalog / dynamic product ads. */
  catalogCampaign: boolean;
  catalogId: string;
  productSetId: string;
}

export interface AdSetConfig {
  name: string;

  /** Only used when the campaign is ABO - otherwise the campaign carries the budget. */
  budgetType: BudgetType;
  budgetAmount: number;
  bidStrategy: BidStrategy;
  bidAmount: number;

  optimizationGoal: string;
  billingEvent: string;

  /** Conversion tracking - the pixel/dataset and the event optimized for. */
  pixelId: string;
  conversionEvent: string;

  countries: string[];
  ageMin: number;
  ageMax: number;

  /** On by default - Meta broadens beyond the stated targeting. */
  advantageAudience: boolean;
  /** Off by default: off means automatic (Advantage+) placements. */
  manualPlacements: boolean;
  publisherPlatforms: string[];

  startTime: string;
  endTime: string;
}

export interface CreativeConfig {
  format: AdFormat;
  /** Off by default - adds a shop/collection surface under the main creative. */
  shopEnabled: boolean;

  primaryText: string;
  headline: string;
  description: string;
  callToAction: string;
  destinationUrl: string;
  displayLink: string;

  pageId: string;
  instagramAccountId: string;

  assetIds: string[];

  /** Off by default - Meta's automatic per-impression creative tweaks. */
  advantagePlusCreative: boolean;
  /** Declared AI-content disclosure; left unset unless the operator chooses. */
  aiDisclosure: "" | "OPT_IN" | "OPT_OUT";
}

export interface AdSpec {
  id: string;
  /** Internal label for this spec, not sent to Facebook. */
  name: string;
  adName: string;
  status: SpecStatus;
  launchStatus: LaunchStatus;
  duplicatedFromId: string | null;
  notes: string;
  createdAt: number;
  updatedAt: number;
  submittedAt: number | null;

  adAccountId: string;
  campaign: CampaignConfig;
  adSet: AdSetConfig;
  creative: CreativeConfig;
}
