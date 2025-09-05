import { NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

const ProductSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().regex(/^\$\d+(\.\d{2})?$/, 'Price must be in the format $xx.xx'),
  image: z.string().url('Must be a valid image URL'),
  featured: z.boolean(),
});

// GET /api/products - Get all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    await dbConnect();
    const json = await request.json();
    const validatedFields = ProductSchema.safeParse(json);

    if (!validatedFields.success) {
      return NextResponse.json({
        message: 'Failed to create product.',
        errors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const newProduct = await Product.create(validatedFields.data);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
