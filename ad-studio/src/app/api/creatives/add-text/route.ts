import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getCreatives, addCreatives, newId } from "@/lib/store";
import { addTextOverlay, type TextPosition } from "@/lib/creative-studio/compose";
import { handleApiError, jsonError } from "@/lib/api-utils";

export const runtime = "nodejs";

const GENERATED_DIR = path.join(process.cwd(), "public", "generated");

const VALID_POSITIONS: TextPosition[] = ["top", "center", "bottom"];

interface AddTextBody {
  creativeId: string;
  text: string;
  position?: TextPosition;
}

/**
 * Takes an already-generated creative (e.g. one made with "No Overlay") and
 * stamps the exact text the operator typed onto it - nothing auto-added or
 * reworded. Produces a new creative record; the original is left untouched.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AddTextBody;
    if (!body.creativeId) return jsonError("creativeId is required");
    if (!body.text?.trim()) return jsonError("text is required");
    const position = body.position && VALID_POSITIONS.includes(body.position) ? body.position : "bottom";

    const [source] = await getCreatives([body.creativeId]);
    if (!source) return jsonError("Unknown creative", 404);

    const inputBuffer = await fs.readFile(path.join(GENERATED_DIR, path.basename(source.url)));
    const composed = await addTextOverlay(inputBuffer, body.text, position);

    const id = newId("cre");
    const fileName = `${id}.jpg`;
    await fs.mkdir(GENERATED_DIR, { recursive: true });
    await fs.writeFile(path.join(GENERATED_DIR, fileName), composed);

    const record = {
      id,
      assetId: source.assetId,
      templateId: "custom-text",
      format: source.format,
      url: `/generated/${fileName}`,
      headline: body.text.trim(),
      subheadline: "",
      cta: "",
      createdAt: Date.now()
    };

    await addCreatives([record]);

    return NextResponse.json({ creative: record });
  } catch (error) {
    return handleApiError(error);
  }
}
