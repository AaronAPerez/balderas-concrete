"use client";

import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { serviceAreas, serviceAreaRadius } from "@/src/lib/constants";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInSection, smoothEasing } from "@/src/components/ui/animations";

/**
 * ServiceAreas - Animated display of service coverage areas
 * Features:
 * - Staggered pill badge reveal animation
 * - Subtle hover effects on area badges
 * - Wave-like animation pattern for visual interest
 * - Accessible: respects reduced motion preferences
 */
export function ServiceAreas() {
  const shouldReduceMotion = useReducedMotion();

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Individual badge animation
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: smoothEasing,
      },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <Container>
        {/* Animated section heading */}
        <FadeInSection direction="up">
          <SectionHeading
            title="Areas We Serve"
            subtitle={`We service anything within ${serviceAreaRadius}. Proudly serving the greater Houston area and surrounding communities.`}
          />
        </FadeInSection>

        {/* Staggered area badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {serviceAreas.map((area, index) => (
            <motion.span
              key={area}
              variants={badgeVariants}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 },
                    }
              }
              className="px-4 py-2 bg-white rounded-full text-slate-700 border border-slate-200 text-sm font-medium shadow-sm hover:shadow-md hover:border-brand/30 transition-shadow cursor-default"
            >
              {area}, TX
            </motion.span>
          ))}
        </motion.div>

        {/* Animated footer text */}
        <FadeInSection direction="up" delay={0.3}>
          <p className="text-center text-slate-500 text-sm pt-10 max-w-lg mx-auto">
            Don&apos;t see your area? Contact us – we may still be able to help!
          </p>
        </FadeInSection>
      </Container>
    </section>
  );
}
