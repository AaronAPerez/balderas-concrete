"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import type { Easing } from "framer-motion";
import { ReactNode } from "react";

/**
 * Animation variants for reusable motion effects
 * These create premium, smooth animations throughout the site
 */

// Premium cubic-bezier easing for smooth, professional animations
// This easing provides a subtle ease-out feel similar to Material Design
export const smoothEasing: Easing = [0.25, 0.46, 0.45, 0.94];

// Fade in from bottom - great for section content
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEasing },
  },
};

// Fade in from left - for alternating content
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: smoothEasing },
  },
};

// Fade in from right - for alternating content
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: smoothEasing },
  },
};

// Simple fade - for subtle reveals
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEasing },
  },
};

// Scale up - for cards and interactive elements
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: smoothEasing },
  },
};

// Stagger container - orchestrates child animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger container with longer delay - for process steps
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Hero text animation - dramatic entrance
export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEasing,
    },
  },
};

// Hero button animation
export const heroButtonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEasing,
    },
  },
};

// Number counter animation for stats
export const numberVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

/**
 * FadeInSection - Scroll-triggered fade animation wrapper
 * Wraps content to animate when it enters the viewport
 */
interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

export function FadeInSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
}: FadeInSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Determine initial position based on direction
  const getInitialPosition = () => {
    if (shouldReduceMotion) return { opacity: 0 };

    switch (direction) {
      case "up":
        return { opacity: 0, y: 30 };
      case "down":
        return { opacity: 0, y: -30 };
      case "left":
        return { opacity: 0, x: -40 };
      case "right":
        return { opacity: 0, x: 40 };
      case "none":
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: smoothEasing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerChildren - Container that staggers child animations
 * Children should use motion components with variants
 */
interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.1,
  delayChildren = 0.1,
  once = true,
  amount = 0.2,
}: StaggerChildrenProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
            delayChildren: shouldReduceMotion ? 0 : delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedCard - Card with hover and entrance animations
 */
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  index?: number;
}

export function AnimatedCard({
  children,
  className = "",
  hoverScale = 1.02,
  index = 0,
}: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: shouldReduceMotion ? 0 : index * 0.1,
            ease: smoothEasing,
          },
        },
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: hoverScale,
              transition: { duration: 0.2 },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxSection - Creates subtle parallax scrolling effect
 */
interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
}: ParallaxSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: speed * -20 }}
      viewport={{ once: false }}
      transition={{ duration: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedCounter - Animated number counter for stats
 */
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0.1 : duration }}
      >
        {value}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

// Re-export motion for convenience
export { motion };
