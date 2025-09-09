
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
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

    // New state for image handling
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        let imageUrl = product?.image || '';

        // 1. Handle image upload if a new file is selected
        if (imageFile) {
            setIsUploading(true);
            setUploadProgress(0);

            const uploadFormData = new FormData();
            uploadFormData.append('file', imageFile);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData,
                    // Note: No 'Content-Type' header, browser sets it with boundary for FormData
                });

                setIsUploading(false);

                if(!response.ok) {
                    const errorResult = await response.json();
                    throw new Error(errorResult.error || 'Upload failed');
                }

                const result = await response.json();
                imageUrl = result.url;
                setImagePreview(result.url); // Update preview with final URL
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Image Upload Error",
                    description: error.message || "Failed to upload image.",
                });
                setIsUploading(false);
                return; // Stop form submission if upload fails
            }
        }
        
        const formValues = Object.fromEntries(formData.entries());

        const payload = {
            title: formValues.title,
            description: formValues.description,
            price: formValues.price,
            category: formValues.category,
            featured: formValues.featured === 'on',
            image: imageUrl, // Use new or existing image URL
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

                 <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue={product?.category || "Fungicides"}>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Fungicides">Fungicides</SelectItem>
                            <SelectItem value="Insecticides">Insecticides</SelectItem>
                            <SelectItem value="Plant Growth Regulators">Plant Growth Regulators</SelectItem>
                            <SelectItem value="Herbicides">Herbicides</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                     {errors?.category && <p className="text-sm text-destructive">{errors.category.join(", ")}</p>}
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
                     {imagePreview && (
                        <div className="mt-4">
                            <Image src={imagePreview} alt="Image Preview" width={150} height={100} className="rounded-md border" />
                        </div>
                     )}
                     {isUploading && (
                        <div className="mt-2">
                            <Progress value={uploadProgress} />
                            <p className="text-xs text-muted-foreground mt-1">Uploading...</p>
                        </div>
                     )}
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="featured" name="featured" defaultChecked={product?.featured} />
                    <Label htmlFor="featured" className="font-normal">Featured Product</Label>
                </div>
            </div>
            <div className="flex justify-end mt-8">
                <SubmitButton isEdit={isEdit} isPending={isPending || isUploading} />
            </div>
        </form>
    );
}
