
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Share2, Star, CheckCircle, Leaf, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import { SpaceWrapper } from '@/components/space-wrapper';
import { useToast } from '@/hooks/use-toast';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const StatItem: React.FC<{ icon: React.FC<any>; label: string; value: string; delay?: number }> = ({ icon: Icon, label, value, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <Icon className="w-6 h-6" />
    </div>
    <p className="font-semibold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </motion.div>
);

export function ProductDetailClient({ product }: { product: Product }) {
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link Copied!',
      description: 'Product page URL has been copied to your clipboard.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-black dark:to-green-950 text-foreground overflow-hidden">
      <SpaceWrapper className="py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Button asChild variant="outline" className="gap-2">
            <Link href="/products">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Card className="relative group overflow-hidden border-2 border-border/50 shadow-2xl rounded-3xl">
              <motion.img
                src={product.image}
                alt={product.title}
                className="w-full h-auto aspect-square object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </Card>
          </motion.div>

          {/* Right Side - Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <Badge className="mb-4" variant="secondary">{product.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Card className="bg-background/70 backdrop-blur-sm p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-4xl font-bold text-primary">{product.price}</p>
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="w-5 h-5" />
                  </Button>
                   <Button asChild size="lg" className="gap-2">
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t">
              <StatItem icon={Leaf} label="Improves" value="Soil Health" delay={0.3} />
              <StatItem icon={Zap} label="Acts in" value="24 Hours" delay={0.4} />
              <StatItem icon={Heart} label="Eco" value="Friendly" delay={0.5} />
              <StatItem icon={CheckCircle} label="Quality" value="Guaranteed" delay={0.6} />
            </div>
          </motion.div>
        </div>
      </SpaceWrapper>
    </div>
  );
}
