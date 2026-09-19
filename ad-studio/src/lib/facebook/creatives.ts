import { graphRequest, graphUpload } from "./graph";

/**
 * Uploads a single image to the ad account's image library.
 * Facebook returns a "hash" that identifies this image - creatives reference
 * the hash, not a URL, so this must happen before creating an ad creative.
 */
export async function uploadAdImage(adAccountId: string, accessToken: string, file: Buffer, fileName: string): Promise<string> {
  const result = await graphUpload<{ images: Record<string, { hash: string }> }>(
    `${adAccountId}/adimages`,
    accessToken,
    "filename", // the multipart field name Facebook scans for the binary image
    file,
    fileName
  );
  const entry = Object.values(result.images)[0];
  if (!entry?.hash) throw new Error("Facebook did not return an image hash for the uploaded creative");
  return entry.hash;
}

export interface CreateAdCreativeInput {
  adAccountId: string;
  accessToken: string;
  pageId: string;
  imageHash: string;
  primaryText: string;
  headline: string;
  destinationUrl: string;
  callToAction: string; // e.g. SHOP_NOW, LEARN_MORE, SIGN_UP
  name: string;
}

export async function createAdCreative(input: CreateAdCreativeInput): Promise<string> {
  const objectStorySpec = {
    page_id: input.pageId,
    link_data: {
      image_hash: input.imageHash,
      link: input.destinationUrl,
      message: input.primaryText,
      name: input.headline,
      call_to_action: { type: input.callToAction, value: { link: input.destinationUrl } }
    }
  };

  const result = await graphRequest<{ id: string }>(`${input.adAccountId}/adcreatives`, {
    method: "POST",
    accessToken: input.accessToken,
    form: {
      name: input.name,
      object_story_spec: JSON.stringify(objectStorySpec)
    }
  });

  return result.id;
}
