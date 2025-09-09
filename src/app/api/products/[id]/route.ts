
import { NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { isValidObjectId } from 'mongoose';


const ProductSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().min(1, 'Price is required'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Must be a valid image URL'),
  featured: z.boolean(),
});

async function checkId(id: string) {
    if (!isValidObjectId(id)) {
        return new NextResponse(JSON.stringify({ message: 'Invalid product ID' }), { status: 400 });
    }
    return null;
}

// GET /api/products/[id] - Get a single product
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const errorResponse = await checkId(params.id);
    if(errorResponse) return errorResponse;

    await dbConnect();
    
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// PATCH /api/products/[id] - Update a product
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const errorResponse = await checkId(params.id);
    if(errorResponse) return errorResponse;

    await dbConnect();

    const json = await request.json();
    const validatedFields = ProductSchema.safeParse(json);
    
    if (!validatedFields.success) {
      return NextResponse.json({
        message: 'Failed to update product.',
        errors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(params.id, validatedFields.data, { new: true });
    
    if (!updatedProduct) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const errorResponse = await checkId(params.id);
        if(errorResponse) return errorResponse;

        await dbConnect();
        
        const deletedProduct = await Product.findByIdAndDelete(params.id);

        if (!deletedProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch(error) {
        console.error(error);
        return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
    }
}
