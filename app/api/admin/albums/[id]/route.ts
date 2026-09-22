import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Album from "@/models/Album";
import Image from "@/models/Image";
import { deleteImage, deleteFolder } from "@/lib/cloudinary";
import { isSameOrigin, isValidObjectId, requireAdmin } from "@/lib/session";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  try {
    await dbConnect();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    const album = await Album.findById(id);
    if (!album) {
      return NextResponse.json(
        { error: "Album not found" },
        { status: 404 }
      );
    }

    const images = await Image.find({ albumId: id }).lean();

    for (const image of images) {
      try {
        await deleteImage(image.public_id);
      } catch (err) {
        console.error(`Failed to delete Cloudinary asset ${image.public_id}:`, err);
      }
    }

    await Image.deleteMany({ albumId: id });

    try {
      const slug = album.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      await deleteFolder(`tony-visuals/albums/${slug}`);
    } catch (err) {
      console.error("Failed to delete Cloudinary folder:", err);
    }

    await Album.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/albums/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete album" },
      { status: 500 }
    );
  }
}
