"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
  showHeading?: boolean;
  columns?: 2 | 3 | 4;
}

/**
 * GalleryGrid - Image gallery with premium animations
 * Features:
 * - Staggered image reveal on scroll
 * - Hover effects with scale and overlay
 * - Animated lightbox with backdrop blur
 * - Accessible: respects reduced motion preferences
 */
export function GalleryGrid({
  images,
  title = "Our Work",
  subtitle = "Browse our portfolio of completed concrete projects.",
  showHeading = true,
  columns = 3,
}: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: smoothEasing,
      },
    },
  };

  // Lightbox backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.2 },
    },
  };

  // Lightbox image animation
  const lightboxImageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: smoothEasing,
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.9,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.2 },
    },
  };

  return (
    <>
      <section className="py-16 lg:py-24">
        <Container>
          {showHeading && <SectionHeading title={title} subtitle={subtitle} />}

          {/* Staggered image grid */}
          <motion.div
            className={`grid grid-cols-1 ${gridCols[columns]} gap-4 lg:gap-6`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedImage(image.src)}
                className="relative aspect-4/3 overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                variants={imageVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -5,
                        transition: { duration: 0.2 },
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {/* Image with hover zoom */}
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
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Zoom icon */}
                  <motion.div
                    className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: shouldReduceMotion ? "tween" : "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Animated Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white hover:text-accent transition-colors rounded-full bg-white/10 hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.3 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Lightbox image */}
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              variants={lightboxImageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            {/* Navigation hint */}
            <motion.p
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
            >
              Click anywhere to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
