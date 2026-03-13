"use client";

import { Container } from "@/src/components/ui/Container";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";
import { siteConfig, contactInfo } from "@/src/lib/constants";

/**
 * PrivacyPage - Privacy Policy page for legal compliance
 * Includes sections covering data collection, usage, and user rights
 */
export default function PrivacyPage() {
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
              Privacy Policy
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 leading-relaxed"
              variants={heroTextVariants}
            >
              Your privacy is important to us. This policy explains how we collect,
              use, and protect your information.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Privacy Policy Content */}
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

            <h2>Introduction</h2>
            <p>
              {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide when you:</p>
            <ul>
              <li>Fill out our contact form</li>
              <li>Request a quote or estimate</li>
              <li>Subscribe to our newsletter</li>
              <li>Communicate with us via phone or email</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address or service location</li>
              <li>Project details and requirements</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information
              about your device, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website or source</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide estimates</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties.
              We may share your information in the following circumstances:
            </p>
            <ul>
              <li>With service providers who assist us in operating our business</li>
              <li>To comply with legal requirements or respond to lawful requests</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a business transfer or merger</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience
              on our website. These technologies help us:
            </p>
            <ul>
              <li>Remember your preferences</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve our website functionality</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling cookies
              may affect some website features.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect
              your personal information against unauthorized access, alteration, disclosure,
              or destruction. However, no method of transmission over the Internet or
              electronic storage is 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible
              for the privacy practices or content of these external sites. We encourage
              you to review the privacy policies of any third-party sites you visit.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 18 years of age. We do
              not knowingly collect personal information from children. If you believe
              we have collected information from a child, please contact us immediately.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              any changes by posting the new policy on this page and updating the
              &quot;Last updated&quot; date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices,
              please contact us:
            </p>
            <ul>
              <li>Phone: <a href={`tel:${contactInfo.phoneRaw}`} className="text-brand hover:text-accent transition-colors">{contactInfo.phone}</a></li>
              <li>Email: <a href={`mailto:${contactInfo.email}`} className="text-brand hover:text-accent transition-colors">{contactInfo.email}</a></li>
              <li>Address: {contactInfo.address.full}</li>
            </ul>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
