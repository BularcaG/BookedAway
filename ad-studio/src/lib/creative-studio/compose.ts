import sharp from "sharp";
import { FORMAT_DIMENSIONS, TEMPLATES, type FormatId, type TemplateId } from "./templates";

export interface GenerateOptions {
  headline: string;
  subheadline?: string;
  cta?: string;
  brandColor?: string;
  formats?: FormatId[];
  templateIds?: TemplateId[];
}

export interface GeneratedVariation {
  templateId: TemplateId;
  format: FormatId;
  width: number;
  height: number;
  buffer: Buffer;
}

const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Takes one raw product photo and produces ready-to-publish ad creatives:
 * for every requested Facebook placement size, and every requested template
 * style, crop the photo to that size and burn in a headline/CTA overlay.
 */
export async function generateVariations(inputBuffer: Buffer, opts: GenerateOptions): Promise<GeneratedVariation[]> {
  const formats = opts.formats?.length ? opts.formats : (Object.keys(FORMAT_DIMENSIONS) as FormatId[]);
  const templates = opts.templateIds?.length ? TEMPLATES.filter((t) => opts.templateIds!.includes(t.id)) : TEMPLATES;
  const brandColor = opts.brandColor && HEX_COLOR.test(opts.brandColor) ? opts.brandColor : "#2a55d8";

  // "passthrough" just crops/resizes - it has no text to burn in, so it's the
  // one template that doesn't need a headline. Only require one when at
  // least one overlay template was actually requested.
  const needsHeadline = templates.some((t) => t.id !== "passthrough");
  if (needsHeadline && !opts.headline?.trim()) throw new Error("A headline is required for the selected templates");
  if (!formats.length) throw new Error("At least one format must be selected");
  if (!templates.length) throw new Error("At least one template must be selected");

  const variations: GeneratedVariation[] = [];

  for (const format of formats) {
    const { width, height } = FORMAT_DIMENSIONS[format];
    // "attention"-based cropping keeps the busiest part of the product photo
    // (usually the product itself) in frame instead of a naive center-crop.
    const baseImage = await sharp(inputBuffer)
      .resize(width, height, { fit: "cover", position: sharp.strategy.attention })
      .toBuffer();

    for (const template of templates) {
      let composed: Buffer;

      if (template.id === "passthrough") {
        // No overlay to burn in - just re-encode the crop as-is.
        composed = await sharp(baseImage).jpeg({ quality: 92 }).toBuffer();
      } else {
        const svg = template.render({
          width,
          height,
          headline: opts.headline,
          subheadline: opts.subheadline ?? "",
          cta: opts.cta?.trim() || "Shop Now",
          brandColor
        });

        composed = await sharp(baseImage)
          .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
          .jpeg({ quality: 92 })
          .toBuffer();
      }

      variations.push({ templateId: template.id, format, width, height, buffer: composed });
    }
  }

  return variations;
}

export async function readImageDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
  const meta = await sharp(buffer).metadata();
  return { width: meta.width ?? 0, height: meta.height ?? 0 };
}
