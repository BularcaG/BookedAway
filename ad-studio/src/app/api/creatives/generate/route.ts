import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getAsset, addCreatives, newId } from "@/lib/store";
import { generateVariations } from "@/lib/creative-studio/compose";
import type { FormatId, TemplateId } from "@/lib/creative-studio/templates";
import { handleApiError, jsonError } from "@/lib/api-utils";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const GENERATED_DIR = path.join(process.cwd(), "public", "generated");

interface GenerateBody {
  assetId: string;
  headline: string;
  subheadline?: string;
  cta?: string;
  brandColor?: string;
  formats?: FormatId[];
  templateIds?: TemplateId[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateBody;
    if (!body.assetId) return jsonError("assetId is required");
    if (!body.headline?.trim()) return jsonError("headline is required");

    const asset = await getAsset(body.assetId);
    if (!asset) return jsonError("Unknown asset - upload a product photo first", 404);

    const inputBuffer = await fs.readFile(path.join(UPLOAD_DIR, asset.fileName));

    const variations = await generateVariations(inputBuffer, {
      headline: body.headline,
      subheadline: body.subheadline,
      cta: body.cta,
      brandColor: body.brandColor,
      formats: body.formats,
      templateIds: body.templateIds
    });

    await fs.mkdir(GENERATED_DIR, { recursive: true });

    const records = await Promise.all(
      variations.map(async (variation) => {
        const id = newId("cre");
        const fileName = `${id}.jpg`;
        await fs.writeFile(path.join(GENERATED_DIR, fileName), variation.buffer);
        return {
          id,
          assetId: asset.id,
          templateId: variation.templateId,
          format: variation.format,
          url: `/generated/${fileName}`,
          headline: body.headline,
          subheadline: body.subheadline ?? "",
          cta: body.cta?.trim() || "Shop Now",
          createdAt: Date.now()
        };
      })
    );

    await addCreatives(records);

    return NextResponse.json({ creatives: records });
  } catch (error) {
    return handleApiError(error);
  }
}
