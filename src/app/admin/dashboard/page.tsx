import { ProductTable } from "./product-table";
import type { IProduct } from "@/models/Product";
import { unstable_noStore as noStore } from "next/cache";
import { AnimatedContainer } from "@/components/animated-container";


async function getProducts(): Promise<IProduct[]> {
    noStore();
    // The URL needs to be absolute for server-side fetching.
    const url = new URL('/api/products', process.env.NEXT_PUBLIC_URL);
    const res = await fetch(url);

    if(!res.ok) {
        // In a real app, you'd want to handle this error more gracefully.
        console.error("Failed to fetch products", res.status, res.statusText);
        return [];
    }

    const products = await res.json();
    // The id from MongoDB is _id. We need to convert it to a string for our components.
    return products.map((p: any) => ({...p, id: p._id.toString()}));
}


export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <>
      <div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Products Management</h2>
        <p className="text-muted-foreground mt-2">Add, update, or delete products from your store.</p>
      </div>
      
      <AnimatedContainer delay={0.2}>
        <ProductTable initialProducts={products} />
      </AnimatedContainer>
    </>
  );
}
