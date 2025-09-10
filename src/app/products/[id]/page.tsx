
import React from 'react';
import { notFound } from 'next/navigation';
import type { IProduct } from '@/models/Product';
import { ProductDetailClient } from './product-detail-client';

interface Product extends IProduct {
  _id: string;
}

async function getProduct(id: string): Promise<Product | null> {
  // The URL needs to be absolute for server-side fetching.
  const url = new URL(`/api/products/${id}`, process.env.NEXT_PUBLIC_URL);
  try {
    const res = await fetch(url, {
        // Revalidate frequently to ensure data is fresh
        next: { revalidate: 60 } 
    });

    if (!res.ok) {
        return null;
    }
    const product = await res.json();
    return product;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
