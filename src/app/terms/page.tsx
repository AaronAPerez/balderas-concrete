"use client";

import { Container } from "@/src/components/ui/Container";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEasing } from "@/src/components/ui/animations";
import { siteConfig, contactInfo } from "@/src/lib/constants";

/**
 * TermsPage - Terms of Service page for legal compliance
 * Covers service agreements, limitations, warranties, and user responsibilities
 * for a concrete and construction contractor business
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

  // Last updated date for terms
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
              Please read these terms carefully before using our website or engaging
              our services.
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
              By accessing or using the website and services provided by {siteConfig.name}{" "}
              (&quot;Company,&quot; &quot;Contractor,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be
              bound by these Terms of Service (&quot;Terms&quot;). These Terms apply to all
              visitors, users, and customers who access our website or engage our
              construction services.
            </p>
            <p>
              If you do not agree to these Terms, please do not use our website or
              services. These Terms are in addition to any written contract or
              agreement you may sign for specific project work.
            </p>

            <h2>Services Description</h2>
            <p>
              {siteConfig.name} is a professional concrete and construction contractor
              serving the Houston metropolitan area and surrounding regions within
              approximately 75 miles. Our services include but are not limited to:
            </p>

            <h3>Earthwork &amp; Site Work</h3>
            <ul>
              <li>Land clearing and grubbing</li>
              <li>Demolition services</li>
              <li>Subgrade preparation and soil stabilization</li>
              <li>Building pad construction</li>
              <li>Detention and retention pond construction</li>
              <li>Surveying and layout</li>
              <li>Grading and mass grading</li>
              <li>Excavation services</li>
            </ul>

            <h3>Turnkey Concrete Services</h3>
            <ul>
              <li>Foundations (residential, commercial, and industrial)</li>
              <li>Slab on grade construction</li>
              <li>Post-tension slabs</li>
              <li>Elevated slabs and multi-level construction</li>
              <li>Industrial concrete</li>
              <li>Wastewater treatment plant (WWTP) construction</li>
              <li>Tilt-up panel construction</li>
              <li>Retaining walls</li>
              <li>Concrete pavement and sidewalks</li>
              <li>Decorative and stamped concrete</li>
              <li>Residential concrete (driveways, patios, walkways)</li>
            </ul>

            <h3>Underground Utilities</h3>
            <ul>
              <li>Sanitary sewer systems</li>
              <li>Waterline installation</li>
              <li>Storm sewer systems</li>
              <li>Trench drains</li>
            </ul>

            <h2>Estimates and Quotes</h2>
            <p>
              All estimates and quotes provided through our website, phone, email, or
              in-person consultations are preliminary and non-binding unless expressly
              stated otherwise in writing. Estimates are subject to change based on:
            </p>
            <ul>
              <li>Actual site conditions discovered upon detailed inspection</li>
              <li>Changes in material costs or availability</li>
              <li>Modifications to project scope or specifications</li>
              <li>Permit requirements and regulatory compliance needs</li>
              <li>Soil conditions, groundwater, or other subsurface factors</li>
              <li>Access limitations or site constraints</li>
              <li>Unforeseen circumstances or hidden conditions</li>
            </ul>
            <p>
              A formal written contract will detail the exact scope of work, pricing,
              payment terms, timeline, and conditions before any project begins.
              Estimates are typically valid for 30 days unless otherwise specified.
            </p>

            <h2>Project Contracts</h2>

            <h3>Contract Requirements</h3>
            <p>
              All concrete and construction work requires a signed written contract
              before work commences. The contract will specify:
            </p>
            <ul>
              <li>Detailed scope of work and specifications</li>
              <li>Materials to be used (type, grade, and quantity)</li>
              <li>Project timeline, milestones, and completion date</li>
              <li>Total contract price and payment schedule</li>
              <li>Warranty terms and conditions</li>
              <li>Insurance and liability provisions</li>
              <li>Change order procedures</li>
              <li>Dispute resolution process</li>
            </ul>

            <h3>Deposits and Payment Terms</h3>
            <p>
              Payment terms are outlined in each project contract. Standard terms
              typically include:
            </p>
            <ul>
              <li>
                <strong>Deposit:</strong> A deposit (typically 25-50% depending on
                project size) is required to secure scheduling and order materials
              </li>
              <li>
                <strong>Progress Payments:</strong> For larger projects, progress
                payments may be required at defined milestones
              </li>
              <li>
                <strong>Final Payment:</strong> Balance is due upon substantial
                completion and final inspection
              </li>
              <li>
                <strong>Late Payments:</strong> Late payments may be subject to interest
                charges as specified in the contract
              </li>
            </ul>
            <p>
              We accept payment by check, ACH transfer, and major credit cards.
              Payment terms are subject to credit approval for commercial accounts.
            </p>

            <h3>Change Orders</h3>
            <p>
              Any modifications to the agreed scope of work must be documented through
              a written change order signed by both parties. Change orders will specify:
            </p>
            <ul>
              <li>Description of the changed work</li>
              <li>Impact on project price (additions or deductions)</li>
              <li>Impact on project schedule</li>
              <li>Any modified terms or conditions</li>
            </ul>
            <p>
              Work outside the original scope will not be performed without an approved
              change order. Verbal agreements to change work are not binding.
            </p>

            <h2>Licensing, Insurance, and Compliance</h2>
            <p>
              {siteConfig.name} maintains all required licenses, insurance, and
              certifications to perform construction work in the State of Texas:
            </p>
            <ul>
              <li>General liability insurance</li>
              <li>Workers&apos; compensation insurance</li>
              <li>Commercial auto insurance</li>
              <li>Compliance with OSHA safety standards</li>
              <li>Adherence to local building codes and regulations</li>
            </ul>
            <p>
              Certificates of insurance are available upon request. Insurance coverage
              limits will be specified in your project contract.
            </p>

            <h2>Warranty</h2>
            <p>
              We stand behind our workmanship and provide warranty coverage as detailed
              in your project contract. Standard warranty terms include:
            </p>
            <ul>
              <li>
                <strong>Workmanship Warranty:</strong> Coverage for defects in
                workmanship for a specified period (typically 1-2 years depending on
                project type)
              </li>
              <li>
                <strong>Materials:</strong> Manufacturer warranties apply to materials
                and are passed through to the customer
              </li>
            </ul>

            <h3>Warranty Exclusions</h3>
            <p>Warranty coverage does not extend to:</p>
            <ul>
              <li>Normal wear and tear or weathering</li>
              <li>Hairline cracks due to normal concrete curing and settling</li>
              <li>Damage caused by third parties, vehicles, or equipment</li>
              <li>Damage from natural disasters, flooding, or acts of God</li>
              <li>Issues arising from improper maintenance or neglect</li>
              <li>Alterations or repairs performed by others</li>
              <li>Damage from chemical exposure or improper use of deicing agents</li>
              <li>Settlement or movement due to soil conditions beyond our control</li>
              <li>Color variations, which are natural in concrete</li>
            </ul>

            <h3>Warranty Claims</h3>
            <p>
              To make a warranty claim, contact us promptly upon discovering an issue.
              We will inspect the work and, if covered under warranty, make necessary
              repairs at no additional cost. Failure to report issues in a timely manner
              may void warranty coverage.
            </p>

            <h2>Customer Responsibilities</h2>
            <p>Customers are responsible for:</p>
            <ul>
              <li>Providing accurate and complete information about project requirements</li>
              <li>Ensuring clear, safe access to the work area for equipment and personnel</li>
              <li>
                Obtaining necessary permits and approvals (unless specifically agreed
                that Contractor will obtain permits)
              </li>
              <li>
                Calling 811 or local utility locator services to mark underground utilities
                before excavation work begins
              </li>
              <li>Disclosing known site conditions, including buried structures or hazards</li>
              <li>Providing timely decisions, approvals, and access for inspections</li>
              <li>Making payments according to the agreed schedule</li>
              <li>Maintaining completed work according to provided care instructions</li>
              <li>Keeping the work area clear of vehicles and obstructions during curing</li>
            </ul>

            <h2>Limitations of Liability</h2>
            <p>
              To the fullest extent permitted by Texas law, {siteConfig.name} shall not
              be liable for:
            </p>
            <ul>
              <li>
                Indirect, incidental, special, consequential, or punitive damages
              </li>
              <li>Lost profits, revenue, or business opportunities</li>
              <li>
                Delays caused by weather, material shortages, labor disputes, or
                circumstances beyond our reasonable control
              </li>
              <li>
                Damage to underground utilities, pipes, or structures not properly
                marked or disclosed
              </li>
              <li>Pre-existing conditions or defects not disclosed prior to work</li>
              <li>Damage caused by settlement, soil conditions, or drainage issues</li>
              <li>Work performed by other contractors on or adjacent to our work</li>
            </ul>
            <p>
              Our total liability for any claim arising from our services shall not
              exceed the total amount paid for the specific work giving rise to the
              claim.
            </p>

            <h2>Force Majeure</h2>
            <p>
              We shall not be liable for delays or failure to perform due to causes
              beyond our reasonable control, including but not limited to:
            </p>
            <ul>
              <li>Severe weather, hurricanes, tropical storms, or flooding</li>
              <li>Acts of God or natural disasters</li>
              <li>Pandemics, epidemics, or public health emergencies</li>
              <li>Material shortages or supply chain disruptions</li>
              <li>Labor strikes or work stoppages</li>
              <li>Government actions, regulations, or permit delays</li>
              <li>Utility failures or infrastructure issues</li>
              <li>Civil unrest or acts of terrorism</li>
            </ul>
            <p>
              In such events, project timelines will be extended accordingly, and we
              will communicate promptly about any anticipated delays.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless {siteConfig.name}, its
              owners, employees, and subcontractors from any claims, damages, losses,
              or expenses (including reasonable attorney&apos;s fees) arising from:
            </p>
            <ul>
              <li>Your breach of these Terms or any project contract</li>
              <li>Your violation of any applicable law or regulation</li>
              <li>Your failure to fulfill your responsibilities as outlined herein</li>
              <li>Inaccurate or incomplete information you provide</li>
              <li>Claims by third parties arising from your actions or omissions</li>
            </ul>

            <h2>Website Terms of Use</h2>

            <h3>Intellectual Property</h3>
            <p>
              All content on our website, including text, images, logos, graphics,
              photographs of our work, and designs, is the property of {siteConfig.name}{" "}
              and is protected by copyright and trademark laws. You may not:
            </p>
            <ul>
              <li>Reproduce, distribute, or modify our content without permission</li>
              <li>Use our images or content for commercial purposes</li>
              <li>Remove or alter any copyright or trademark notices</li>
            </ul>

            <h3>Prohibited Conduct</h3>
            <p>When using our website, you agree not to:</p>
            <ul>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Attempt to gain unauthorized access to our systems or data</li>
              <li>Use automated systems, bots, or scrapers to collect information</li>
              <li>Engage in any activity that disrupts or interferes with our services</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Impersonate any person or entity</li>
            </ul>

            <h3>Disclaimer of Warranties</h3>
            <p>
              Our website is provided &quot;as is&quot; and &quot;as available&quot; without warranties of
              any kind, express or implied. We do not warrant that the website will be
              uninterrupted, error-free, or free of viruses or other harmful components.
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms or our services shall be resolved
              as follows:
            </p>
            <ol>
              <li>
                <strong>Good Faith Negotiation:</strong> The parties shall first attempt
                to resolve disputes through direct communication and good faith
                negotiation.
              </li>
              <li>
                <strong>Mediation:</strong> If negotiation fails, disputes shall be
                submitted to non-binding mediation in Harris County, Texas.
              </li>
              <li>
                <strong>Litigation:</strong> If mediation is unsuccessful, disputes may
                be resolved through the courts of Harris County, Texas, or as otherwise
                specified in the project contract.
              </li>
            </ol>
            <p>
              You agree that any claim must be brought within one (1) year after the
              cause of action arises.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms of Service and any disputes arising hereunder shall be
              governed by and construed in accordance with the laws of the State of
              Texas, without regard to conflict of law principles. You consent to the
              exclusive jurisdiction of the state and federal courts located in Harris
              County, Texas.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting to our website with
              an updated &quot;Last updated&quot; date. Your continued use of our website or
              services after changes are posted constitutes acceptance of the modified
              Terms. We encourage you to review these Terms periodically.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid, illegal, or
              unenforceable by a court of competent jurisdiction, the remaining
              provisions shall continue in full force and effect. The invalid provision
              shall be modified to the minimum extent necessary to make it valid and
              enforceable.
            </p>

            <h2>Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and any signed project
              contracts, constitute the entire agreement between you and {siteConfig.name}{" "}
              regarding the use of our website. In the event of a conflict between
              these Terms and a signed project contract, the project contract shall
              prevail for matters relating to that specific project.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service or our services, please
              contact us:
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
              <br />
              Hours: {contactInfo.hours}
            </address>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
