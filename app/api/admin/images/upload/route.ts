import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";
import Album from "@/models/Album";
import { uploadImage } from "@/lib/cloudinary";
import {
  ALLOWED_IMAGE_TYPES,
  mapWithConcurrency,
  sniffImageType,
} from "@/lib/upload";
import { isSameOrigin, isValidObjectId, requireAdmin } from "@/lib/session";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 50;
const UPLOAD_CONCURRENCY = 4;

export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  try {
    await dbConnect();

    const formData = await request.formData();
    const albumId = formData.get("albumId");

    if (typeof albumId !== "string" || !isValidObjectId(albumId)) {
      return NextResponse.json(
        { error: "A valid albumId is required" },
        { status: 400 }
      );
    }

    const album = await Album.findById(albumId);
    if (!album) {
      return NextResponse.json(
        { error: "Album not found" },
        { status: 404 }
      );
    }

    const files: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === "files" && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "At least one image file is required" },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Too many files. Maximum: ${MAX_FILES}` },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
        return NextResponse.json(
          {
            error: `Invalid file type: ${file.name}. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
          },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `File too large: ${file.name}. Maximum: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
          },
          { status: 400 }
        );
      }
    }

    const slug = album.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const folder = `tony-visuals/albums/${slug}`;

    const uploadResults = await mapWithConcurrency(
      files,
      UPLOAD_CONCURRENCY,
      async (file, index) => {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        const detected = sniffImageType(bytes);
        if (!detected || detected !== file.type) {
          throw new ImageValidationError(
            `File is not a valid image: ${file.name}`
          );
        }

        const fileBuffer = Buffer.from(arrayBuffer);

        const result = await uploadImage(fileBuffer, folder, {
          public_id: `${slug}-${Date.now()}-${index}`,
        });

        return {
          albumId: album._id,
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
        };
      }
    );

    const savedImages = await Image.insertMany(uploadResults);

    return NextResponse.json(savedImages, { status: 201 });
  } catch (error) {
    if (error instanceof ImageValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("POST /api/admin/images/upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}

class ImageValidationError extends Error {}