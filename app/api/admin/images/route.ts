import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get("albumId");

    if (!albumId) {
      return NextResponse.json(
        { error: "albumId query parameter is required" },
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
