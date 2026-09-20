import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error(
    "Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET inside .env.local"
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload an image buffer to Cloudinary under a specific folder.
 *
 * @param fileBuffer - The image Buffer (e.g. from fs.readFile or request body).
 * @param folder - The Cloudinary folder path (e.g. "tony-visuals/albums/summer-concert").
 * @param options - Optional upload overrides (public_id, etc.).
 * @returns The Cloudinary upload result containing url, public_id, width, height.
 */
export async function uploadImage(
  fileBuffer: Buffer,
  folder: string,
  options?: { public_id?: string; overwrite?: boolean }
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      resource_type: "image" as const,
      ...options,
    };

    cloudinary.uploader
      .upload_stream(
        uploadOptions,
        (error, result) => {
          if (error || !result) {
            return reject(
              error || new Error("Cloudinary upload returned no result")
            );
          }
          resolve(result);
        }
      )
      .end(fileBuffer);
  });
}

/**
 * Delete an image from Cloudinary by its public_id.
 *
 * @param publicId - The Cloudinary public_id of the asset.
 * @returns The Cloudinary deletion result.
 */
export async function deleteImage(publicId: string) {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(
      `Failed to delete image "${publicId}": ${JSON.stringify(result)}`
    );
  }

  return result;
}

/**
 * Delete an entire folder and all assets within it from Cloudinary.
 * Cloudinary's delete_folder only works on empty folders, so this
 * first fetches all assets in the folder, deletes them, then deletes
 * the folder itself.
 *
 * @param folderPath - The folder path (e.g. "tony-visuals/albums/summer-concert").
 */
export async function deleteFolder(folderPath: string) {
  let nextCursor: string | undefined;

  const allPublicIds: string[] = [];

  do {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await new Promise((resolve, reject) => {
      const search = cloudinary.search
        .expression(`folder:${folderPath}`)
        .max_results(100);

      if (nextCursor) {
        search.next_cursor(nextCursor);
      }

      search.execute().then(resolve).catch(reject);
    });

    if (result.resources && result.resources.length > 0) {
      for (const resource of result.resources) {
        allPublicIds.push(resource.public_id);
      }
    }

    nextCursor = result.next_cursor;
  } while (nextCursor);

  // Batch-delete assets (Cloudinary allows up to 100 per call)
  for (let i = 0; i < allPublicIds.length; i += 100) {
    const batch = allPublicIds.slice(i, i + 100);
    await cloudinary.api.delete_resources(batch, {
      resource_type: "image",
    });
  }

  // Now delete the empty folder
  try {
    await cloudinary.api.delete_folder(folderPath);
  } catch {
    // Folder may already be gone or never existed — safe to ignore
  }
}
