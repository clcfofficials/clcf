import { getProduct } from "@/app/actions";
import { ProductForm } from "../product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddProductPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
            <Link href="/admin/dashboard">
                <ArrowLeft />
                <span className="sr-only">Back to Dashboard</span>
            </Link>
        </Button>
        <div>
            <h2 className="text-3xl font-bold font-headline">Add New Product</h2>
            <p className="text-muted-foreground">Fill out the form to add a new product to your catalog.</p>
        </div>
      </div>
      <ProductForm />
    </div>
  );
}
