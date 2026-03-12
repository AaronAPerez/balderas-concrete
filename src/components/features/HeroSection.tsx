"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { trackCTAClick } from "@/src/components/analytics/GoogleAnalytics";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";
import blurPlaceholders from "@/src/data/blur-placeholders.json";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

/**
 * Gets blur data URL for image placeholder
 * Provides smooth loading experience while image loads
 */
function getBlurDataUrl(imagePath: string): string | undefined {
  const fileName = imagePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
  return fileName ? blurPlaceholders[fileName as keyof typeof blurPlaceholders] : undefined;
}

/**
 * HeroSection - Full-width hero with animated text and CTAs
 * Features:
 * - Background image with dark gradient overlay
 * - Animated title, subtitle, and buttons on page load
 * - Accessible: respects reduced motion preferences
 * - Mobile-responsive layout
 */
export function HeroSection({
  title,
  subtitle,
  backgroundImage = "/images/concrete/1000035716.jpg",
  primaryCta = { text: "Get an Estimate", href: "/contact" },
  secondaryCta = { text: "View Our Work", href: "/gallery" },
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: smoothEasing,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: smoothEasing,
      },
    },
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: smoothEasing,
      },
    },
  };

  // Background image scale animation for subtle parallax effect
  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 1.2,
        ease: smoothEasing,
      },
    },
  };

  return (
    <section className="relative min-h-150 lg:min-h-175 flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src={backgroundImage}
          alt="Professional concrete work"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
          placeholder="blur"
          blurDataURL={getBlurDataUrl(backgroundImage)}
        />
        {/* Dark overlay gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.50) 100%)'
          }}
        />
      </motion.div>

      {/* Animated content */}
      <Container className="relative z-10 py-20 lg:py-28">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-md leading-tight"
            variants={titleVariants}
          >
            {title}
          </motion.h1>

          {/* Animated subtitle */}
          <motion.p
            className="pt-6 text-lg sm:text-xl text-slate-100 leading-relaxed max-w-xl"
            variants={subtitleVariants}
          >
            {subtitle}
          </motion.p>

          {/* Animated CTA buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            variants={buttonContainerVariants}
          >
            <Button
              href={primaryCta.href}
              size="lg"
              className="bg-orange text-white hover:bg-orange/90"
              onClick={() => trackCTAClick(primaryCta.text, "hero")}
            >
              {primaryCta.text}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange"
              onClick={() => trackCTAClick(secondaryCta.text, "hero")}
            >
              {secondaryCta.text}
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 1.2,
          duration: 0.5,
        }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
