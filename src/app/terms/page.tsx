"use client";

import { Container } from "@/src/components/ui/Container";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";
import { siteConfig, contactInfo } from "@/src/lib/constants";

/**
 * TermsPage - Terms of Service page for legal compliance
 * Covers service agreements, limitations, and user responsibilities
 */
export default function TermsPage() {
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

  // Content section animation
  const contentVariants = {
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

  // Get current date for "Last updated" display
  const lastUpdated = "March 2025";

  return (
    <>
      {/* Hero Section */}
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
              Terms of Service
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 leading-relaxed"
              variants={heroTextVariants}
            >
              Please read these terms carefully before using our services.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Terms of Service Content */}
      <section className="py-16 lg:py-24">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto prose prose-slate prose-lg"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm text-slate-500 pb-8">
              Last updated: {lastUpdated}
            </p>

            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the services provided by {siteConfig.name} (&quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service. If you
              do not agree to these terms, please do not use our services.
            </p>

            <h2>Services Description</h2>
            <p>
              {siteConfig.name} provides concrete construction and related services
              including but not limited to:
            </p>
            <ul>
              <li>Residential concrete work (driveways, patios, sidewalks)</li>
              <li>Commercial concrete construction</li>
              <li>Sitework and foundations</li>
              <li>Tilt wall construction</li>
              <li>Industrial concrete projects</li>
              <li>Concrete repair and maintenance</li>
            </ul>

            <h2>Estimates and Quotes</h2>
            <p>
              All estimates and quotes provided are preliminary and subject to change
              based on:
            </p>
            <ul>
              <li>Site conditions upon inspection</li>
              <li>Changes in material costs</li>
              <li>Project scope modifications</li>
              <li>Permit requirements</li>
              <li>Unforeseen circumstances</li>
            </ul>
            <p>
              A final written contract will detail the exact scope, pricing, and terms
              of any project before work begins.
            </p>

            <h2>Project Terms</h2>
            <h3>Contracts</h3>
            <p>
              All concrete work requires a signed contract before commencement. The
              contract will specify:
            </p>
            <ul>
              <li>Scope of work</li>
              <li>Materials to be used</li>
              <li>Timeline and milestones</li>
              <li>Payment schedule</li>
              <li>Warranty terms</li>
            </ul>

            <h3>Deposits and Payments</h3>
            <p>
              Payment terms will be outlined in each project contract. Typically:
            </p>
            <ul>
              <li>A deposit is required to secure scheduling</li>
              <li>Progress payments may be required for larger projects</li>
              <li>Final payment is due upon project completion</li>
            </ul>

            <h3>Changes and Modifications</h3>
            <p>
              Any changes to the agreed scope of work must be documented in writing
              through a change order. Additional costs may apply for modifications.
            </p>

            <h2>Warranty</h2>
            <p>
              We stand behind our work and provide warranty coverage as detailed in
              your project contract. Warranty terms typically include:
            </p>
            <ul>
              <li>Coverage for workmanship defects</li>
              <li>Exclusions for normal wear and tear</li>
              <li>Exclusions for damage caused by third parties or natural disasters</li>
              <li>Requirements for proper maintenance</li>
            </ul>

            <h2>Limitations of Liability</h2>
            <p>
              To the fullest extent permitted by law, {siteConfig.name} shall not be
              liable for:
            </p>
            <ul>
              <li>Indirect, incidental, or consequential damages</li>
              <li>Delays caused by weather, material shortages, or circumstances beyond our control</li>
              <li>Damage to underground utilities not properly marked</li>
              <li>Pre-existing conditions not disclosed prior to work</li>
            </ul>

            <h2>Customer Responsibilities</h2>
            <p>Customers are responsible for:</p>
            <ul>
              <li>Providing accurate information about project requirements</li>
              <li>Ensuring clear access to the work area</li>
              <li>Obtaining necessary permits (unless agreed otherwise)</li>
              <li>Marking or identifying underground utilities</li>
              <li>Providing timely approvals and decisions</li>
              <li>Making payments according to the agreed schedule</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on our website, including text, images, logos, and designs,
              is the property of {siteConfig.name} and protected by copyright laws.
              You may not reproduce, distribute, or use our content without written
              permission.
            </p>

            <h2>Website Use</h2>
            <p>When using our website, you agree not to:</p>
            <ul>
              <li>Submit false or misleading information</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated systems to collect data</li>
              <li>Engage in any activity that disrupts our services</li>
            </ul>

            <h2>Dispute Resolution</h2>
            <p>
              Any disputes arising from our services shall first be addressed through
              good faith negotiation. If resolution cannot be reached, disputes may be
              subject to mediation or arbitration as specified in the project contract.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance
              with the laws of the State of Texas, without regard to conflict of law
              principles.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes
              will be effective immediately upon posting to our website. Continued use
              of our services constitutes acceptance of modified terms.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining
              provisions will continue in full force and effect.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us:
            </p>
            <ul>
              <li>Phone: {contactInfo.phone}</li>
              <li>Email: {contactInfo.email}</li>
              <li>Address: {contactInfo.address.full}</li>
            </ul>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
