"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { Button } from "@/src/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInSection, smoothEasing } from "@/src/components/ui/animations";
import blurPlaceholders from "@/src/data/blur-placeholders.json";

/**
 * Gets blur data URL for image placeholder
 * Provides smooth loading experience while image loads
 */
function getBlurDataUrl(imagePath: string): string | undefined {
  const fileName = imagePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
  return fileName ? blurPlaceholders[fileName as keyof typeof blurPlaceholders] : undefined;
}

// Preview images for the gallery section - all 6 project images
// Using .webp format for images that display correctly (not sideways)
const previewImages = [
  { src: "/images/concrete/residential-concrete-patio-installation-houston.webp", alt: "Residential concrete patio installation in Houston" },
  { src: "/images/concrete/concrete-driveway-installation-houston-tx.webp", alt: "Concrete driveway installation project in Houston TX" },
  // { src: "/images/concrete/professional-concrete-contractors-houston-tx.webp", alt: "Professional concrete contractors at work in Houston TX" },
  { src: "/images/concrete/concrete-foundation-work-houston.webp", alt: "Concrete foundation work in Houston" },
  { src: "/images/concrete/concrete-foundation-work-houston-texas.webp", alt: "Concrete foundation work in Houston, Texas" },
  { src: "/images/concrete/commercial-concrete-construction-houston.webp", alt: "Commercial concrete construction in Houston" },
  { src: "/images/concrete/stamped-concrete-work-houston-texas.webp", alt: "Stamped decorative concrete work in Houston Texas" },
];

/**
 * GalleryPreview - Showcase recent projects with animated image grid
 * Features:
 * - Staggered image reveal animations
 * - Hover effects with scale and overlay
 * - Image clip-path reveal for premium feel
 * - Accessible: respects reduced motion preferences
 */
export function GalleryPreview() {
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

  // Individual image card animation
  const imageVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: smoothEasing,
      },
    },
  };

  // Button animation
  const buttonVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        delay: shouldReduceMotion ? 0 : 0.4,
        ease: smoothEasing,
      },
    },
  };

  return (
    <section className="py-20 lg:py-28">
      <Container>
        {/* Animated section heading */}
        <FadeInSection direction="up">
          <SectionHeading
            title="Recent Projects"
            subtitle="See the quality of our work in these recent concrete projects."
          />
        </FadeInSection>

        {/* Staggered image grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {previewImages.map((image, index) => (
            <motion.div key={index} variants={imageVariants}>
              <Link
                href="/gallery"
                className="relative aspect-4/3 overflow-hidden rounded-lg group block"
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: 1.05,
                          transition: { duration: 0.4, ease: smoothEasing },
                        }
                  }
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataUrl(image.src)}
                  />
                </motion.div>

                {/* Animated overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* View icon on hover */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-brand"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated CTA button */}
        <motion.div
          className="text-center"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button href="/gallery" variant="secondary">
            View All Projects
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
