import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Album from "@/models/Album";
import { uploadImage } from "@/lib/cloudinary";
import { ALLOWED_IMAGE_TYPES, sniffImageType } from "@/lib/upload";
import { isSameOrigin, requireAdmin } from "@/lib/session";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_TITLE = 120;

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    await dbConnect();
    const albums = await Album.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(albums);
  } catch (error) {
    console.error("GET /api/admin/albums error:", error);
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  try {
    await dbConnect();

    const formData = await request.formData();
    const rawTitle = formData.get("title");
    const file = formData.get("coverImage") as File | null;

    const title =
      typeof rawTitle === "string"
        ? rawTitle.replace(/[\u0000-\u001f\u007f]/g, "").trim()
        : "";

    if (!title || title.length > MAX_TITLE) {
      return NextResponse.json(
        { error: `Album title is required (max ${MAX_TITLE} characters)` },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: "Cover image is required" },
        { status: 400 }
      );
    }

    if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const detected = sniffImageType(bytes);
    if (!detected || detected !== file.type) {
      return NextResponse.json(
        { error: "File is not a valid image (JPEG, PNG, WebP or GIF)." },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(arrayBuffer);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const uploadResult = await uploadImage(
      fileBuffer,
      `tony-visuals/albums/${slug}`,
      { public_id: `cover-${slug}` }
    );

    const album = await Album.create({
      title,
      slug,
      coverImageUrl: uploadResult.secure_url,
      coverImagePublicId: uploadResult.public_id,
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/albums error:", error);
    return NextResponse.json(
      { error: "Failed to create album" },
      { status: 500 }
    );
  }
}