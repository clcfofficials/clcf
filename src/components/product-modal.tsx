
import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, Heart, Share2, Star } from 'lucide-react';

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
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full mx-4 p-0 overflow-hidden bg-gradient-card border-none shadow-large">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-background/90 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Image Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
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
              <div className="absolute top-6 left-6">
                <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-none backdrop-blur-sm px-4 py-2 text-sm font-medium">
                  {product.category}
                </Badge>
              </div>

              {/* Wishlist button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-16 p-3 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-background/90 transition-all duration-200"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col justify-between relative">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-10 w-32 h-32 border border-primary/20 rounded-full" />
                <div className="absolute bottom-20 left-10 w-24 h-24 border border-accent/20 rounded-full" />
              </div>

              <div className="space-y-6 relative z-10">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.8 • 234 reviews)</span>
                </div>

                {/* Title */}
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-card-foreground leading-tight">
                    {product.title}
                  </DialogTitle>
                </DialogHeader>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">{product.price}</span>
                  <span className="text-lg text-muted-foreground line-through">Rs 45.99</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    20% OFF
                  </Badge>
                </div>

                {/* Description */}
                <DialogDescription className="text-base text-card-foreground/80 leading-relaxed">
                  {product.description}
                </DialogDescription>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-card-foreground">Key Features:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Organic and eco-friendly formulation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Long-lasting protection and effectiveness
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Safe for beneficial insects and environment
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Easy application with visible results
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-4 pt-6 border-t border-border/50 relative z-10">
                <div className="flex gap-3">
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="default" size="lg" className="w-full gap-3 py-3 text-base font-semibold">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button variant="outline" size="lg" className="px-4">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>

                <Button variant="outline" size="lg" className="w-full">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
