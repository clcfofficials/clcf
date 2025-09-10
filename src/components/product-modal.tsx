
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Heart, Share2, Star, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { toast } = useToast();

  if (!product) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Product page URL has been copied to your clipboard.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full mx-4 p-0 overflow-hidden bg-gradient-card border-none shadow-large">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative max-h-[90vh] flex flex-col lg:flex-row"
        >
          {/* Image Section */}
          <div className="relative lg:w-1/2 w-full h-64 lg:h-auto overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 shrink-0">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Floating gradient orbs */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-10 left-10 w-24 h-24 bg-primary/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-16 h-16 bg-accent/30 rounded-full blur-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </div>

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-none backdrop-blur-sm px-3 py-1 text-xs sm:text-sm font-medium">
                {product.category}
              </Badge>
            </div>

            {/* Wishlist button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-12 sm:right-16 p-2 sm:p-3 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-background/90 transition-all duration-200"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 flex flex-col justify-between relative overflow-y-auto">
            <div className="space-y-4 relative z-10">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">(4.8 • 234 reviews)</span>
              </div>

              {/* Title */}
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-card-foreground leading-tight">
                  {product.title}
                </DialogTitle>
              </DialogHeader>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold text-primary">{product.price}</span>
                <span className="text-md md:text-lg text-muted-foreground line-through">Rs 45.99</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  20% OFF
                </Badge>
              </div>

              {/* Description */}
              <DialogDescription className="text-sm md:text-base text-card-foreground/80 leading-relaxed">
                {product.description}
              </DialogDescription>

              {/* Features */}
              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-card-foreground">Key Features:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    <span>Organic and eco-friendly formulation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    <span>Long-lasting protection and effectiveness</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    <span>Safe for beneficial insects and environment</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-6 border-t border-border/50 relative z-10 mt-6 shrink-0">
              <div className="flex gap-3">
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button asChild size="lg" className="w-full gap-3 py-3 text-base font-semibold">
                    <Link href="/contact">
                        Contact Us
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="outline" size="lg" className="px-4" onClick={handleShare}>
                    <Share2 className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
