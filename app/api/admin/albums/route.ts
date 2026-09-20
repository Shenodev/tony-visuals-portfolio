import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Album from "@/models/Album";
import { uploadImage } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function GET() {
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
  try {
    await dbConnect();

    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const file = formData.get("coverImage") as File | null;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Album title is required" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: "Cover image is required" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`,
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
    const fileBuffer = Buffer.from(arrayBuffer);

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const uploadResult = await uploadImage(
      fileBuffer,
      `tony-visuals/albums/${slug}`,
      { public_id: `cover-${slug}` }
    );

    const album = await Album.create({
      title: title.trim(),
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
