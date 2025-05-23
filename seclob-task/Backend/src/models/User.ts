import mongoose, { Schema, Document } from 'mongoose';

export interface IWishlistItem {
  product: mongoose.Types.ObjectId;
  selectedVariant: {
    ram: string;
    price: number;
    quantity: number;
  };
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  wishlist: IWishlistItem[]; 
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
wishlist: [
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    selectedVariant: {
      ram: String,
      price: Number,
      quantity: Number,
    }
  }
]

  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
