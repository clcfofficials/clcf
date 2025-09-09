
import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

export default models.Product || model<IProduct>('Product', ProductSchema);
