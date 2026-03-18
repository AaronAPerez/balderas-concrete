"use client";

import { Container } from "@/src/components/ui/Container";
import { GalleryGrid } from "@/src/components/features/GalleryGrid";
import { CTABanner } from "@/src/components/features/CTABanner";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing, FadeInSection } from "@/src/components/ui/animations";

// Gallery images - all 6 project images for full gallery view
// Using .webp format for images that display correctly (not sideways)
const galleryImages = [
  { src: "/images/concrete/professional-concrete-contractors-houston-tx.jpg", alt: "Professional concrete contractors at work in Houston TX" },
  { src: "/images/concrete/residential-concrete-patio-installation-houston.jpg", alt: "Residential concrete patio installation project in Houston" },
  { src: "/images/concrete/concrete-driveway-installation-houston-tx.webp", alt: "Concrete driveway installation project in Houston TX" },
  { src: "/images/concrete/concrete-foundation-work-houston.webp", alt: "Concrete foundation work in Houston" },
  { src: "/images/concrete/commercial-concrete-construction-houston.webp", alt: "Commercial concrete construction in Houston" },
  { src: "/images/concrete/stamped-concrete-work-houston-texas.webp", alt: "Stamped decorative concrete work in Houston Texas" },
];

/**
 * GalleryPage - Project portfolio with premium animations
 * Features:
 * - Animated hero section
 * - Staggered image grid with hover effects
 * - Animated lightbox
 */
export default function GalleryPage() {
  const shouldReduceMotion = useReducedMotion();

  // Hero container animation
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Hero text animation
  const heroTextVariants = {
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

  return (
    <>
      {/* Animated Hero Section */}
      <section className="relative py-8 lg:py-16 bg-brand overflow-hidden">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-white pb-6"
              variants={heroTextVariants}
            >
              Our Work
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 leading-relaxed"
              variants={heroTextVariants}
            >
              Browse our portfolio of completed concrete projects throughout the
              greater Houston area.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Gallery Grid - animations handled by the component */}
      <GalleryGrid
        images={galleryImages}
        showHeading={false}
        columns={3}
      />

      {/* More Projects Coming - Animated */}
      <section className="py-12 bg-slate-50">
        <Container>
          <FadeInSection direction="up">
            <motion.p
              className="text-center text-slate-600"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }
              }
            >
              More project photos coming soon! Contact us to see additional examples of our work.
            </motion.p>
          </FadeInSection>
        </Container>
      </section>

      <CTABanner
        title="Like What You See?"
        subtitle="Let us create something beautiful for your property. Contact us for an estimate."
      />
    </>
  );
}
