"use client";

import Image from "next/image";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";
import { CTABanner } from "@/src/components/features/CTABanner";
import { services } from "@/src/lib/constants";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInSection, smoothEasing } from "@/src/components/ui/animations";

// SEO-optimized image mappings for each service category
// Using .webp format for images that display correctly (not sideways)
const serviceImages: Record<string, string> = {
  earthwork: "/images/concrete/stamped-concrete-work-houston-texas.webp",
  "turnkey-concrete": "/images/concrete/professional-concrete-contractors-houston-tx.jpg",
  "underground-utilities": "/images/concrete/residential-concrete-patio-installation-houston.jpg",
};

/**
 * ServicesPage - Service offerings with premium scroll animations
 * Features:
 * - Animated hero section
 * - Alternating image/text layout with directional animations
 * - Staggered feature list reveals
 * - Animated quality badges
 */
export default function ServicesPage() {
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

  // Features list stagger container
  const featuresContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  // Individual feature item animation
  const featureItemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: smoothEasing,
      },
    },
  };

  // Quality badges container
  const badgesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Individual badge animation
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: smoothEasing,
      },
    },
  };

  // Quality badges data
  const qualityBadges = [
    "Licensed & Insured",
    "Precision Surveying",
    "Code Compliance",
    "Safety First Approach",
    "Quality Materials",
    "Project Management",
  ];

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
              Our Services
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 leading-relaxed"
              variants={heroTextVariants}
            >
              Comprehensive earthwork, turnkey concrete, and underground utility
              services for commercial, industrial, and residential projects
              within 75 miles of Houston.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Services List with Alternating Animations */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => {
              // Alternate direction for visual interest
              const isEven = index % 2 === 0;
              const textDirection = isEven ? "left" : "right";
              const imageDirection = isEven ? "right" : "left";

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`scroll-mt-24 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text content */}
                  <FadeInSection
                    direction={textDirection}
                    className={!isEven ? "lg:order-2" : ""}
                  >
                    <div>
                      <h2 className="text-3xl font-bold text-brand pb-4">
                        {service.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed pb-6">
                        {service.description}
                      </p>

                      {/* Staggered feature list */}
                      <motion.ul
                        className="space-y-3 mb-8"
                        variants={featuresContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        {service.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start gap-3"
                            variants={featureItemVariants}
                          >
                            <motion.svg
                              className="w-5 h-5 text-accent shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                type: shouldReduceMotion ? "tween" : "spring",
                                stiffness: 300,
                                damping: 15,
                                delay: shouldReduceMotion ? 0 : featureIndex * 0.05,
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </motion.svg>
                            <span className="text-slate-700">{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>

                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      >
                        <Button href="/contact">Get a Quote</Button>
                      </motion.div>
                    </div>
                  </FadeInSection>

                  {/* Image with hover effect */}
                  <FadeInSection
                    direction={imageDirection}
                    className={!isEven ? "lg:order-1" : ""}
                  >
                    <motion.div
                      className="relative aspect-4/3 rounded-lg overflow-hidden shadow-lg"
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              scale: 1.02,
                              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                              transition: { duration: 0.3 },
                            }
                      }
                    >
                      <Image
                        src={serviceImages[service.id]}
                        alt={`${service.title} by Balderas Concrete`}
                        fill
                        className="object-cover transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </FadeInSection>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Quality Section with Animated Badges */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <FadeInSection direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-brand pb-6">
                Professional Standards & Expert Execution
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                We bring industry-leading expertise to every project, from site
                preparation to final completion. Our team follows strict quality
                standards and safety protocols to deliver results that exceed
                expectations.
              </p>
            </div>
          </FadeInSection>

          {/* Staggered quality badges */}
          <motion.div
            className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8"
            variants={badgesContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {qualityBadges.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 justify-center text-slate-700"
                variants={badgeVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }
                }
              >
                <motion.svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ rotate: -180, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0.1 : 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    ease: smoothEasing,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <CTABanner
        title="Ready to Start Your Project?"
        subtitle="Contact us today for an estimate. We'll discuss your needs and provide a detailed quote."
      />
    </>
  );
}
