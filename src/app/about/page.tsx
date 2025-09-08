
"use client"

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Target, 
  Eye, 
  Building2, 
  Shield, 
  Award, 
  Clock, 
  Users, 
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Leaf,
  Star,
  Zap,
  Heart,
  Globe
} from 'lucide-react'
import { SpaceWrapper } from '@/components/space-wrapper'
import { ThemeToggle } from '@/components/theme-toggle'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

interface StatItemProps {
  number: string
  label: string
  delay?: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Card className="relative p-8 h-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg"
        >
          {icon}
        </motion.div>
        <h3 className="relative text-lg font-bold text-foreground mb-3 group-hover:text-green-500 transition-colors duration-300">
          {title}
        </h3>
        <p className="relative text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  )
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

export default function AboutUsPage() {
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


  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trusted Excellence",
      description: "Over 10,000+ satisfied customers worldwide trust our innovative solutions and commitment to quality."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Quality",
      description: "We maintain the highest standards in everything we do, ensuring exceptional results in every project."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "15+ Years Experience",
      description: "With over a decade of industry expertise, we bring unmatched knowledge to every challenge."
    }
  ]

  const milestones = [
    { year: "2008", title: "Company Founded", description: "Started with a vision to revolutionize the industry", icon: <Building2 className="w-5 h-5" /> },
    { year: "2012", title: "Global Expansion", description: "Expanded operations across multiple continents", icon: <Globe className="w-5 h-5" /> },
    { year: "2018", title: "Innovation Award", description: "Recognized for groundbreaking sustainable practices", icon: <Award className="w-5 h-5" /> },
    { year: "2024", title: "Future Forward", description: "Leading with cutting-edge AI technology", icon: <Zap className="w-5 h-5" /> }
  ]

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-black dark:to-green-950 text-foreground overflow-hidden">
      {/* Hero Section */}
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

        <SpaceWrapper>
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
                  Sustainable Innovation
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                About{" "}
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Our Story
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                We're passionate innovators dedicated to creating sustainable solutions that make a positive impact on the world. Our journey began with a simple idea: technology should serve humanity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
              >
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  Learn More
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
                <StatItem number="10K+" label="Happy Clients" delay={0} />
                <StatItem number="15+" label="Years Experience" delay={0.1} />
                <StatItem number="50+" label="Team Members" delay={0.2} />
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
                    <h3 className="font-semibold text-foreground">Innovation First</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Leading the industry with cutting-edge solutions</p>
                </FloatingCard>
                
                <FloatingCard delay={0.4}>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm text-foreground mb-1">Customer Love</h4>
                    <p className="text-xs text-muted-foreground">98% satisfaction rate</p>
                  </div>
                </FloatingCard>
                
                <FloatingCard delay={0.6}>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm text-foreground mb-1">Fast Results</h4>
                    <p className="text-xs text-muted-foreground">Lightning quick delivery</p>
                  </div>
                </FloatingCard>
                
                <FloatingCard delay={0.8} className="col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Global Reach</h4>
                      <p className="text-sm text-muted-foreground">Serving 50+ countries worldwide</p>
                    </div>
                    <Globe className="w-8 h-8 text-green-500" />
                  </div>
                </FloatingCard>
              </div>
            </motion.div>
          </div>
        </SpaceWrapper>
      </section>

      {/* Mission, Vision & Background */}
      <section className="py-20 relative">
        <SpaceWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Foundation</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on strong values and a clear vision for the future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={<Target className="w-6 h-6" />}
              title="Our Mission"
              description="To empower businesses with innovative, sustainable technology solutions that drive growth while protecting our environment."
              delay={0}
            />
            <FeatureCard
              icon={<Eye className="w-6 h-6" />}
              title="Our Vision"
              description="To be the global leader in sustainable technology, creating a world where innovation and responsibility unite."
              delay={0.2}
            />
            <FeatureCard
              icon={<Building2 className="w-6 h-6" />}
              title="Our Background"
              description="Founded by industry veterans, we've grown from a startup to a trusted global partner for businesses worldwide."
              delay={0.4}
            />
          </div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-12">Our Journey</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <Card className="p-6 h-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-green-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                        {milestone.icon}
                      </div>
                      <Badge variant="outline" className="border-green-400/50 text-green-600 bg-green-50/50 dark:bg-green-950/50">
                        {milestone.year}
                      </Badge>
                    </div>
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-green-500 transition-colors">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SpaceWrapper>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative bg-gradient-to-b from-background to-green-50/30 dark:to-green-950/30">
        <SpaceWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Choose Us?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine trust, quality, and experience to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.2}
              />
            ))}
          </div>

          {/* What Sets Us Apart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                What Sets Us Apart
              </h3>
              <div className="space-y-4">
                {[
                  "24/7 dedicated customer support",
                  "Cutting-edge technology solutions",
                  "Sustainable and eco-friendly practices",
                  "Proven track record of success",
                  "Transparent pricing and processes",
                  "Continuous innovation and improvement"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-br from-green-400/10 via-emerald-500/5 to-green-600/10 backdrop-blur-xl border border-green-400/20 shadow-2xl">
                <div className="text-center">
                  <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-3">Join Our Community</h4>
                  <p className="text-muted-foreground mb-6">
                    Become part of a growing community of forward-thinking businesses.
                  </p>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0">
                    Get Started Today
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </SpaceWrapper>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative bg-gradient-to-b from-green-50/30 to-background dark:from-green-950/30 dark:to-background">
        <SpaceWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from the companies that trust us
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO at TechFlow",
                avatar: "SJ",
                content: "Working with this team has been transformative for our business. Their innovative solutions helped us increase efficiency by 300%.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "CTO at DataVision",
                avatar: "MC",
                content: "The sustainable approach they bring to every project is exactly what our industry needs. Exceptional quality and service.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Founder at GreenTech",
                avatar: "ER",
                content: "Their expertise in sustainable technology is unmatched. They delivered beyond our expectations and on time.",
                rating: 5
              },
              {
                name: "David Kumar",
                role: "Director at InnovaCorp",
                avatar: "DK",
                content: "Outstanding support and cutting-edge solutions. They've been instrumental in our digital transformation journey.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="p-6 h-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-green-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-green-500 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-green-400 text-green-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </SpaceWrapper>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <SpaceWrapper>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Lightbulb className="w-12 h-12 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Innovate</span> Together?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's create something amazing together. Join us in building a sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="border-green-400/50 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/50">
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </SpaceWrapper>
      </section>
    </div>
  )
}
