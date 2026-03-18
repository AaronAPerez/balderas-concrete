"use client";

import { Container } from "@/src/components/ui/Container";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";
import { siteConfig, contactInfo } from "@/src/lib/constants";

/**
 * PrivacyPage - Privacy Policy page for legal compliance
 * Includes sections covering data collection, usage, user rights,
 * Google Analytics, Vercel Analytics, and Texas/CCPA compliance
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

  // Last updated date for policy
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
              {siteConfig.name} (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website at{" "}
              <a href={siteConfig.url} className="text-brand hover:text-accent transition-colors">
                {siteConfig.url.replace("https://", "")}
              </a>{" "}
              or use our concrete and construction services.
            </p>
            <p>
              Please read this policy carefully. By using our website or services, you
              consent to the practices described in this Privacy Policy. If you do not
              agree with this policy, please do not access our website or use our services.
            </p>

            <h2>Information We Collect</h2>

            <h3>Personal Information You Provide</h3>
            <p>We collect personal information that you voluntarily provide when you:</p>
            <ul>
              <li>Fill out our contact or estimate request form</li>
              <li>Request a quote for concrete or construction services</li>
              <li>Call or email us about a project</li>
              <li>Enter into a service contract with us</li>
              <li>Communicate with our team</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Property or project address</li>
              <li>Project details, specifications, and requirements</li>
              <li>Billing and payment information (for contracted services)</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, certain information is collected automatically
              through cookies and similar technologies:
            </p>
            <ul>
              <li>IP address and approximate geographic location</li>
              <li>Browser type, version, and language settings</li>
              <li>Device type and operating system</li>
              <li>Pages visited, time spent on pages, and navigation paths</li>
              <li>Referring website or search terms</li>
              <li>Date and time of your visit</li>
            </ul>

            <h2>Analytics and Tracking Technologies</h2>

            <h3>Google Analytics 4</h3>
            <p>
              We use Google Analytics 4 (GA4) to analyze website traffic and understand
              how visitors interact with our site. GA4 collects data including:
            </p>
            <ul>
              <li>Page views and user engagement metrics</li>
              <li>Session duration and bounce rates</li>
              <li>Traffic sources and referral data</li>
              <li>Device and browser information</li>
              <li>Approximate geographic location (city/region level)</li>
            </ul>
            <p>
              Google Analytics uses cookies to collect this information. The data is
              processed by Google and is subject to{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-accent transition-colors"
              >
                Google&apos;s Privacy Policy
              </a>
              . You can opt out of Google Analytics by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-accent transition-colors"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>

            <h3>Vercel Analytics</h3>
            <p>
              Our website is hosted on Vercel, and we use Vercel Analytics to monitor
              website performance and user experience. Vercel Analytics collects
              anonymized data about page load times, web vitals, and general usage
              patterns. This data helps us improve website speed and reliability.
              Vercel Analytics is privacy-focused and does not use cookies for tracking.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide project estimates</li>
              <li>Communicate with you about your concrete or construction project</li>
              <li>Schedule site visits and coordinate service delivery</li>
              <li>Process contracts, invoices, and payments</li>
              <li>Send project updates and completion notifications</li>
              <li>Improve our website, services, and customer experience</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Protect against fraud and unauthorized transactions</li>
            </ul>

            <h2>Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties.
              We may share your information in the following circumstances:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> With trusted third parties who assist
                in operating our business (e.g., email services, payment processors,
                analytics providers)
              </li>
              <li>
                <strong>Subcontractors:</strong> When necessary to complete your project,
                we may share relevant project details with licensed subcontractors
              </li>
              <li>
                <strong>Legal Requirements:</strong> To comply with applicable laws,
                regulations, legal processes, or government requests
              </li>
              <li>
                <strong>Protection of Rights:</strong> To protect our rights, privacy,
                safety, property, or that of our customers and the public
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger,
                acquisition, or sale of business assets
              </li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our
              website. Types of cookies we use:
            </p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Required for basic website
                functionality
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors use
                our website (Google Analytics)
              </li>
              <li>
                <strong>Performance Cookies:</strong> Monitor website performance and
                speed
              </li>
            </ul>
            <p>
              You can control cookies through your browser settings. Note that disabling
              cookies may affect certain website features. Most browsers allow you to:
            </p>
            <ul>
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block all cookies from specific sites</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill
              the purposes outlined in this policy, unless a longer retention period is
              required by law. Specifically:
            </p>
            <ul>
              <li>
                <strong>Contact inquiries:</strong> Retained for up to 3 years after
                last communication
              </li>
              <li>
                <strong>Project records:</strong> Retained for 7 years after project
                completion (as required for warranty and legal purposes)
              </li>
              <li>
                <strong>Financial records:</strong> Retained as required by tax and
                accounting regulations
              </li>
              <li>
                <strong>Analytics data:</strong> Retained according to Google and Vercel
                retention policies
              </li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect
              your personal information, including:
            </p>
            <ul>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure hosting infrastructure (Vercel)</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Regular security assessments</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage
              is 100% secure. While we strive to protect your information, we cannot
              guarantee absolute security.
            </p>

            <h2>Your Privacy Rights</h2>

            <h3>General Rights</h3>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h3>Texas Privacy Rights</h3>
            <p>
              If you are a Texas resident, the Texas Data Privacy and Security Act
              (TDPSA) provides you with specific rights regarding your personal data,
              including the right to:
            </p>
            <ul>
              <li>Confirm whether we are processing your personal data</li>
              <li>Access your personal data</li>
              <li>Correct inaccuracies in your personal data</li>
              <li>Delete your personal data</li>
              <li>Obtain a copy of your personal data in a portable format</li>
              <li>Opt out of targeted advertising and sale of personal data</li>
            </ul>
            <p>
              We do not sell personal data or use it for targeted advertising. To
              exercise your rights, contact us using the information below.
            </p>

            <h3>California Privacy Rights (CCPA)</h3>
            <p>
              If you are a California resident, the California Consumer Privacy Act
              (CCPA) provides you with additional rights:
            </p>
            <ul>
              <li>
                <strong>Right to Know:</strong> You can request information about the
                categories and specific pieces of personal information we have collected
              </li>
              <li>
                <strong>Right to Delete:</strong> You can request deletion of your
                personal information, subject to certain exceptions
              </li>
              <li>
                <strong>Right to Non-Discrimination:</strong> We will not discriminate
                against you for exercising your privacy rights
              </li>
            </ul>
            <p>
              We do not sell personal information as defined under the CCPA. To submit
              a request, contact us using the information provided below.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, such as Google Maps
              for directions or social media platforms. We are not responsible for the
              privacy practices or content of these external sites. We encourage you to
              review the privacy policies of any third-party sites you visit.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our website and services are not directed to individuals under 18 years
              of age. We do not knowingly collect personal information from children.
              If you believe we have inadvertently collected information from a child
              under 18, please contact us immediately, and we will take steps to delete
              such information.
            </p>

            <h2>Do Not Track Signals</h2>
            <p>
              Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to
              websites that you do not want your online activity tracked. Our website
              does not currently respond to DNT signals. However, you can opt out of
              Google Analytics tracking as described above.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes
              in our practices or applicable laws. We will notify you of material
              changes by posting the updated policy on this page with a new &quot;Last
              updated&quot; date. We encourage you to review this policy periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, want to exercise your
              privacy rights, or have concerns about our data practices, please contact
              us:
            </p>
            <address className="not-italic">
              <strong>{siteConfig.name}</strong>
              <br />
              Phone:{" "}
              <a
                href={`tel:${contactInfo.phoneRaw}`}
                className="text-brand hover:text-accent transition-colors"
              >
                {contactInfo.phone}
              </a>
              <br />
              Email:{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-brand hover:text-accent transition-colors"
              >
                {contactInfo.email}
              </a>
              <br />
              Address: {contactInfo.address.full}
            </address>
            <p className="pt-4">
              We will respond to your request within 30 days or as required by
              applicable law.
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
