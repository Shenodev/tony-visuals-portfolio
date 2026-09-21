import dbConnect from "./mongodb";
import Album from "@/models/Album";
import Image from "@/models/Image";

export interface AlbumDoc {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  year: string;
  coverImageUrl: string;
  coverImagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
  imageCount: number;
}

export async function getAllAlbums(): Promise<AlbumDoc[]> {
  await dbConnect();

  const albums = await Album.find({}, null, { sort: { createdAt: -1 } }).lean();
  const counts = await Image.aggregate([
    { $group: { _id: "$albumId", count: { $sum: 1 } } },
  ]);

  const countMap = new Map<string, number>();
  for (const c of counts) {
    countMap.set(String(c._id), c.count);
  }

  return albums.map((a) => ({
    ...a,
    _id: String(a._id),
    imageCount: countMap.get(String(a._id)) || 0,
  }));
}

export async function getAlbumById(id: string): Promise<AlbumDoc | null> {
  await dbConnect();
  const album = await Album.findById(id).lean();
  if (!album) return null;
  return { ...album, _id: String(album._id), imageCount: 0 };
}

export interface ImageDoc {
  _id: string;
  albumId: string;
  url: string;
  public_id: string;
  width: number;
  height: number;
  createdAt: Date;
}

export async function getAlbumImages(albumId: string): Promise<ImageDoc[]> {
  await dbConnect();
  const images = await Image.find({ albumId })
    .sort({ createdAt: 1 })
    .lean();
  return images.map((img) => ({
    ...img,
    _id: String(img._id),
    albumId: String(img.albumId),
  }));
}
