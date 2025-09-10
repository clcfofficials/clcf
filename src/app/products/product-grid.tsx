
"use client"

import React, { useState, useEffect, memo, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Search, Filter, Leaf, Zap, Heart, ArrowRight, Star, Globe } from "lucide-react"
import type { IProduct } from "@/models/Product"
import { SpaceWrapper } from "@/components/space-wrapper"
import Link from 'next/link';

type Product = IProduct & { _id: string; id: string; };

const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <motion.div
      className="group relative w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={cn(
        "relative h-full overflow-hidden bg-background/90 backdrop-blur-xl border-0 rounded-2xl",
        "shadow-lg hover:shadow-2xl transition-all duration-700 ease-out",
        "hover:scale-[1.02] hover:rotate-1 flex flex-col"
      )}>
        <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl">
            <motion.img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
                scale: isHovered ? 1.1 : 1,
                 filter: isHovered ? "brightness(1.1) saturate(1.2)" : "brightness(1)"
            }}
            transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />
             <div className="absolute top-4 left-4" >
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
            </div>
            <div className="absolute top-4 right-4">
                 <Button
                    variant="secondary"
                    size="icon"
                    className={cn(
                        "h-10 w-10 rounded-full bg-white/20 backdrop-blur-xl border-white/30 text-white",
                        "hover:bg-white/30 transition-all duration-300",
                        isWishlisted && "bg-red-500/50 hover:bg-red-500/70 border-red-200"
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
                        isWishlisted ? "fill-white text-white" : ""
                        )} />
                    </motion.div>
                </Button>
            </div>
        </div>


        <CardContent className="p-6 relative z-10 flex flex-col flex-grow">
            <div className="flex-1 space-y-4">
            <div className="space-y-2">
                <motion.h3
                className="font-bold text-lg text-foreground line-clamp-2 leading-tight"
                animate={{ color: isHovered ? "#10b981" : "inherit" }}
                transition={{ duration: 0.3 }}
                >
                {product.title}
                </motion.h3>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {product.description}
                </p>
            </div>

            <div className="flex items-center justify-between">
                
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
            className="mt-auto pt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >
            <Button
                asChild
                className={cn(
                "w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
                "text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-green-500/25",
                "border-0 rounded-xl transition-all duration-300 relative overflow-hidden"
                )}
            >
                <Link href={`/products/${product._id}`}>
                    <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }}
                    transition={{ duration: 0.6 }}
                    />
                    <motion.div
                        className="flex items-center"
                        animate={{ x: isHovered ? [0, 2, 0] : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        View More
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.div>
                </Link>
            </Button>
            </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

interface StatItemProps {
  number: string
  label: string
  delay?: number
}

const StatItem: React.FC<StatItemProps> = ({ number, label, delay = 0 }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 200 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2"
      >
        {number}
      </motion.div>
      <p className="text-muted-foreground font-medium text-sm">{label}</p>
    </motion.div>
  )
}

const FloatingCard: React.FC<{ children: React.ReactNode; delay: number; className?: string }> = ({ children, delay, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}

const HeroSection = memo(function HeroSection() {
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
    const [particles, setParticles] = useState<{left: string, top: string}[]>([]);
  
    useEffect(() => {
      const newParticles = Array.from({ length: 12 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }));
      setParticles(newParticles);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-500/10 to-green-600/20"
          />
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400/30 rounded-full"
              animate={{
                y: [-20, -80, -20],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                left: particle.left,
                top: particle.top
              }}
            />
          ))}
        </div>

        <SpaceWrapper className='py-16'>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              style={{ opacity }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-green-400/20 to-emerald-600/20 border-green-400/30 text-green-600 backdrop-blur-sm">
                  <Leaf className="w-4 h-4 mr-2" />
                  High-Performance Agricultural Solutions
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Cultivating Excellence With Our{" "}
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Products
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Explore our comprehensive range of high-quality, eco-friendly fertilizers, insecticides, and plant growth regulators designed to maximize your crop yield.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
              >
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  Contact Sales
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="border-green-400/50 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/50 backdrop-blur-sm">
                  Our Mission
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                <StatItem number="70+" label="Total Products" delay={0} />
                <StatItem number="4" label="Categories" delay={0.1} />
                <StatItem number="100%" label="Organic" delay={0.2} />
                <StatItem number="99%" label="Success Rate" delay={0.3} />
              </motion.div>
            </motion.div>

            {/* Right Content - Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4 relative">
                <FloatingCard delay={0.2} className="col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Innovation in Every Granule</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Leading the industry with advanced nutrient delivery systems.</p>
                </FloatingCard>
                
                <FloatingCard delay={0.4}>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm text-foreground mb-1">Eco-Friendly</h4>
                    <p className="text-xs text-muted-foreground">Sustainable solutions</p>
                  </div>
                </FloatingCard>
                
                <FloatingCard delay={0.6}>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm text-foreground mb-1">Fast Results</h4>
                    <p className="text-xs text-muted-foreground">Visible crop improvement</p>
                  </div>
                </FloatingCard>
                
                <FloatingCard delay={0.8} className="col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Global Reach</h4>
                      <p className="text-sm text-muted-foreground">Serving farms in 50+ countries</p>
                    </div>
                    <Globe className="w-8 h-8 text-green-500" />
                  </div>
                </FloatingCard>
              </div>
            </motion.div>
          </div>
        </SpaceWrapper>
      </section>
    )
})

export function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

  const categories = ["all", ...Array.from(new Set(initialProducts.map(p => p.category)))];

  useEffect(() => {
    let filtered = initialProducts;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, initialProducts]);

  return (
    <>
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
                <SelectTrigger className="w-full md:w-48 border-green-200 focus:border-green-400">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-8 md:px-20"
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
                  <ProductCard product={product} />
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
      </>
  )
}
