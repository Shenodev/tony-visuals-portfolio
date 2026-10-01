import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  albumId: mongoose.Types.ObjectId;
  url: string;
  public_id: string;
  width: number;
  height: number;
  createdAt: Date;
}

const ImageSchema: Schema = new Schema(
  {
    albumId: {
      type: Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

ImageSchema.index({ albumId: 1 });

export default (mongoose.models.Image as mongoose.Model<IImage>) ||
  mongoose.model<IImage>("Image", ImageSchema);
