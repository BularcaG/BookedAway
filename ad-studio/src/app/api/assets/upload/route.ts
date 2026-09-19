import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { addAsset, newId } from "@/lib/store";
import { readImageDimensions } from "@/lib/creative-studio/compose";
import { handleApiError, jsonError } from "@/lib/api-utils";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 15 * 1024 * 1024; // 15MB

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) return jsonError("No file was uploaded");
    if (!ALLOWED_TYPES.has(file.type)) return jsonError("Only JPEG, PNG or WebP product photos are supported");
    if (file.size > MAX_BYTES) return jsonError("Image is too large (max 15MB)");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { width, height } = await readImageDimensions(buffer);
    if (!width || !height) return jsonError("Could not read this image - is it a valid photo?");

    const id = newId("asset");
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const fileName = `${id}.${ext}`;

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);

    const asset = await addAsset({
      id,
      fileName,
      url: `/uploads/${fileName}`,
      width,
      height,
      createdAt: Date.now()
    });

    return NextResponse.json({ asset });
  } catch (error) {
    return handleApiError(error);
  }
}
