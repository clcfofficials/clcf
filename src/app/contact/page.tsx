
"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  Clock,
  HeartHandshake,
  MessageSquare,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { SpaceWrapper } from '@/components/space-wrapper'

const ContactInfoCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-start gap-4"
  >
    <div className="mt-1 flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </div>
  </motion.div>
)

const TrustCard = ({ icon, title, description, delay = 0 }: { icon: React.ReactNode, title: string, description: string, delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Card className="relative p-8 h-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          whileHover={{ scale: 1.1, rotate: -10 }}
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
  );
};

const FloatingIcon = ({ children, className }: { children: React.ReactNode, className: string }) => {
  const [delay, setDelay] = useState(0)

  useEffect(() => {
    setDelay(Math.random() * 5)
  }, [])
  
  return (
    <motion.div
      className={`absolute text-green-400/30 dark:text-green-600/30 ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 + delay / 2 }}
      whileHover={{ scale: 1.2 }}
    >
      <motion.div
        animate={{
          y: [0, Math.random() * 20 - 10, 0],
          x: [0, Math.random() * 20 - 10, 0],
          rotate: [0, Math.random() * 20 - 10, 0],
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}


export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for getting in touch. We'll respond as soon as possible.",
      });
      (event.target as HTMLFormElement).reset();
    }, 1500);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-black dark:to-green-950 text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          {/* Mouse-following gradient */}
          <motion.div
            className="absolute h-96 w-96 bg-gradient-radial from-green-300/30 to-transparent blur-3xl"
            style={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
              opacity: 0.5,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
          />

          {/* Large animated blobs */}
          <motion.div
            className="absolute -top-40 -left-40 w-[25rem] h-[25rem] bg-emerald-400/20 rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-[25rem] h-[25rem] bg-green-400/20 rounded-full blur-3xl"
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Floating Icons */}
          <FloatingIcon className="top-[15%] left-[10%]"><Mail size={48} /></FloatingIcon>
          <FloatingIcon className="top-[25%] right-[15%]"><Phone size={40} /></FloatingIcon>
          <FloatingIcon className="bottom-[20%] left-[20%]"><Send size={44} /></FloatingIcon>
          <FloatingIcon className="bottom-[30%] right-[25%]"><MessageSquare size={52} /></FloatingIcon>
        </div>

        <SpaceWrapper>
          <motion.div 
            className="relative z-10 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium backdrop-blur-sm border border-green-200/50 dark:border-green-800/30"
                whileHover={{ scale: 1.05 }}
              >
                <MessageSquare className="w-4 h-4" />
                We are here to help
              </motion.div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
            >
              Get In Touch
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Have a question, comment, or need support? We would love to hear from you. Reach out and let us start the conversation.
            </motion.p>

             <motion.div variants={itemVariants}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </SpaceWrapper>
      </section>
      
      {/* Contact Form & Info Section */}
      <section className="py-20 -mt-24 relative z-20">
        <SpaceWrapper>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8 bg-white/30 dark:bg-black/30 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
                <h2 className="text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">We'll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="text-muted-foreground font-semibold">Full Name</Label>
                        <Input id="name" name="name" required className="mt-2 bg-white/50 dark:bg-black/50" />
                    </div>
                     <div>
                        <Label htmlFor="email" className="text-muted-foreground font-semibold">Email Address</Label>
                        <Input id="email" name="email" type="email" required className="mt-2 bg-white/50 dark:bg-black/50"/>
                    </div>
                     <div>
                        <Label htmlFor="message" className="text-muted-foreground font-semibold">Message</Label>
                        <Textarea id="message" name="message" required rows={5} className="mt-2 bg-white/50 dark:bg-black/50" />
                    </div>
                    <Button 
                        type="submit" 
                        size="lg" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="w-4 h-4 ml-2" />
                    </Button>
                </form>
              </Card>
            </motion.div>
            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 pt-10"
            >
                <ContactInfoCard icon={<Phone className="w-6 h-6"/>} title="Call Us">
                    (123) 456-7890
                </ContactInfoCard>
                <ContactInfoCard icon={<Mail className="w-6 h-6"/>} title="Email Us">
                    contact@croplifecare.com
                </ContactInfoCard>
                <ContactInfoCard icon={<MapPin className="w-6 h-6"/>} title="Our Office">
                    123 Green Valley Rd, Harvestville, AG 45678
                </ContactInfoCard>
            </motion.div>
          </div>
        </SpaceWrapper>
      </section>

      {/* Trust Assurance Section */}
      <section className="py-20 bg-gradient-to-b from-background/0 to-green-50/30 dark:to-green-950/30">
        <SpaceWrapper>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Commitment to You</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your trust is our top priority. We are dedicated to providing you with the best possible service and support.
                </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
                <TrustCard 
                    icon={<ShieldCheck className="w-6 h-6" />}
                    title="Secure Communication"
                    description="Your information is kept safe and confidential with our end-to-end encrypted communication channels."
                    delay={0}
                />
                <TrustCard 
                    icon={<Clock className="w-6 h-6" />}
                    title="Prompt Responses"
                    description="We value your time. Our team is committed to providing timely and helpful responses to all inquiries."
                    delay={0.2}
                />
                <TrustCard 
                    icon={<HeartHandshake className="w-6 h-6" />}
                    title="Dedicated Support"
                    description="Whether you have a simple question or a complex issue, our friendly support team is here to help."
                    delay={0.4}
                />
            </div>
        </SpaceWrapper>
      </section>
    </div>
  )
}
