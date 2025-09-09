
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Shield, 
  Award, 
  Users,
  ArrowRight,
  Star
} from "lucide-react";
import { SpaceWrapper } from "@/components/space-wrapper";
import emailjs from "@emailjs/browser";

const ContactUsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    if (!form.current) {
        setIsSubmitting(false);
        setStatus("❌ An error occurred. Please try again.");
        return;
    }

    emailjs
      .sendForm(
        "service_kbr80o6",
        "template_6e2yvcd",
        form.current,
        { publicKey: "lmzyqBVXfcugasGlY" }
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          form.current?.reset();
        },
        (error) => {  
          setStatus(`❌ Failed to send. ${error.text}`);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const trustFeatures = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in customer service"
    },
    {
      icon: Users,
      title: "Trusted by 10k+",
      description: "Join thousands of satisfied customers worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-background to-green-50 dark:from-green-950/20 dark:via-background dark:to-green-950/20"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={isLoaded ? { opacity: 0.1, scale: 1, x: 0 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-20 left-10 w-96 h-96 rounded-full bg-green-500 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={isLoaded ? { opacity: 0.1, scale: 1, x: 0 } : {}}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-emerald-500 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 0.05, scale: 1 } : {}}
            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-400 blur-3xl"
          />
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10"
        >
          <SpaceWrapper>
            <div className="text-center">
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-8"
                >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    We're here to help
                </span>
                </motion.div>

                <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent"
                >
                Get in Touch
                </motion.h1>

                <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
                >
                Ready to transform your ideas into reality? Let's start a conversation 
                and explore how we can help you achieve your goals.
                </motion.p>

                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex flex-wrap gap-4 justify-center"
                >
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white group">
                    Start Conversation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-950/30">
                    View Our Work
                </Button>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
                >
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 border-2 border-background" />
                    ))}
                    </div>
                    <span>Trusted by 10,000+ customers</span>
                </div>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-1">4.9/5 rating</span>
                </div>
                </motion.div>
            </div>
          </SpaceWrapper>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-green-300 dark:border-green-700 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-green-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-background to-green-50/30 dark:to-green-950/10">
        <SpaceWrapper>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">
                  Let's Connect
                </h2>
                <p className="text-lg text-muted-foreground">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700 dark:text-green-300">Email</h3>
                    <p className="text-muted-foreground">contact@croplifecare.com</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700 dark:text-green-300">Phone</h3>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700 dark:text-green-300">Address</h3>
                    <p className="text-muted-foreground">123 Green Valley Rd, Harvestville, AG 45678</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-green-200 dark:border-green-800 shadow-lg">
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-green-700 dark:text-green-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      className="mt-2 border-green-200 dark:border-green-800 focus:border-green-500 focus:ring-green-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-green-700 dark:text-green-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="mt-2 border-green-200 dark:border-green-800 focus:border-green-500 focus:ring-green-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-green-700 dark:text-green-300">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      className="mt-2 min-h-[120px] border-green-200 dark:border-green-800 focus:border-green-500 focus:ring-green-500"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white group"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                   {status && <p className="mt-3 text-center text-sm">{status}</p>}
                </form>
              </Card>
            </motion.div>
          </div>
        </SpaceWrapper>
      </section>

      {/* Trust Assurance Section */}
      <section className="py-20 bg-green-50 dark:bg-green-950/10">
        <SpaceWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              Trusted & Reliable
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">
              Why Choose Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing exceptional service and building lasting relationships with our clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-700 dark:text-green-300 font-medium">
                24/7 Support Available
              </span>
            </div>
          </motion.div>
        </SpaceWrapper>
      </section>
    </div>
  );
};

export default ContactUsPage;
