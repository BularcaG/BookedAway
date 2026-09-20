import type { AdSpec, BidStrategy } from "./types";

/**
 * Known-good values for this store, pulled from the account's existing
 * live ad sets so a new spec starts from what already works instead of
 * from empty fields.
 */
export const ACCOUNT_DEFAULTS = {
  adAccountId: "1149260060062188",
  pageId: "518476831357470",
  pixelId: "506614892042719",
  conversionEvent: "PURCHASE"
};

export const OBJECTIVES = [
  { id: "OUTCOME_SALES", label: "Sales", hint: "Purchases / conversions on your site" },
  { id: "OUTCOME_TRAFFIC", label: "Traffic", hint: "Clicks through to a page" },
  { id: "OUTCOME_ENGAGEMENT", label: "Engagement", hint: "Post engagement, messages, video views" },
  { id: "OUTCOME_AWARENESS", label: "Awareness", hint: "Reach and impressions" },
  { id: "OUTCOME_LEADS", label: "Leads", hint: "Lead forms / sign-ups" },
  { id: "OUTCOME_APP_PROMOTION", label: "App Promotion", hint: "App installs" }
];

/**
 * Meta rejects an optimization goal that doesn't match the campaign
 * objective, so the builder only offers the compatible ones. First entry
 * for each objective is Meta's recommended default.
 */
export const OPTIMIZATION_GOALS: Record<string, { id: string; label: string }[]> = {
  OUTCOME_SALES: [
    { id: "OFFSITE_CONVERSIONS", label: "Conversions (purchases)" },
    { id: "VALUE", label: "Conversion value / ROAS" },
    { id: "LANDING_PAGE_VIEWS", label: "Landing page views" },
    { id: "LINK_CLICKS", label: "Link clicks" },
    { id: "IMPRESSIONS", label: "Impressions" },
    { id: "REACH", label: "Reach" }
  ],
  OUTCOME_TRAFFIC: [
    { id: "LINK_CLICKS", label: "Link clicks" },
    { id: "LANDING_PAGE_VIEWS", label: "Landing page views" },
    { id: "OFFSITE_CONVERSIONS", label: "Conversions" },
    { id: "IMPRESSIONS", label: "Impressions" },
    { id: "REACH", label: "Reach" }
  ],
  OUTCOME_ENGAGEMENT: [
    { id: "THRUPLAY", label: "ThruPlay (video)" },
    { id: "POST_ENGAGEMENT", label: "Post engagement" },
    { id: "LINK_CLICKS", label: "Link clicks" },
    { id: "REACH", label: "Reach" }
  ],
  OUTCOME_AWARENESS: [
    { id: "REACH", label: "Reach" },
    { id: "IMPRESSIONS", label: "Impressions" },
    { id: "AD_RECALL_LIFT", label: "Ad recall lift" }
  ],
  OUTCOME_LEADS: [
    { id: "OFFSITE_CONVERSIONS", label: "Conversions" },
    { id: "LEAD_GENERATION", label: "Lead forms" },
    { id: "LINK_CLICKS", label: "Link clicks" }
  ],
  OUTCOME_APP_PROMOTION: [
    { id: "APP_INSTALLS", label: "App installs" },
    { id: "OFFSITE_CONVERSIONS", label: "App events" }
  ]
};

export const BILLING_EVENTS = [
  { id: "IMPRESSIONS", label: "Impressions" },
  { id: "LINK_CLICKS", label: "Link clicks" },
  { id: "POST_ENGAGEMENT", label: "Post engagement" },
  { id: "VIDEO_VIEWS", label: "Video views" }
];

export const BID_STRATEGIES: { id: BidStrategy; label: string; hint: string; needsAmount: boolean }[] = [
  {
    id: "LOWEST_COST_WITHOUT_CAP",
    label: "Highest volume",
    hint: "Autobid - Meta spends the budget for the most results. No cap to set.",
    needsAmount: false
  },
  {
    id: "COST_CAP",
    label: "Cost cap",
    hint: "Meta aims for an average cost per result at or below your target.",
    needsAmount: true
  },
  {
    id: "LOWEST_COST_WITH_BID_CAP",
    label: "Bid cap",
    hint: "Hard ceiling on each individual bid in the auction.",
    needsAmount: true
  }
];

export const CALL_TO_ACTIONS = [
  "SHOP_NOW",
  "LEARN_MORE",
  "BUY_NOW",
  "ORDER_NOW",
  "GET_OFFER",
  "SIGN_UP",
  "SUBSCRIBE",
  "SEE_MORE",
  "GET_STARTED"
];

export const COUNTRY_OPTIONS = [
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
  { code: "AU", label: "Australia" },
  { code: "NZ", label: "New Zealand" },
  { code: "IE", label: "Ireland" }
];

export const PUBLISHER_PLATFORMS = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "audience_network", label: "Audience Network" },
  { id: "messenger", label: "Messenger" },
  { id: "threads", label: "Threads" }
];

export const SPECIAL_AD_CATEGORIES = [
  { id: "HOUSING", label: "Housing" },
  { id: "EMPLOYMENT", label: "Employment" },
  { id: "CREDIT", label: "Credit" },
  { id: "ISSUES_ELECTIONS_POLITICS", label: "Social issues, elections or politics" }
];

export function blankSpec(id: string, now: number): AdSpec {
  return {
    id,
    name: "",
    adName: "",
    status: "draft",
    launchStatus: "PAUSED",
    duplicatedFromId: null,
    notes: "",
    createdAt: now,
    updatedAt: now,
    submittedAt: null,
    adAccountId: ACCOUNT_DEFAULTS.adAccountId,
    campaign: {
      mode: "existing",
      existingCampaignName: "",
      existingCampaignId: "",
      newCampaignName: "",
      objective: "OUTCOME_SALES",
      buyingType: "AUCTION",
      specialAdCategory: false,
      specialAdCategoryTypes: [],
      budgetLevel: "adset",
      budgetType: "daily",
      budgetAmount: 20,
      bidStrategy: "LOWEST_COST_WITHOUT_CAP",
      bidAmount: 0,
      catalogCampaign: false,
      catalogId: "",
      productSetId: ""
    },
    adSet: {
      name: "",
      budgetType: "daily",
      budgetAmount: 20,
      bidStrategy: "LOWEST_COST_WITHOUT_CAP",
      bidAmount: 0,
      optimizationGoal: "OFFSITE_CONVERSIONS",
      billingEvent: "IMPRESSIONS",
      pixelId: ACCOUNT_DEFAULTS.pixelId,
      conversionEvent: ACCOUNT_DEFAULTS.conversionEvent,
      countries: ["US"],
      ageMin: 18,
      ageMax: 65,
      advantageAudience: true,
      manualPlacements: false,
      publisherPlatforms: ["facebook", "instagram"],
      startTime: "",
      endTime: ""
    },
    creative: {
      format: "single",
      shopEnabled: false,
      primaryText: "",
      headline: "",
      description: "",
      callToAction: "SHOP_NOW",
      destinationUrl: "",
      displayLink: "",
      pageId: ACCOUNT_DEFAULTS.pageId,
      instagramAccountId: "",
      assetIds: [],
      advantagePlusCreative: false,
      aiDisclosure: ""
    }
  };
}
