import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getConnection, getCreatives, addCampaign } from "@/lib/store";
import { uploadAdImage, createAdCreative } from "@/lib/facebook/creatives";
import { createCampaign, createAdSet, createAd } from "@/lib/facebook/campaigns";
import type { PublishCampaignInput } from "@/lib/facebook/types";
import { handleApiError, jsonError } from "@/lib/api-utils";

export const runtime = "nodejs";

const GENERATED_DIR = path.join(process.cwd(), "public", "generated");

export async function POST(request: NextRequest) {
  try {
    const conn = await getConnection();
    if (!conn) return jsonError("Not connected to Facebook yet", 401);
    if (!conn.adAccountId || !conn.pageId) return jsonError("Pick an ad account and Facebook Page before publishing", 400);

    const input = (await request.json()) as PublishCampaignInput;
    if (!input.campaignName?.trim()) return jsonError("campaignName is required");
    if (!input.creativeIds?.length) return jsonError("Select at least one generated creative to publish");
    if (!input.destinationUrl?.trim()) return jsonError("destinationUrl is required");
    if (!input.countries?.length) return jsonError("Pick at least one target country");
    if (!input.dailyBudgetCents || input.dailyBudgetCents < 100) return jsonError("Daily budget must be at least $1.00");

    const creativeRecords = await getCreatives(input.creativeIds);
    if (creativeRecords.length !== input.creativeIds.length) {
      return jsonError("One or more selected creatives could not be found", 404);
    }

    const { accessToken, adAccountId, pageId } = conn;

    // 1. Upload every generated image to Facebook's image library to get a hash.
    const imageHashes: string[] = [];
    const fbCreativeIds: string[] = [];
    for (const creative of creativeRecords) {
      const buffer = await fs.readFile(path.join(GENERATED_DIR, path.basename(creative.url)));
      const hash = await uploadAdImage(adAccountId, accessToken, buffer, path.basename(creative.url));
      imageHashes.push(hash);

      const fbCreativeId = await createAdCreative({
        adAccountId,
        accessToken,
        pageId,
        imageHash: hash,
        primaryText: input.primaryText || creative.headline,
        headline: input.headline || creative.headline,
        destinationUrl: input.destinationUrl,
        callToAction: input.callToAction || "SHOP_NOW",
        name: `${input.campaignName} - ${creative.templateId} - ${creative.format}`
      });
      fbCreativeIds.push(fbCreativeId);
    }

    // 2. Campaign -> Ad Set -> one Ad per creative.
    const campaignId = await createCampaign({
      adAccountId,
      accessToken,
      name: input.campaignName,
      objective: input.objective,
      status: input.status
    });

    const adSetId = await createAdSet({
      adAccountId,
      accessToken,
      campaignId,
      name: `${input.campaignName} - Ad Set`,
      dailyBudgetCents: input.dailyBudgetCents,
      countries: input.countries,
      status: input.status
    });

    const adIds: string[] = [];
    for (let i = 0; i < fbCreativeIds.length; i++) {
      const adId = await createAd({
        adAccountId,
        accessToken,
        adSetId,
        creativeId: fbCreativeIds[i],
        name: `${input.campaignName} - Ad ${i + 1}`,
        status: input.status
      });
      adIds.push(adId);
    }

    const numericAccountId = adAccountId.replace(/^act_/, "");
    const manageUrl = `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${numericAccountId}&selected_campaign_ids=${campaignId}`;

    const record = await addCampaign({
      id: campaignId,
      name: input.campaignName,
      adSetId,
      adIds,
      creativeIds: fbCreativeIds,
      status: input.status,
      manageUrl,
      createdAt: Date.now()
    });

    return NextResponse.json({ result: { ...record, imageHashes } });
  } catch (error) {
    return handleApiError(error);
  }
}
