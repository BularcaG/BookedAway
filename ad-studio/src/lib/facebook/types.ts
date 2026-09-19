export interface FacebookConnection {
  accessToken: string;
  tokenExpiresAt: number | null; // epoch ms, null = system user token (no expiry)
  userId?: string;
  userName?: string;
  adAccountId?: string; // format: act_123456789
  adAccountName?: string;
  pageId?: string;
  pageName?: string;
  connectedAt: number;
}

export interface AdAccountOption {
  id: string; // act_123
  name: string;
  currency: string;
  accountStatus: number;
}

export interface PageOption {
  id: string;
  name: string;
}

export type CampaignObjective =
  | "OUTCOME_TRAFFIC"
  | "OUTCOME_ENGAGEMENT"
  | "OUTCOME_SALES"
  | "OUTCOME_LEADS"
  | "OUTCOME_AWARENESS";

export interface PublishCampaignInput {
  campaignName: string;
  objective: CampaignObjective;
  dailyBudgetCents: number;
  destinationUrl: string;
  primaryText: string;
  headline: string;
  callToAction: string;
  countries: string[];
  creativeIds: string[]; // generated creative ids from our own store to turn into Facebook ads
  status: "PAUSED" | "ACTIVE";
}

export interface PublishedCampaignResult {
  campaignId: string;
  adSetId: string;
  adIds: string[];
  creativeIds: string[];
  imageHashes: string[];
  manageUrl: string;
}
