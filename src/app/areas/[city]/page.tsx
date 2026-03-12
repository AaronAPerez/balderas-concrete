"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";
import { CTABanner } from "@/src/components/features/CTABanner";
import { trackCTAClick } from "@/src/components/analytics/GoogleAnalytics";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";
import {
  getCityBySlug,
  getServicesForCity,
  type CityData,
} from "@/src/lib/serviceAreaData";
import { contactInfo, siteConfig } from "@/src/lib/constants";

/**
 * ServiceAreaPage - City-specific landing page for local SEO
 * Features:
 * - City-specific content and highlights
 * - Services overview
 * - Nearby areas for internal linking
 * - Strong CTAs for lead generation
 * - Structured data for local SEO
 */
export default function ServiceAreaPage() {
  const params = useParams();
  const citySlug = params.city as string;
  const cityData = getCityBySlug(citySlug);
  const shouldReduceMotion = useReducedMotion();
  const services = getServicesForCity();

  // If city not found, show a fallback
  if (!cityData) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Service Area Not Found
        </h1>
        <p className="text-slate-600 mb-8">
          We couldn&apos;t find information for this service area.
        </p>
        <Button href="/contact">Contact Us</Button>
      </Container>
    );
  }

  // Animation variants
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

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
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
    <>
      {/* JSON-LD for Local Business + Service Area */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${siteConfig.url}/areas/${cityData.slug}`,
            name: `${siteConfig.name} - ${cityData.name}`,
            description: cityData.description,
            url: `${siteConfig.url}/areas/${cityData.slug}`,
            telephone: contactInfo.phoneRaw,
            email: contactInfo.email,
            areaServed: {
              "@type": "City",
              name: cityData.name,
              containedInPlace: {
                "@type": "State",
                name: "Texas",
              },
            },
            serviceArea: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 29.7604,
                longitude: -95.3698,
              },
              geoRadius: "75 miles",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-brand overflow-hidden">
        <Container>
          <motion.div
            className="max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center gap-2 text-white/70 text-sm mb-6"
              variants={itemVariants}
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/areas" className="hover:text-white transition-colors">
                Service Areas
              </Link>
              <span>/</span>
              <span className="text-white">{cityData.name}</span>
            </motion.nav>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Concrete Contractor in {cityData.name}, TX
            </motion.h1>

            <motion.p
              className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl"
              variants={itemVariants}
            >
              {cityData.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button
                href="/contact"
                size="lg"
                className="bg-orange text-white hover:bg-orange/90"
                onClick={() => trackCTAClick("Get Free Estimate", `area-${cityData.slug}`)}
              >
                Get a Free Estimate
              </Button>
              <Button
                href={`tel:${contactInfo.phoneRaw}`}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand"
              >
                Call {contactInfo.phone}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Why Choose Us in This City */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6"
              variants={itemVariants}
            >
              Why Choose Balderas Concrete in {cityData.name}?
            </motion.h2>

            <motion.p
              className="text-lg text-slate-600 mb-10 max-w-3xl"
              variants={itemVariants}
            >
              Serving {cityData.county} with professional concrete and earthwork
              services. Here&apos;s why {cityData.name} residents and businesses trust us:
            </motion.p>

            <motion.ul
              className="grid sm:grid-cols-2 gap-4 mb-10"
              variants={containerVariants}
            >
              {cityData.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg"
                  variants={itemVariants}
                >
                  <svg
                    className="w-6 h-6 text-green-600 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">{highlight}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </section>

      {/* Services Available */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6"
              variants={itemVariants}
            >
              Our Services in {cityData.name}
            </motion.h2>

            <motion.p
              className="text-lg text-slate-600 mb-10 max-w-3xl"
              variants={itemVariants}
            >
              We offer a full range of concrete and earthwork services throughout{" "}
              {cityData.name} and {cityData.county}.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{service.shortDescription}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="w-1.5 h-1.5 bg-brand rounded-full" />
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-sm text-slate-500 italic">
                        + {service.features.length - 4} more services
                      </li>
                    )}
                  </ul>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-brand font-medium hover:text-brand/80 transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Nearby Service Areas */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl font-bold text-slate-900 mb-6"
              variants={itemVariants}
            >
              Nearby Service Areas
            </motion.h2>

            <motion.p
              className="text-lg text-slate-600 mb-8"
              variants={itemVariants}
            >
              We also serve these communities near {cityData.name}:
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
            >
              {cityData.nearbyAreas.map((area) => {
                const areaSlug = area.toLowerCase().replace(/\s+/g, "-");
                return (
                  <motion.div key={area} variants={itemVariants}>
                    <Link
                      href={`/areas/${areaSlug}`}
                      className="inline-block px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-brand hover:text-white transition-colors"
                    >
                      {area}, TX
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.p
              className="mt-8 text-slate-600"
              variants={itemVariants}
            >
              <Link
                href="/areas"
                className="text-brand font-medium hover:text-brand/80 transition-colors"
              >
                View all service areas →
              </Link>
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title={`Ready to Start Your ${cityData.name} Project?`}
        subtitle="Contact us today for a free estimate. We serve residential, commercial, and industrial projects throughout the area."
      />
    </>
  );
}
