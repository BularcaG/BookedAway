import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { addAsset, newId } from "@/lib/store";
import { handleApiError, jsonError } from "@/lib/api-utils";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 30 * 1024 * 1024;

/** Stores a finished creative as-is - no cropping, resizing or overlays. */
export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) return jsonError("No file was uploaded");
    if (!ALLOWED_TYPES.has(file.type)) return jsonError("Creative must be a JPEG, PNG, WebP or GIF");
    if (file.size > MAX_BYTES) return jsonError("File is too large (max 30MB)");

    const buffer = Buffer.from(await file.arrayBuffer());
    const meta = await sharp(buffer).metadata();

    const id = newId("asset");
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type === "image/gif" ? "gif" : "jpg";
    const fileName = `${id}.${ext}`;

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);

    const asset = await addAsset({
      id,
      fileName: file.name || fileName,
      url: `/uploads/${fileName}`,
      width: meta.width ?? 0,
      height: meta.height ?? 0,
      sizeBytes: file.size,
      createdAt: Date.now()
    });

    return NextResponse.json({ asset });
  } catch (error) {
    return handleApiError(error);
  }
}
