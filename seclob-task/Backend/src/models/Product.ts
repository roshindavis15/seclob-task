import mongoose, { Schema, Document } from 'mongoose';

interface Variant {
  ram: string;
  price: number;
  quantity: number;
}

export interface IProduct extends Document {
  title: string;
  description: string;
  subCategory: mongoose.Types.ObjectId;
  variants: Variant[];
  images: string[];
}

const VariantSchema = new Schema<Variant>(
  {
    ram: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    variants: { type: [VariantSchema], required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
