import mongoose, { Schema, Document } from "mongoose";

export interface IAlbum extends Document {
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
}

const AlbumSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    year: { type: String, default: "", trim: true },
    coverImageUrl: { type: String, required: true },
    coverImagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default (mongoose.models.Album as mongoose.Model<IAlbum>) ||
  mongoose.model<IAlbum>("Album", AlbumSchema);
