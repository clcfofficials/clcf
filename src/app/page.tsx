import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, HeartHandshake, Sprout, Truck } from "lucide-react";
import { SpaceWrapper } from "@/components/space-wrapper";
import type { IProduct } from "@/models/Product";
import { unstable_noStore as noStore } from "next/cache";
import { HeroSection } from "@/components/hero-section";
import CropLifeCareIntro from "@/components/croplife-care-intro";
import { FertilizerProductsSection } from "@/components/featured-products-section";
import { WhyChooseUsSection } from "@/components/why-choose-us";
import { FAQSection } from "@/components/faq-section";

type Product = IProduct & { _id: string };

async function getProducts(): Promise<Product[]> {
  noStore();
  const url = new URL('/api/products', process.env.NEXT_PUBLIC_URL);
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Failed to fetch products");
    return [];
  }
  return res.json();
}

export default async function Home() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.filter(p => p.featured).slice(0, 3);

  return (
    <div className="flex flex-col">
      <HeroSection />
      
      <CropLifeCareIntro />

      <FertilizerProductsSection />
      
      <WhyChooseUsSection />

      <FAQSection />
    </div>
  );
}
