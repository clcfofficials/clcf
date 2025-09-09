"use client"

import React, { useState, memo, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ShoppingCart, Star, Heart } from "lucide-react"

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

        <div className="relative aspect-square h-48 overflow-hidden rounded-t-2xl">
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

        <CardContent className="p-6 relative z-10 flex flex-col h-[232px]">
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
