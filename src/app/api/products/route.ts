import { NextResponse } from 'next/server';
import { z } from 'zod';
import { products as initialProducts, type Product } from '@/lib/placeholder-data';

// In a real app, this would be a database. We're simulating it with an in-memory array.
let products: Product[] = [...initialProducts];

const ProductSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().regex(/^\$\d+(\.\d{2})?$/, 'Price must be in the format $xx.xx'),
  image: z.string().url('Must be a valid image URL'),
  featured: z.boolean(),
});

// GET /api/products - Get all products
export async function GET() {
  return NextResponse.json(products);
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedFields = ProductSchema.safeParse(json);

    if (!validatedFields.success) {
      return NextResponse.json({
        message: 'Failed to create product.',
        errors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const newProduct: Product = {
      ...validatedFields.data,
      id: String(Date.now()),
    };

    products.unshift(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
