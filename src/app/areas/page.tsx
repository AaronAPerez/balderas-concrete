"use client";

import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { CTABanner } from "@/src/components/features/CTABanner";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";
import { cityData, getAllCitySlugs } from "@/src/lib/serviceAreaData";
import { serviceAreaRadius } from "@/src/lib/constants";

/**
 * ServiceAreasPage - Index of all service areas
 * Features:
 * - Grid of all cities we serve
 * - Links to individual city pages for local SEO
 * - Map placeholder for future implementation
 */
export default function ServiceAreasPage() {
  const shouldReduceMotion = useReducedMotion();
  const citySlugs = getAllCitySlugs();

  // Sort cities alphabetically
  const sortedCities = citySlugs
    .map((slug) => cityData[slug])
    .sort((a, b) => a.name.localeCompare(b.name));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: smoothEasing,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-brand overflow-hidden">
        <Container>
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEasing }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Service Areas
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
              Balderas Concrete proudly serves the Greater Houston metropolitan
              area. We provide professional concrete, earthwork, and underground
              utility services within {serviceAreaRadius}.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Service Areas Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Cities We Serve
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Click on a city to learn more about our services in your area.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {sortedCities.map((city) => (
              <motion.div key={city.slug} variants={itemVariants}>
                <Link
                  href={`/areas/${city.slug}`}
                  className="block p-4 bg-slate-50 rounded-lg hover:bg-brand hover:text-white transition-all duration-200 group text-center"
                >
                  <span className="font-medium text-slate-900 group-hover:text-white transition-colors">
                    {city.name}
                  </span>
                  <span className="block text-sm text-slate-500 group-hover:text-white/80 transition-colors mt-1">
                    {city.county.split("/")[0]}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Service Radius Info */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/10 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-brand"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Don&apos;t See Your City?
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                We service any location within approximately {serviceAreaRadius}.
                If your city isn&apos;t listed, we likely still serve your area.
                Contact us to confirm availability for your project.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand text-white font-semibold rounded-md hover:bg-brand/90 transition-colors"
                >
                  Contact Us
                </Link>
                <a
                  href="tel:+12817209070"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand text-brand font-semibold rounded-md hover:bg-brand hover:text-white transition-colors"
                >
                  Call (281) 720-9070
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Ready to Get Started?"
        subtitle="Contact us today for a free estimate on your concrete or earthwork project."
      />
    </>
  );
}
