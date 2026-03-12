"use client";

import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { ServiceCard } from "@/src/components/features/ServiceCard";
import { services } from "@/src/lib/constants";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInSection, smoothEasing } from "@/src/components/ui/animations";

interface ServicesGridProps {
  showAll?: boolean;
  title?: string;
  subtitle?: string;
}

/**
 * ServicesGrid - Displays service offerings with staggered scroll animations
 * Features:
 * - Animated section heading that fades in
 * - Service cards with staggered reveal animation
 * - Each card scales up on hover for interactivity
 * - Accessible: respects reduced motion preferences
 */
export function ServicesGrid({
  showAll = true,
  title = "Our Concrete Services",
  subtitle = "From driveways to decorative stamped concrete, we deliver quality workmanship for every project.",
}: ServicesGridProps) {
  const displayServices = showAll ? services : services.slice(0, 6);
  const shouldReduceMotion = useReducedMotion();

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: smoothEasing,
      },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <Container>
        {/* Animated section heading */}
        <FadeInSection direction="up" delay={0}>
          <SectionHeading title={title} subtitle={subtitle} />
        </FadeInSection>

        {/* Staggered service cards grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {displayServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -5,
                      transition: { duration: 0.2 },
                    }
              }
            >
              <ServiceCard
                id={service.id}
                title={service.title}
                description={service.shortDescription}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
