
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import type { IProduct } from "@/models/Product";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    
    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        let imageUrl = product?.image || '';

        if(imagePreview === null && !imageFile){
            imageUrl = ''; // Image was removed
        }

        if (imageFile) {
            setIsUploading(true);
            setUploadProgress(0);

            const uploadFormData = new FormData();
            uploadFormData.append('file', imageFile);

            try {
                // Simulate progress for better UX
                const progressInterval = setInterval(() => {
                    setUploadProgress(prev => Math.min(prev + 10, 90));
                }, 200);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData,
                });
                
                clearInterval(progressInterval);
                setUploadProgress(100);

                setIsUploading(false);

                if(!response.ok) {
                    const errorResult = await response.json();
                    throw new Error(errorResult.error || 'Upload failed');
                }

                const result = await response.json();
                imageUrl = result.url;
                setImagePreview(result.url); 
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Image Upload Error",
                    description: error.message || "Failed to upload image.",
                });
                setIsUploading(false);
                return;
            }
        }
        
        const formValues = Object.fromEntries(formData.entries());

        const payload = {
            title: formValues.title,
            description: formValues.description,
            price: formValues.price,
            category: formValues.category,
            image: imageUrl,
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
                router.refresh();
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
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col h-full overflow-hidden">
             <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={product?.title} required />
                        {errors?.title && <p className="text-sm text-destructive">{errors.title.join(", ")}</p>}
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

                    <div className="space-y-2 md:col-span-2 lg:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={product?.description} required rows={6} />
                         {errors?.description && <p className="text-sm text-destructive">{errors.description.join(", ")}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                        <Label htmlFor="image">Product Image</Label>
                        {!imagePreview && !isUploading && (
                            <Card className="border-2 border-dashed bg-muted hover:bg-muted/80 transition-colors h-full">
                                <CardContent className="p-6 text-center flex items-center justify-center h-full">
                                    <Label htmlFor="image" className="cursor-pointer">
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <Upload className="h-8 w-8 text-muted-foreground"/>
                                            <p className="text-sm text-muted-foreground font-semibold">Click to upload</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                                        </div>
                                    </Label>
                                    <Input id="image" name="image" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                </CardContent>
                            </Card>
                        )}
                         {isUploading && (
                            <div className="mt-2">
                                <Progress value={uploadProgress} />
                                <p className="text-xs text-muted-foreground mt-1">Uploading... {uploadProgress}%</p>
                            </div>
                         )}
                         {imagePreview && (
                            <div className="mt-2 relative">
                                <Image src={imagePreview} alt="Image Preview" width={150} height={100} className="rounded-md border aspect-video object-cover w-full" />
                                <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-7 w-7 rounded-full" onClick={removeImage}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end p-6 bg-background border-t mt-auto flex-shrink-0">
                <SubmitButton isEdit={isEdit} isPending={isPending || isUploading} />
            </div>
        </form>
    );
}
