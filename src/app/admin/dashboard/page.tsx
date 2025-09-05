import { getProducts } from "@/app/actions";
import { ProductTable } from "./product-table";
import { Button } from "@/components/ui/button";
import { PlusCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-headline">Products Management</h2>
          <p className="text-muted-foreground">Add, update, or delete products.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/dashboard/add">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
      </div>
      
      <ProductTable products={products} />
    </div>
  );
}
