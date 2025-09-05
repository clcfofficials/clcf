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

// GET /api/products/[id] - Get a single product
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

// PATCH /api/products/[id] - Update a product
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const productIndex = products.findIndex(p => p.id === params.id);
  if (productIndex === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  try {
    const json = await request.json();
    const validatedFields = ProductSchema.safeParse(json);
    
    if (!validatedFields.success) {
      return NextResponse.json({
        message: 'Failed to update product.',
        errors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    products[productIndex] = { ...products[productIndex], ...validatedFields.data };
    
    return NextResponse.json(products[productIndex]);
  } catch (error) {
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const initialLength = products.length;
    products = products.filter(p => p.id !== params.id);

    if (products.length === initialLength) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
}
