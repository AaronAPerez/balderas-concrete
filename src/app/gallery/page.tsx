"use client";

import Image from "next/image";
import { Container } from "@/src/components/ui/Container";
import { GalleryGrid } from "@/src/components/features/GalleryGrid";
import { CTABanner } from "@/src/components/features/CTABanner";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing, FadeInSection } from "@/src/components/ui/animations";

// Gallery images - all project images for full gallery view
// Using .webp format for optimal performance and correct orientation
const galleryImages = [
  { src: "/images/concrete/professional-concrete-contractors-houston-tx.webp", alt: "Professional concrete contractors at work in Houston TX" },
  { src: "/images/concrete/residential-concrete-patio-installation-houston.webp", alt: "Residential concrete patio installation project in Houston" },
  { src: "/images/concrete/concrete-driveway-installation-houston-tx.webp", alt: "Concrete driveway installation project in Houston TX" },
  { src: "/images/concrete/concrete-foundation-work-houston.webp", alt: "Concrete foundation work in Houston" },
  { src: "/images/concrete/concrete-foundation-work-houston-texas.webp", alt: "Concrete foundation work in Houston, Texas" },
  { src: "/images/concrete/commercial-concrete-construction-houston.webp", alt: "Commercial concrete construction in Houston" },
  { src: "/images/concrete/stamped-concrete-work-houston-texas.webp", alt: "Stamped decorative concrete work in Houston Texas" },
  // Sesco Cement project images
  { src: "/images/concrete/sesco-cement-concrete-silo-paving-houston-tx-1.webp", alt: "Sesco Cement commercial silo and paving concrete project Houston TX" },
  { src: "/images/concrete/sesco-cement-concrete-silo-paving-houston-tx-2.webp", alt: "Sesco Cement concrete paving installation Houston Texas" },
  { src: "/images/concrete/sesco-cement-concrete-silo-paving-houston-tx-3.webp", alt: "Sesco Cement miscellaneous concrete work Houston TX" },
  { src: "/images/concrete/sesco-cement-concrete-silo-paving-houston-tx-4.webp", alt: "Sesco Cement commercial concrete construction Houston Texas" },
];

// Sesco Cement featured project images with descriptive alt text for SEO
const sescoImages = [
  { src: "/images/concrete/sesco-cement-concrete-silo-paving-houston-tx-1.webp", alt: "Sesco Cement commercial silo and paving concrete project Houston TX" },
  { src: "/images/concrete/sesco-cement-concrete-silo-paving-houston-tx-2.webp", alt: "Sesco Cement concrete paving installation Houston Texas" },
  { src: "/images/concrete/sesco-cement-concrete-silo-paving-houston-tx-3.webp", alt: "Sesco Cement miscellaneous concrete work Houston TX" },
  { src: "/images/concrete/sesco-cement-concrete-silo-paving-houston-tx-4.webp", alt: "Sesco Cement commercial concrete construction Houston Texas" },
];

/**
 * GalleryPage - Project portfolio with premium animations
 * Features:
 * - Animated hero section
 * - Featured project showcase with client/scope info
 * - Staggered image grid with hover effects
 * - Animated lightbox
 */
export default function GalleryPage() {
  const shouldReduceMotion = useReducedMotion();

  // Hero container animation — staggers children for a cascading entrance
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

  // Hero text animation — slides up and fades in
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

  // Stagger animation for the featured project image grid
  const projectGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Individual project image card — slides up on reveal
  const projectImageVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: 0.97 },
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

      {/* Featured Project — Sesco Cement */}
      {/* Displays client info, location, and scope alongside project photos */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <FadeInSection direction="up">
            {/* Section label */}
            <p className="text-brand font-semibold text-sm uppercase tracking-widest mb-3">
              Featured Project
            </p>

            {/* Project title and meta info */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Sesco Cement
                </h2>
                {/* Project detail badges */}
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-sm font-medium text-slate-700">
                    {/* Location pin icon */}
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Houston, TX
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-sm font-medium text-slate-700">
                    {/* Wrench/tools icon for scope of work */}
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Silo, Paving &amp; Misc.
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 text-sm font-medium text-brand">
                    {/* Building icon for commercial work */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Commercial
                  </span>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* 2x2 image grid for the 4 Sesco Cement project photos */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
            variants={projectGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {sescoImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-4/3 overflow-hidden rounded-xl group"
                variants={projectImageVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              >
                {/* Project photo with hover zoom effect */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { scale: 1.04, transition: { duration: 0.4, ease: smoothEasing } }
                  }
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Subtle gradient overlay at the bottom of each photo */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Full Gallery Grid - all project images with lightbox */}
      <GalleryGrid
        images={galleryImages}
        title="All Projects"
        subtitle="Our complete portfolio of concrete work across the greater Houston area."
        showHeading={true}
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
