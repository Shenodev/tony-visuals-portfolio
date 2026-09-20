import mongoose, { Schema, Document } from "mongoose";

export interface IAlbum extends Document {
  title: string;
  coverImageUrl: string;
  coverImagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
}

const AlbumSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    coverImageUrl: { type: String, required: true },
    coverImagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default (mongoose.models.Album as mongoose.Model<IAlbum>) ||
  mongoose.model<IAlbum>("Album", AlbumSchema);
