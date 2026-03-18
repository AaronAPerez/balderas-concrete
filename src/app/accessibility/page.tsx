"use client";

import { Container } from "@/src/components/ui/Container";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";
import { siteConfig, contactInfo } from "@/src/lib/constants";

/**
 * AccessibilityPage - Accessibility Statement page
 * Demonstrates commitment to WCAG compliance and provides
 * information on accessibility features and how to report issues
 */
export default function AccessibilityPage() {
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

  // Last updated date
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
              Accessibility Statement
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 leading-relaxed"
              variants={heroTextVariants}
            >
              We are committed to ensuring our website is accessible to everyone,
              including people with disabilities.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Accessibility Content */}
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

            <h2>Our Commitment</h2>
            <p>
              {siteConfig.name} is committed to ensuring digital accessibility for
              people with disabilities. We continually work to improve the user
              experience for everyone and apply relevant accessibility standards
              to ensure we provide equal access to all users.
            </p>

            <h2>Conformance Status</h2>
            <p>
              We strive to conform to the{" "}
              <a
                href="https://www.w3.org/WAI/WCAG21/quickref/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-accent transition-colors"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1
              </a>{" "}
              at Level AA. These guidelines explain how to make web content more
              accessible to people with a wide range of disabilities, including:
            </p>
            <ul>
              <li>Visual impairments (blindness, low vision, color blindness)</li>
              <li>Hearing impairments</li>
              <li>Motor impairments</li>
              <li>Cognitive and learning disabilities</li>
            </ul>

            <h2>Accessibility Features</h2>
            <p>
              Our website includes the following accessibility features to help
              ensure a positive experience for all users:
            </p>

            <h3>Navigation and Structure</h3>
            <ul>
              <li>
                <strong>Skip to main content:</strong> A skip link is provided at
                the top of each page to allow keyboard users to bypass navigation
              </li>
              <li>
                <strong>Consistent navigation:</strong> Navigation menus are
                consistent across all pages
              </li>
              <li>
                <strong>Descriptive page titles:</strong> Each page has a unique,
                descriptive title
              </li>
              <li>
                <strong>Logical heading structure:</strong> Headings are used
                hierarchically (H1, H2, H3) to organize content
              </li>
              <li>
                <strong>Breadcrumb navigation:</strong> Where applicable, breadcrumbs
                help users understand their location within the site
              </li>
            </ul>

            <h3>Visual Design</h3>
            <ul>
              <li>
                <strong>Color contrast:</strong> Text and interactive elements meet
                WCAG AA contrast ratio requirements (4.5:1 for normal text, 3:1 for
                large text)
              </li>
              <li>
                <strong>Resizable text:</strong> Text can be resized up to 200%
                without loss of content or functionality
              </li>
              <li>
                <strong>No color-only information:</strong> Information is not
                conveyed by color alone
              </li>
              <li>
                <strong>Focus indicators:</strong> Visible focus indicators are
                provided for all interactive elements
              </li>
            </ul>

            <h3>Images and Media</h3>
            <ul>
              <li>
                <strong>Alternative text:</strong> All informative images include
                descriptive alt text for screen readers
              </li>
              <li>
                <strong>Decorative images:</strong> Decorative images are properly
                marked to be ignored by assistive technologies
              </li>
            </ul>

            <h3>Forms and Interactive Elements</h3>
            <ul>
              <li>
                <strong>Form labels:</strong> All form fields have associated labels
              </li>
              <li>
                <strong>Error identification:</strong> Form errors are clearly
                identified and described to help users correct mistakes
              </li>
              <li>
                <strong>Keyboard accessibility:</strong> All interactive elements
                are accessible via keyboard navigation
              </li>
              <li>
                <strong>Touch targets:</strong> Buttons and links have adequate
                size for touch interaction (minimum 44x44 pixels)
              </li>
            </ul>

            <h3>Motion and Animation</h3>
            <ul>
              <li>
                <strong>Reduced motion:</strong> Animations are reduced or disabled
                for users who have enabled &quot;reduce motion&quot; in their operating
                system settings
              </li>
              <li>
                <strong>No auto-playing content:</strong> Media does not auto-play
                with audio
              </li>
            </ul>

            <h2>Assistive Technology Compatibility</h2>
            <p>
              Our website is designed to be compatible with the following assistive
              technologies:
            </p>
            <ul>
              <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>

            <h2>Browser Compatibility</h2>
            <p>
              Our website is designed to work with current versions of major
              browsers, including:
            </p>
            <ul>
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Apple Safari</li>
              <li>Microsoft Edge</li>
            </ul>

            <h2>Known Limitations</h2>
            <p>
              While we strive for comprehensive accessibility, some content may
              have limitations:
            </p>
            <ul>
              <li>
                <strong>Third-party content:</strong> Some embedded content from
                third parties (such as maps) may not be fully accessible. We provide
                alternative ways to access this information where possible.
              </li>
              <li>
                <strong>PDF documents:</strong> Some older PDF documents may not be
                fully accessible. Contact us if you need information from a PDF in
                an alternative format.
              </li>
              <li>
                <strong>Gallery images:</strong> Project photos in our gallery have
                general descriptions. Contact us for more detailed information about
                specific projects.
              </li>
            </ul>

            <h2>Feedback and Assistance</h2>
            <p>
              We welcome your feedback on the accessibility of our website. If you
              encounter any accessibility barriers or have suggestions for
              improvement, please contact us:
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
                href={`mailto:${contactInfo.email}?subject=Accessibility%20Feedback`}
                className="text-brand hover:text-accent transition-colors"
              >
                {contactInfo.email}
              </a>
              <br />
              Address: {contactInfo.address.full}
            </address>

            <h3>When Contacting Us, Please Include:</h3>
            <ul>
              <li>The web address (URL) of the content you were trying to access</li>
              <li>A description of the accessibility problem you encountered</li>
              <li>The assistive technology you were using, if applicable</li>
              <li>Your preferred method of contact</li>
            </ul>

            <h2>Response Time</h2>
            <p>
              We aim to respond to accessibility feedback within 5 business days.
              Depending on the nature of the issue, we will work to resolve
              accessibility barriers as quickly as possible or provide alternative
              means of accessing the information.
            </p>

            <h2>Alternative Ways to Access Our Services</h2>
            <p>
              If you are unable to access information on our website, we are happy
              to assist you through alternative means:
            </p>
            <ul>
              <li>
                <strong>Phone:</strong> Call us at{" "}
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="text-brand hover:text-accent transition-colors"
                >
                  {contactInfo.phone}
                </a>{" "}
                during business hours ({contactInfo.hours})
              </li>
              <li>
                <strong>Email:</strong> Send your inquiry to{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-brand hover:text-accent transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <strong>In-person:</strong> We can arrange in-person consultations
                at accessible locations
              </li>
            </ul>

            <h2>Continuous Improvement</h2>
            <p>
              We are committed to continuously improving the accessibility of our
              website. Our efforts include:
            </p>
            <ul>
              <li>Regular accessibility audits and testing</li>
              <li>Training for team members on accessibility best practices</li>
              <li>Incorporating accessibility into our design and development processes</li>
              <li>Monitoring and addressing user feedback</li>
            </ul>

            <h2>Legal Compliance</h2>
            <p>
              This accessibility statement applies to{" "}
              <a
                href={siteConfig.url}
                className="text-brand hover:text-accent transition-colors"
              >
                {siteConfig.url.replace("https://", "")}
              </a>
              . We believe in providing equal access to information and services
              online and work to comply with applicable accessibility laws and
              regulations, including:
            </p>
            <ul>
              <li>Americans with Disabilities Act (ADA)</li>
              <li>Section 508 of the Rehabilitation Act</li>
              <li>Web Content Accessibility Guidelines (WCAG) 2.1</li>
            </ul>

            <h2>Third-Party Resources</h2>
            <p>
              For more information about web accessibility, visit these resources:
            </p>
            <ul>
              <li>
                <a
                  href="https://www.w3.org/WAI/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-accent transition-colors"
                >
                  W3C Web Accessibility Initiative (WAI)
                </a>
              </li>
              <li>
                <a
                  href="https://www.ada.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-accent transition-colors"
                >
                  ADA.gov - Americans with Disabilities Act
                </a>
              </li>
              <li>
                <a
                  href="https://webaim.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-accent transition-colors"
                >
                  WebAIM - Web Accessibility In Mind
                </a>
              </li>
            </ul>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
