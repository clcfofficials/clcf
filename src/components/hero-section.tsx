
"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Moon, Sun, Leaf, Sprout, TreePine, Wheat, ArrowRight, Droplets, Sun as SunIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  features?: string[]
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Nourishing Soil, Enriching Life",
  subtitle = "Sustainable Fertilizers for a Bountiful Yield",
  description = "Transform your agricultural potential with our advanced fertilizer solutions. Engineered for optimal plant growth, sustainable farming, and maximum yield productivity.",
  primaryButtonText = "Explore Products",
  secondaryButtonText = "Learn More",
  features = ["Organic Solutions", "Fast Growth", "Eco-Friendly", "Premium Quality"]
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-100 dark:from-gray-900 dark:via-green-950 dark:to-emerald-900 transition-all duration-700 relative overflow-hidden`}>
      {/* Floating Plant Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated leaves */}
        <motion.div
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-green-400/30 dark:text-green-300/20"
        >
          <Leaf size={48} />
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, -25, 0], 
            y: [0, 15, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-16 text-emerald-400/25 dark:text-emerald-300/15"
        >
          <Sprout size={56} />
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -30, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-1/4 text-lime-400/20 dark:text-lime-300/10"
        >
          <TreePine size={64} />
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, -15, 0], 
            y: [0, 25, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-40 right-1/4 text-green-400/25 dark:text-green-300/15"
        >
          <Wheat size={52} />
        </motion.div>
      </div>

      {/* Background Organic Shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 dark:bg-green-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-lime-200 dark:bg-lime-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-emerald-200 dark:bg-emerald-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-teal-200 dark:bg-teal-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Organic Growth Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(34 197 94) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16 pt-20 md:pt-32">
            <motion.div variants={itemVariants} className="mb-6">
              <Badge 
                variant="outline" 
                className="bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 border-green-300 dark:border-green-600 px-4 py-2 text-sm font-medium shadow-sm"
              >
                <Leaf className="w-4 h-4 mr-2" />
                100% Organic
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="pb-2 text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 dark:from-green-400 dark:via-emerald-400 dark:to-lime-400 bg-clip-text text-transparent mb-6 leading-tight"
            >
              {title}
            </motion.h1>

            <motion.h2 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-8"
            >
              {subtitle}
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:rotate-1"
              >
                <Link href="/products">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/50 px-8 py-6 text-lg font-semibold transition-all duration-500 hover:scale-105"
              >
                <Link href="/about">
                  {secondaryButtonText}
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => {
              const icons = [Leaf, Sprout, Droplets, TreePine]
              const Icon = icons[index % icons.length]
              
              return (
                <motion.div
                  key={feature}
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-green-200 dark:border-green-700 hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-rotate-1 group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/60 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/70 transition-colors duration-300">
                        <Icon className="h-6 w-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{feature}</span>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}

    