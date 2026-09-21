import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";
import Album from "@/models/Album";
import { uploadImage } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILES = 50;

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const albumId = formData.get("albumId") as string | null;

    if (!albumId) {
      return NextResponse.json(
        { error: "albumId is required" },
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
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Invalid file type: ${file.name}. Allowed: ${ALLOWED_TYPES.join(", ")}`,
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

    const uploadResults = await Promise.all(
      files.map(async (file, index) => {
        const arrayBuffer = await file.arrayBuffer();
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
      })
    );

    const savedImages = await Image.insertMany(uploadResults);

    return NextResponse.json(savedImages, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/images/upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}
