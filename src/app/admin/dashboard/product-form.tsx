"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import type { IProduct } from "@/models/Product";

type Product = IProduct & { id: string };

function SubmitButton({ isEdit, isPending }: { isEdit: boolean, isPending: boolean }) {
    return (
        <Button type="submit" disabled={isPending}>
            {isPending ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Product" : "Add Product")}
        </Button>
    );
}

export function ProductForm({ product, onFormSubmit }: { product?: Product, onFormSubmit?: () => void }) {
    const isEdit = !!product;
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [errors, setErrors] = useState<Record<string, string[] | undefined> | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData.entries());

        const payload = {
            title: formValues.title,
            description: formValues.description,
            price: formValues.price,
            featured: formValues.featured === 'on',
            image: product?.image || 'https://picsum.photos/600/400', // Retain old image or use placeholder
        };

        const url = isEdit ? `/api/products/${product.id}` : '/api/products';
        const method = isEdit ? 'PATCH' : 'POST';

        startTransition(async () => {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                toast({
                    title: "Success",
                    description: isEdit ? "Product updated successfully." : "Product added successfully.",
                });
                setErrors(null);
                onFormSubmit?.();
                router.refresh(); // Re-fetch server-side data
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.message || (isEdit ? "Failed to update product." : "Failed to add product."),
                });
                if (result.errors) {
                    setErrors(result.errors);
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" defaultValue={product?.title} required />
                    {errors?.title && <p className="text-sm text-destructive">{errors.title.join(", ")}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" defaultValue={product?.description} required />
                     {errors?.description && <p className="text-sm text-destructive">{errors.description.join(", ")}</p>}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" defaultValue={product?.price} required />
                     {errors?.price && <p className="text-sm text-destructive">{errors.price.join(", ")}</p>}
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="featured" name="featured" defaultChecked={product?.featured} />
                    <Label htmlFor="featured" className="font-normal">Featured Product</Label>
                </div>

                {isEdit && product.image && (
                     <div className="space-y-2">
                        <Label>Current Image</Label>
                        <Image src={product.image} alt={product.title} width={150} height={100} className="rounded-md border" />
                        <p className="text-xs text-muted-foreground">Image uploading is not implemented. The existing image will be retained.</p>
                    </div>
                )}
            </div>
            <div className="flex justify-end mt-8">
                <SubmitButton isEdit={isEdit} isPending={isPending} />
            </div>
        </form>
    );
}
