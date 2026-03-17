"use client";

import { Button } from "@/src/components/ui/Button";
import { trackCTAClick } from "@/src/components/analytics/GoogleAnalytics";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";

interface HeroContentProps {
  title: React.ReactNode;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

/**
 * HeroContent - Client component for animated hero text and CTAs
 *
 * Separated from HeroSection to allow the background image to render
 * server-side while only the animated content requires hydration.
 * This improves LCP by reducing render delay.
 */
export function HeroContent({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroContentProps) {
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

  return (
    <>
      <motion.div
        className="max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated title with text outline for visibility */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          style={{ WebkitTextStroke: '1px #6B7280', paintOrder: 'stroke fill' }}
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
            className="bg-brand text-white hover:bg-orange/90"
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
    </>
  );
}
