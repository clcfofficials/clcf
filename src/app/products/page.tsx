
"use client"

import React, { useState, useEffect, useRef, memo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Search, Filter, Leaf, Zap, ShoppingCart, Star, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import type { IProduct } from "@/models/Product"
import { SpaceWrapper } from "@/components/space-wrapper"

type Product = IProduct & { _id: string; id: string; };

// Glow component implementation
const glowVariants = {
variants: {
variant: {
top: "top-0",
above: "-top-[128px]",
bottom: "bottom-0",
below: "-bottom-[128px]",
center: "top-[50%]",
},
},
defaultVariants: {
variant: "top",
},
}

const Glow = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement> & { variant?: "top" | "above" | "bottom" | "below" | "center" }
>(({ className, variant = "top", ...props }, ref) => (
<div
ref={ref}
className={cn(
"absolute w-full",
variant === "top" && "top-0",
variant === "above" && "-top-[128px]",
variant === "bottom" && "bottom-0",
variant === "below" && "-bottom-[128px]",
variant === "center" && "top-[50%]",
className
)}
{...props}
>
<div
className={cn(
"absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(142_76%_36%/0.5)_10%,_transparent_60%)] sm:h-[512px]",
variant === "center" && "-translate-y-1/2",
)}
/>
<div
className={cn(
"absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(142_76%_36%/0.3)_10%,_transparent_60%)] sm:h-[256px]",
variant === "center" && "-translate-y-1/2",
)}
/>
</div>
))
Glow.displayName = "Glow"

// Mockup component implementation
const Mockup = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement> & { type?: "mobile" | "responsive" }
>(({ className, type = "responsive", ...props }, ref) => (
<div
ref={ref}
className={cn(
"flex relative z-10 overflow-hidden shadow-2xl border border-border/5 border-t-border/15",
type === "mobile" ? "rounded-[48px] max-w-[350px]" : "rounded-md",
className
)}
{...props}
/>
))
Mockup.displayName = "Mockup"


interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

const ProductCard = memo(function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = useCallback(async () => {
    setIsAddingToCart(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsAddingToCart(false)
    onAddToCart?.(product)
  }, [product, onAddToCart])

  return (
    <motion.div
      className="group relative h-[480px] w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-full w-full rounded-2xl bg-background" />
      </motion.div>

      <Card className={cn(
        "relative h-full overflow-hidden bg-background/90 backdrop-blur-xl border-0 rounded-2xl",
        "shadow-lg hover:shadow-2xl transition-all duration-700 ease-out",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/5 before:via-emerald-500/10 before:to-teal-500/5",
        "hover:scale-[1.02] hover:rotate-1"
      )}>
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-0"
          style={{
            background: "radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(34,197,94,0.1) 40%, transparent 70%)"
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? 180 : 0
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i * 5)}%`
              }}
              animate={{
                y: isHovered ? [-10, 10, -10] : 0,
                opacity: isHovered ? [0.4, 1, 0.4] : 0
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        <div className="relative aspect-square overflow-hidden rounded-t-2xl">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? "brightness(1.1) saturate(1.2)" : "brightness(1) saturate(1)"
            }}
            transition={{ duration: 0.6 }}
          />

          <motion.div
            className="absolute inset-0 opacity-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute top-4 left-4"
            whileHover={{ scale: 1.05 }}
          >
            <Badge className={cn(
              "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0",
              "shadow-lg shadow-green-500/25 backdrop-blur-sm",
              "hover:shadow-green-500/40 transition-all duration-300"
            )}>
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {product.category}
              </motion.span>
            </Badge>
          </motion.div>

          <motion.div
            className="absolute top-4 right-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full bg-background/80 backdrop-blur-xl border-green-200/50",
                "hover:bg-background/90 transition-all duration-300",
                isWishlisted && "bg-red-50 hover:bg-red-100 border-red-200"
              )}
              onClick={(e) => {
                e.stopPropagation()
                setIsWishlisted(!isWishlisted)
              }}
            >
              <motion.div
                animate={{ scale: isWishlisted ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className={cn(
                  "h-5 w-5 transition-colors duration-300",
                  isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
                )} />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0"
            animate={{
              y: isHovered ? [0, 192] : 0,
              opacity: isHovered ? [0, 1, 0] : 0
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <CardContent className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <motion.h3
                className="font-bold text-lg text-foreground line-clamp-2 leading-tight"
                animate={{ color: isHovered ? "#10b981" : "inherit" }}
                transition={{ duration: 0.3 }}
              >
                {product.title}
              </motion.h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <Star
                      className={cn(
                        "h-4 w-4 transition-colors duration-300",
                        i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      )}
                    />
                  </motion.div>
                ))}
                <span className="text-xs text-muted-foreground ml-2">(4.2)</span>
              </div>
              <motion.span
                className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {product.price}
              </motion.span>
            </div>
          </div>

          <motion.div
            className="mt-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className={cn(
                "w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
                "text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-green-500/25",
                "border-0 rounded-xl transition-all duration-300 relative overflow-hidden"
              )}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: isHovered ? ["0%", "100%"] : "0%" }}
                transition={{ duration: 0.6 }}
              />

              {isAddingToCart ? (
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Adding...
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center"
                  animate={{ x: isHovered ? [0, 2, 0] : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </motion.div>
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
})


interface HeroSectionProps {
  title?: string
  description?: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
}

const HeroSection = memo(function HeroSection({
  title = "Premium Agricultural Solutions",
  description = "Discover our comprehensive range of eco-friendly fertilizers, insecticides, and pesticides designed to maximize your crop yield while protecting the environment.",
  primaryCta = {
    text: "Shop Now",
    href: "#products",
  },
  secondaryCta = {
    text: "Learn More",
    href: "#about",
  },
}: HeroSectionProps) {
  const [sampleProducts, setSampleProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setSampleProducts(data.map((p: any) => ({...p, id: p._id.toString()}))));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-12 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow variant="above" className="animate-pulse opacity-30" />
      </div>

      <SpaceWrapper className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          <motion.div 
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full text-green-700 dark:text-green-300"
            >
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Eco-Friendly Solutions</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {description}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-3 h-auto font-semibold bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a href={primaryCta.href}>
                  <Zap className="w-5 h-5 mr-2" />
                  {primaryCta.text}
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-3 h-auto font-semibold border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 transition-all duration-300"
                asChild
              >
                <a href={secondaryCta.href}>
                  {secondaryCta.text}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Mockup className="w-full max-w-md mx-auto bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AgriCare Pro</h3>
                    <p className="text-sm text-muted-foreground">Premium Solutions</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {sampleProducts.slice(0, 4).map((product, index) => (
                    <motion.div
                      key={product._id}
                      className="bg-background/50 rounded-lg p-3 border border-green-200/50"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-16 object-cover rounded mb-2"
                      />
                      <p className="text-xs font-medium text-foreground line-clamp-2">
                        {product.title}
                      </p>
                      <p className="text-xs text-green-600 font-semibold mt-1">
                        {product.price}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Mockup>
          </motion.div>
        </div>
      </SpaceWrapper>
    </section>
  )
})

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.map((p: any) => ({...p, id: p._id.toString()})));
      setFilteredProducts(data.map((p: any) => ({...p, id: p._id.toString()})));
    };
    fetchProducts();
  }, []);

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))]

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products])

  const handleAddToCart = useCallback((product: Product) => {
    console.log("Added to cart:", product)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <section id="products" className="py-16 bg-gradient-to-b from-background to-green-50/30 dark:to-green-950/30">
        <SpaceWrapper>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our <span className="text-green-600">Premium</span> Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of agricultural solutions designed for modern farming
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-400"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-green-200 focus:border-green-400">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </SpaceWrapper>
      </section>
    </div>
  )
}

    