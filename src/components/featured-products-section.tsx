
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Sprout, Bug, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SectionHeader } from './section-header';
import Link from 'next/link';

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  productCount: number;
  features: string[];
}

interface FertilizerProductsSectionProps {
  onCtaClick?: () => void;
  categories?: ProductCategory[];
}

const defaultCategories: ProductCategory[] = [
  {
    id: 'fungicide',
    name: 'Fungicides',
    description: 'Protect your crops from fungal diseases with our advanced fungicide solutions.',
    icon: <Shield className="h-10 w-10" />,
    productCount: 24,
    features: ['Disease Prevention', 'Crop Protection', 'Long-lasting Effect']
  },
  {
    id: 'insecticides',
    name: 'Insecticides',
    description: 'Effective pest control solutions to safeguard your agricultural investments.',
    icon: <Bug className="h-10 w-10" />,
    productCount: 32,
    features: ['Pest Control', 'Safe Application', 'Quick Action']
  },
  {
    id: 'plant-growth-regulator',
    name: 'Plant Growth Regulators',
    description: 'Enhance plant development and optimize growth patterns naturally.',
    icon: <Sprout className="h-10 w-10" />,
    productCount: 18,
    features: ['Growth Enhancement', 'Yield Optimization', 'Natural Development']
  }
];

export const FertilizerProductsSection: React.FC<FertilizerProductsSectionProps> = ({
  categories = defaultCategories
}) => {
  const router = useRouter();

  const handleCtaClick = () => {
    router.push('/products');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50/30 via-background to-emerald-50/20 dark:from-green-950/10 dark:via-background dark:to-emerald-950/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 dark:bg-green-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-teal-200/10 dark:bg-teal-800/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <SectionHeader 
            icon={Leaf}
            badgeLabel='Our Products'
            title='Premium Fertilizer Products'
            description='Discover our comprehensive range of agricultural solutions designed to maximize your crop yield and protect your investment.'
        />

        <div className="text-center mb-16 -mt-8">
            <Button asChild size="lg">
                <Link href="/products">View All Products <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </div>


        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-border hover:border-green-300 dark:hover:border-green-700 cursor-pointer transform hover:-translate-y-2 hover:scale-105 bg-gradient-to-br from-green-50/50 to-white dark:from-green-950/20 dark:to-background p-0 flex flex-col"
              onClick={handleCtaClick}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/5 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/30 text-green-600 dark:text-green-400 group-hover:from-green-200 group-hover:to-green-300 dark:group-hover:from-green-800/60 dark:group-hover:to-green-700/40 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                    {category.icon}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 font-medium group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors duration-300">
                    {category.productCount} Products
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 flex-grow flex flex-col">
                <CardDescription className="text-muted-foreground mb-6 leading-relaxed text-base">
                  {category.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <Badge 
                      key={featureIndex} 
                      variant="outline" 
                      className="text-sm border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
                      style={{
                        animationDelay: `${(index * 150) + (featureIndex * 100)}ms`,
                        animation: 'slideInFromLeft 0.4s ease-out forwards'
                      }}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-end mt-auto">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 group/btn transition-all duration-300"
                  >
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 rounded-3xl p-8 sm:p-12 border border-green-200/50 dark:border-green-800/50 shadow-xl backdrop-blur-sm relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-emerald-400/5 to-teal-400/5 animate-pulse" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Ready to Boost Your Crop Yield?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
              Explore our complete product catalog and find the perfect fertilizer solutions for your specific agricultural needs.
            </p>
            <Button 
              onClick={handleCtaClick}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold group rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110"
            >
              Browse All Products
              <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
