export type FormatId = "square" | "portrait" | "story";
export type TemplateId = "bold-bottom-bar" | "top-banner-clean" | "framed-badge" | "deal-card" | "passthrough";

export const FORMAT_DIMENSIONS: Record<FormatId, { width: number; height: number; label: string; fbPlacement: string }> = {
  square: { width: 1080, height: 1080, label: "1:1 Feed", fbPlacement: "Facebook & Instagram Feed" },
  portrait: { width: 1080, height: 1350, label: "4:5 Feed", fbPlacement: "Facebook & Instagram Feed (tall)" },
  story: { width: 1080, height: 1920, label: "9:16 Story/Reel", fbPlacement: "Stories & Reels" }
};

interface RenderInput {
  width: number;
  height: number;
  headline: string;
  subheadline: string;
  cta: string;
  brandColor: string;
}

export function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Very small greedy word-wrapper - good enough for short ad headlines/CTAs. */
export function wrapText(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) lines.length = maxLines;
  const consumedWords = lines.join(" ").split(/\s+/).length;
  if (consumedWords < words.length && lines.length) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/\.*$/, "") + "…";
  }
  return lines;
}

function tspans(lines: string[], x: number, startY: number, lineHeight: number): string {
  return lines.map((line, i) => `<tspan x="${x}" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`).join("");
}

/** Same as tspans() but for a <text> that already has text-anchor="middle". */
function centeredTspans(lines: string[], centerX: number, startY: number, lineHeight: number): string {
  return lines.map((line, i) => `<tspan x="${centerX}" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`).join("");
}

interface Template {
  id: TemplateId;
  label: string;
  description: string;
  render(input: RenderInput): string;
}

const boldBottomBar: Template = {
  id: "bold-bottom-bar",
  label: "Bold Bottom Bar",
  description: "Dark gradient scrim at the bottom, big white headline, colored CTA pill.",
  render({ width, height, headline, subheadline, cta, brandColor }) {
    const barHeight = Math.round(height * 0.32);
    const barY = height - barHeight;
    const headlineLines = wrapText(headline, 22, 2);
    const fontSize = Math.round(width * 0.062);
    const subFontSize = Math.round(width * 0.03);
    const ctaWidth = Math.round(width * 0.34);
    const ctaHeight = Math.round(height * 0.055);
    const ctaX = Math.round(width * 0.06);
    const ctaY = height - Math.round(height * 0.09);

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.78"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${barY - 120}" width="${width}" height="${height - barY + 120}" fill="url(#scrim)"/>
      <text x="${Math.round(width * 0.06)}" y="${barY + fontSize + 8}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff">${tspans(headlineLines, Math.round(width * 0.06), barY + fontSize + 8, fontSize * 1.08)}</text>
      <text x="${Math.round(width * 0.06)}" y="${barY + fontSize * headlineLines.length + subFontSize + 26}" font-family="Arial, Helvetica, sans-serif" font-size="${subFontSize}" fill="#e5e7eb">${escapeXml(wrapText(subheadline, 34, 1)[0] || "")}</text>
      <rect x="${ctaX}" y="${ctaY}" width="${ctaWidth}" height="${ctaHeight}" rx="${ctaHeight / 2}" fill="${brandColor}"/>
      <text x="${ctaX + ctaWidth / 2}" y="${ctaY + ctaHeight / 2 + subFontSize * 0.36}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(subFontSize * 0.95)}" font-weight="700" fill="#ffffff" text-anchor="middle">${escapeXml(cta.toUpperCase())}</text>
    </svg>`;
  }
};

const topBannerClean: Template = {
  id: "top-banner-clean",
  label: "Top Banner Clean",
  description: "Solid brand-color banner across the top with the headline, small CTA badge bottom-center.",
  render({ width, height, headline, subheadline, cta, brandColor }) {
    const bannerHeight = Math.round(height * 0.16);
    const fontSize = Math.round(width * 0.05);
    const subFontSize = Math.round(width * 0.026);
    const headlineLines = wrapText(headline, 26, 2);
    const ctaWidth = Math.round(width * 0.4);
    const ctaHeight = Math.round(height * 0.05);
    const ctaX = Math.round((width - ctaWidth) / 2);
    const ctaY = height - Math.round(height * 0.08);

    const headlineCenterY = Math.round(bannerHeight / 2 - (headlineLines.length - 1) * fontSize * 0.5) + fontSize * 0.35;

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="${bannerHeight}" fill="${brandColor}"/>
      <text x="${Math.round(width / 2)}" y="${headlineCenterY}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff" text-anchor="middle">${centeredTspans(headlineLines, Math.round(width / 2), headlineCenterY, fontSize * 1.05)}</text>
      <rect x="0" y="${height - Math.round(height * 0.13)}" width="${width}" height="${Math.round(height * 0.13)}" fill="#000000" opacity="0.55"/>
      <text x="${Math.round(width / 2)}" y="${height - Math.round(height * 0.13) + subFontSize + 14}" font-family="Arial, Helvetica, sans-serif" font-size="${subFontSize}" fill="#ffffff" text-anchor="middle">${escapeXml(wrapText(subheadline, 40, 1)[0] || "")}</text>
      <rect x="${ctaX}" y="${ctaY}" width="${ctaWidth}" height="${ctaHeight}" rx="${ctaHeight / 2}" fill="#ffffff"/>
      <text x="${Math.round(width / 2)}" y="${ctaY + ctaHeight / 2 + subFontSize * 0.36}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(subFontSize)}" font-weight="700" fill="${brandColor}" text-anchor="middle">${escapeXml(cta.toUpperCase())}</text>
    </svg>`;
  }
};

const framedBadge: Template = {
  id: "framed-badge",
  label: "Framed Badge",
  description: "Thin brand-color frame around the whole image with a corner ribbon headline and centered CTA pill near the bottom.",
  render({ width, height, headline, subheadline, cta, brandColor }) {
    const frameWidth = Math.max(10, Math.round(width * 0.018));
    const fontSize = Math.round(width * 0.045);
    const subFontSize = Math.round(width * 0.026);
    const headlineLines = wrapText(headline, 20, 2);
    const ribbonWidth = Math.round(width * 0.62);
    const ribbonHeight = Math.round(fontSize * headlineLines.length * 1.25 + 34);
    const ctaWidth = Math.round(width * 0.4);
    const ctaHeight = Math.round(height * 0.052);
    const ctaX = Math.round((width - ctaWidth) / 2);
    const ctaY = height - Math.round(height * 0.1);

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="${brandColor}" stroke-width="${frameWidth}"/>
      <rect x="0" y="${Math.round(height * 0.05)}" width="${ribbonWidth}" height="${ribbonHeight}" fill="${brandColor}"/>
      <text x="24" y="${Math.round(height * 0.05) + fontSize + 6}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff">${tspans(headlineLines, 24, Math.round(height * 0.05) + fontSize + 6, fontSize * 1.1)}</text>
      <rect x="${ctaX}" y="${ctaY}" width="${ctaWidth}" height="${ctaHeight}" rx="${ctaHeight / 2}" fill="#ffffff" stroke="${brandColor}" stroke-width="3"/>
      <text x="${Math.round(width / 2)}" y="${ctaY + ctaHeight / 2 + subFontSize * 0.36}" font-family="Arial, Helvetica, sans-serif" font-size="${subFontSize}" font-weight="700" fill="${brandColor}" text-anchor="middle">${escapeXml(cta.toUpperCase())}</text>
      <text x="${Math.round(width / 2)}" y="${ctaY - 16}" font-family="Arial, Helvetica, sans-serif" font-size="${subFontSize}" fill="#ffffff" text-anchor="middle" style="paint-order: stroke; stroke: #00000099; stroke-width: 6px;">${escapeXml(wrapText(subheadline, 40, 1)[0] || "")}</text>
    </svg>`;
  }
};

const dealCard: Template = {
  id: "deal-card",
  label: "Deal Card (stars + CTA)",
  description:
    "Image on top, a bottom card with a bold headline and a star-rating social-proof line, then a Shop Now pill - modeled on the long-running ad structure used by durable, repeatedly-relaunched DTC apparel ads (image → headline → star rating + social proof → CTA).",
  render({ width, height, headline, subheadline, cta, brandColor }) {
    const cardHeight = Math.round(height * 0.24);
    const cardY = height - cardHeight;
    const headlineFontSize = Math.round(width * 0.05);
    const proofFontSize = Math.round(width * 0.032);
    const headlineLines = wrapText(headline, 28, 2);
    const ctaWidth = Math.round(width * 0.46);
    const ctaHeight = Math.round(height * 0.05);
    const ctaX = Math.round((width - ctaWidth) / 2);
    const ctaY = height - Math.round(height * 0.055);

    const headlineStartY = cardY + Math.round(cardHeight * 0.34);
    const proofY = headlineStartY + headlineFontSize * (headlineLines.length - 1) * 1.08 + proofFontSize * 1.9;
    const centerX = Math.round(width / 2);

    const socialProof = subheadline.trim() ? `★★★★★  ${subheadline.trim()}` : "★★★★★  Loved by our customers";

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="${cardY}" width="${width}" height="${cardHeight}" fill="#FBF8F3"/>
      <rect x="0" y="${cardY}" width="${width}" height="5" fill="${brandColor}"/>
      <text x="${centerX}" y="${headlineStartY}" font-family="Georgia, 'Times New Roman', serif" font-size="${headlineFontSize}" font-weight="700" fill="#2A2118" text-anchor="middle">${centeredTspans(headlineLines, centerX, headlineStartY, headlineFontSize * 1.08)}</text>
      <text x="${centerX}" y="${proofY}" font-family="Arial, Helvetica, sans-serif" font-size="${proofFontSize}" fill="#8A6D1F" text-anchor="middle">${escapeXml(socialProof)}</text>
      <rect x="${ctaX}" y="${ctaY}" width="${ctaWidth}" height="${ctaHeight}" rx="${ctaHeight / 2}" fill="${brandColor}"/>
      <text x="${centerX}" y="${ctaY + ctaHeight / 2 + proofFontSize * 0.36}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(proofFontSize * 0.98)}" font-weight="700" fill="#ffffff" text-anchor="middle">${escapeXml(cta.toUpperCase())}</text>
    </svg>`;
  }
};

const passthrough: Template = {
  id: "passthrough",
  label: "No Overlay (Resize Only)",
  description: "Crops/resizes the image to the target size only - no text or branding added. Use this for a creative you already finished elsewhere.",
  render() {
    // No visual content - compose.ts skips compositing entirely for this
    // template, but a render() is kept so it behaves like any other Template.
    return "";
  }
};

export const TEMPLATES: Template[] = [boldBottomBar, topBannerClean, framedBadge, dealCard, passthrough];

export function getTemplate(id: TemplateId): Template {
  const t = TEMPLATES.find((tpl) => tpl.id === id);
  if (!t) throw new Error(`Unknown template: ${id}`);
  return t;
}
