import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: string;
  image: string;
  featured: boolean;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default models.Product || model<IProduct>('Product', ProductSchema);
