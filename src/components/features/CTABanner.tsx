"use client";

import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { contactInfo } from "@/src/lib/constants";
import { trackPhoneClick, trackCTAClick } from "@/src/components/analytics/GoogleAnalytics";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  showPhone?: boolean;
}

/**
 * CTABanner - Animated call-to-action section
 * Features:
 * - Fade in animation on scroll
 * - Staggered text and button reveals
 * - Subtle hover effects on phone link
 * - Accessible: respects reduced motion preferences
 */
export function CTABanner({
  title = "Ready to Start Your Project?",
  subtitle = "Request an estimate today. We'll help bring your vision to life with quality concrete work.",
  showPhone = true,
}: CTABannerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Text animation
  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: smoothEasing,
      },
    },
  };

  // Button container animation
  const buttonVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
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
    <section className="py-20 lg:py-24 bg-concrete-dark overflow-hidden">
      <Container>
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Animated title */}
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white"
            variants={textVariants}
          >
            {title}
          </motion.h2>

          {/* Animated subtitle */}
          <motion.p
            className="pt-5 text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto"
            variants={textVariants}
          >
            {subtitle}
          </motion.p>

          {/* Animated CTA buttons */}
          <motion.div
            className="pt-10 flex flex-col sm:flex-row gap-5 justify-center items-center"
            variants={buttonVariants}
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Button
                href="/contact"
                size="lg"
                onClick={() => trackCTAClick("Get an Estimate", "cta-banner")}
              >
                Get an Estimate
              </Button>
            </motion.div>

            {showPhone && (
              <motion.a
                href={`tel:${contactInfo.phoneRaw}`}
                className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors text-lg font-medium min-h-11"
                onClick={() => trackPhoneClick("cta-banner")}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        x: 3,
                        transition: { duration: 0.2 },
                      }
                }
              >
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          rotate: [0, -10, 10, -10, 0],
                        }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </motion.svg>
                <span>{contactInfo.phone}</span>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
