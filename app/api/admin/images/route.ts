import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";
import { isValidObjectId, requireAdmin } from "@/lib/session";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get("albumId");

    if (!albumId || !isValidObjectId(albumId)) {
      return NextResponse.json(
        { error: "A valid albumId query parameter is required" },
        { status: 400 }
      );
    }

    const images = await Image.find({ albumId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(images);
  } catch (error) {
    console.error("GET /api/admin/images error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
