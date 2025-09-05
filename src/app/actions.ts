'use server';

import { z } from 'zod';
import { products as initialProducts, type Product } from '@/lib/placeholder-data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// In a real app, this would be a database.
let products: Product[] = [...initialProducts];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ProductSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().regex(/^\$\d+(\.\d{2})?$/, 'Price must be in the format $xx.xx'),
  image: z.string().url('Must be a valid image URL'),
  featured: z.boolean(),
});

export type FormState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
  success: boolean;
};

export async function getProducts() {
  return products;
}

export async function getProduct(id: string) {
  return products.find(p => p.id === id);
}

export async function addProduct(prevState: FormState, formData: FormData): Promise<FormState> {
  await sleep(500); // Simulate network delay
  const validatedFields = ProductSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    image: 'https://picsum.photos/600/400', // Placeholder
    featured: formData.get('featured') === 'on',
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to create product.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const newProduct: Product = {
    ...validatedFields.data,
    id: String(Date.now()),
  };

  products.unshift(newProduct);

  revalidatePath('/admin/dashboard');
  revalidatePath('/products');
  revalidatePath('/');
  
  return { message: 'Product created successfully.', success: true };
}

export async function updateProduct(prevState: FormState, formData: FormData): Promise<FormState> {
    await sleep(500);
    const id = formData.get('id') as string;

    const validatedFields = ProductSchema.safeParse({
        id,
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        image: formData.get('image'),
        featured: formData.get('featured') === 'on',
    });

    if (!validatedFields.success) {
        return {
        message: 'Failed to update product.',
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
        };
    }

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return { message: 'Product not found.', success: false };
    }

    products[productIndex] = { ...products[productIndex], ...validatedFields.data };
    
    revalidatePath('/admin/dashboard');
    revalidatePath(`/admin/dashboard/edit/${id}`);
    revalidatePath('/products');
    revalidatePath('/');

    return { message: 'Product updated successfully.', success: true };
}


export async function deleteProduct(id: string) {
    await sleep(500); // Simulate network delay
    
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);

    if (products.length === initialLength) {
        return { message: 'Product not found.', success: false };
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/products');
    revalidatePath('/');
    
    return { message: 'Product deleted successfully.', success: true };
}

// --- Login Action ---
const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
    await sleep(500);
    const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        }
    }

    const { username, password } = validatedFields.data;

    // In a real app, you would check against a database.
    if (username !== 'admin' || password !== 'password') {
        return {
            message: 'Invalid username or password.',
            success: false,
        }
    }
    
    redirect('/admin/dashboard');
}
