"use client";

import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { processSteps } from "@/src/lib/constants";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInSection, smoothEasing } from "@/src/components/ui/animations";

/**
 * ProcessSteps - Animated 4-step process visualization
 * Features:
 * - Sequential reveal animation as steps appear one by one
 * - Animated connector lines between steps
 * - Number circles scale in with spring animation
 * - Accessible: respects reduced motion preferences
 */
export function ProcessSteps() {
  const shouldReduceMotion = useReducedMotion();

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Individual step animation
  const stepVariants = {
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

  // Number circle animation with spring
  const numberVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: shouldReduceMotion
        ? { type: "tween" as const, duration: 0.1 }
        : { type: "spring" as const, stiffness: 200, damping: 15 },
    },
  };

  // Connector line animation
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: smoothEasing,
        delay: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-[#6B6B6B]/10">
      <Container>
        {/* Animated section heading */}
        <FadeInSection direction="up">
          <SectionHeading
            title="How We Work"
            subtitle="Our simple 4-step process ensures a smooth experience from start to finish."
          />
        </FadeInSection>

        {/* Animated process steps grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {processSteps.map((step, index) => (
            <motion.div key={step.step} className="relative" variants={stepVariants}>
              {/* Animated connector line (hidden on mobile and for last item) */}
              {index < processSteps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-300 -translate-x-1/2 origin-left"
                  variants={lineVariants}
                />
              )}

              <div className="text-center">
                {/* Animated number circle */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white text-2xl font-bold mb-5"
                  variants={numberVariants}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }
                  }
                >
                  {step.step}
                </motion.div>

                {/* Step title */}
                <h3 className="text-lg font-semibold text-brand mb-3">
                  {step.title}
                </h3>

                {/* Step description */}
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
