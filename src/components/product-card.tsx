
"use client"

import React, { useState, memo, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Zap, Star, Heart } from "lucide-react"

type Product = {
    _id: string;
    id: string;
    title: string;
    description: string;
    price: string;
    category: string;
    image: string;
    featured?: boolean;
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export const ProductCard = memo(function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleViewMore = useCallback(async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setIsLoading(false)
    console.log("View more:", product)
  }, [product])

  return (
    <motion.div
      className="group relative h-[520px] w-full"
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
        "relative h-full overflow-hidden bg-background/95 backdrop-blur-2xl border-0 rounded-3xl",
        "shadow-2xl hover:shadow-[0_20px_80px_rgba(16,185,129,0.2)] transition-all duration-1000 ease-out",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/8 before:via-emerald-500/12 before:to-teal-500/8",
        "after:absolute after:inset-0 after:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(16,185,129,0.06),transparent_40%)]",
        "hover:scale-[1.03] hover:rotate-2 group-hover:z-10"
      )}>
        <motion.div
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-0"
          style={{
            background: "conic-gradient(from 0deg, rgba(34,197,94,0.6), rgba(16,185,129,0.4), rgba(20,184,166,0.6), rgba(34,197,94,0.6))"
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 0,
            rotate: isHovered ? 360 : 0
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        <motion.div
          className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-0"
          style={{
            background: "radial-gradient(circle, rgba(20,184,166,0.5), rgba(16,185,129,0.3), transparent 70%)"
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? -180 : 0
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />

        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
              style={{
                left: `${15 + (i * 7)}%`,
                top: `${25 + (i * 4)}%`,
                filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.8))'
              }}
              animate={{
                y: isHovered ? [-15, 15, -15] : 0,
                x: isHovered ? [-8, 8, -8] : 0,
                opacity: isHovered ? [0.3, 1, 0.3] : 0,
                scale: isHovered ? [0.8, 1.2, 0.8] : 0
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/60 to-transparent"
              style={{ top: `${20 + i * 15}%` }}
              animate={{
                x: isHovered ? ["-100%", "100%"] : "-100%",
                opacity: isHovered ? [0, 1, 0] : 0
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        <div className="relative aspect-square h-56 overflow-hidden rounded-t-2xl">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            animate={{ 
              scale: isHovered ? 1.15 : 1,
              filter: isHovered ? "brightness(1.2) saturate(1.3) contrast(1.1)" : "brightness(1) saturate(1)"
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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

        <CardContent className="p-8 relative z-10 flex flex-col h-[256px]">
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <motion.h3 
                className="font-bold text-xl text-foreground line-clamp-2 leading-tight"
                animate={{ 
                  color: isHovered ? "#10b981" : "inherit",
                  textShadow: isHovered ? "0 0 20px rgba(16, 185, 129, 0.3)" : "none"
                }}
                transition={{ duration: 0.4 }}
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
                    whileHover={{ scale: 1.2, rotate: 15 }}
                  >
                    <Star
                      className={cn(
                        "h-4 w-4 transition-all duration-300",
                        i < 4 ? "fill-yellow-400 text-yellow-400 drop-shadow-sm" : "text-gray-300"
                      )}
                    />
                  </motion.div>
                ))}
                <span className="text-xs text-muted-foreground ml-3 font-medium">(4.2)</span>
              </div>
              <motion.span 
                className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent"
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  filter: isHovered ? "drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))" : "none"
                }}
                transition={{ duration: 0.4 }}
              >
                {product.price}
              </motion.span>
            </div>
          </div>

          <motion.div
            className="mt-auto"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              className={cn(
                "w-full h-14 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700",
                "hover:from-green-700 hover:via-emerald-700 hover:to-green-800",
                "text-white font-bold text-lg shadow-xl hover:shadow-2xl",
                "border-0 rounded-2xl transition-all duration-500 relative overflow-hidden",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
                "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              )}
              onClick={handleViewMore}
              disabled={isLoading}
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)'
                }}
                animate={{
                  backgroundSize: isHovered ? ['20px 20px', '30px 30px'] : '20px 20px'
                }}
                transition={{ duration: 0.5 }}
              />
              
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-2xl"
                animate={{
                  scale: isHovered ? [1, 1.02, 1] : 1,
                  opacity: isHovered ? [0, 0.3, 0] : 0
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {isLoading ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Loading...</span>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center justify-center relative z-10"
                  animate={{ x: isHovered ? [0, 3, 0] : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    animate={{ rotate: isHovered ? 15 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Zap className="w-6 h-6 mr-3" />
                  </motion.div>
                  <span className="tracking-wide">View More</span>
                </motion.div>
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
})
