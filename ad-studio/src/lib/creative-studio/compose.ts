import sharp from "sharp";
import { FORMAT_DIMENSIONS, TEMPLATES, escapeXml, wrapText, type FormatId, type TemplateId } from "./templates";

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

export type TextPosition = "top" | "center" | "bottom";

/**
 * Stamps the exact text supplied - nothing auto-added, nothing reworded -
 * onto an already-generated image. Used for the "generate with no text,
 * then decide whether to add exact text later" flow: unlike the templates
 * above, this never invents a headline/CTA/subheadline of its own.
 */
export async function addTextOverlay(inputBuffer: Buffer, text: string, position: TextPosition = "bottom"): Promise<Buffer> {
  if (!text.trim()) throw new Error("Text is required");

  const { width, height } = await readImageDimensions(inputBuffer);
  if (!width || !height) throw new Error("Could not read this image");

  const fontSize = Math.round(width * 0.058);
  const lines = wrapText(text, 24, 4);
  const lineHeight = fontSize * 1.15;
  const padding = Math.round(height * 0.05);
  const barHeight = Math.round(lines.length * lineHeight + padding * 2);

  const barY = position === "top" ? 0 : position === "bottom" ? height - barHeight : Math.round((height - barHeight) / 2);
  const firstLineY = barY + padding + fontSize * 0.85;
  const centerX = Math.round(width / 2);

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="${barY}" width="${width}" height="${barHeight}" fill="#000000" opacity="0.55"/>
    <text x="${centerX}" y="${firstLineY}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff" text-anchor="middle">${lines
      .map((line, i) => `<tspan x="${centerX}" y="${firstLineY + i * lineHeight}">${escapeXml(line)}</tspan>`)
      .join("")}</text>
  </svg>`;

  return sharp(inputBuffer)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toBuffer();
}
