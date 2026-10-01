import { NextResponse } from "next/server";
import { getAllAlbums } from "@/lib/albums";

export const revalidate = 3600;

export async function GET() {
  try {
    const albums = await getAllAlbums();
    return NextResponse.json(albums, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 }
    );
  }
}
