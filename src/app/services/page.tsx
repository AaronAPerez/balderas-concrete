import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";
import { CTABanner } from "@/src/components/features/CTABanner";
import { services, siteConfig } from "@/src/lib/constants";

export const metadata: Metadata = {
  title: "Our Services",
  description: `Professional concrete, earthwork, and utility services in Houston and surrounding areas. Turnkey concrete, site work, and underground utilities for commercial, industrial, and residential projects. ${siteConfig.name} - quality workmanship guaranteed.`,
};

// Image mappings for each service category
const serviceImages: Record<string, string> = {
  earthwork: "/images/concrete/1000037663.jpg",
  "turnkey-concrete": "/images/concrete/1000035716.jpg",
  "underground-utilities": "/images/concrete/1000035719.jpg",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-8 lg:py-16 bg-brand">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white pb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Comprehensive earthwork, turnkey concrete, and underground utility
              services for commercial, industrial, and residential projects
              within 75 miles of Houston.
            </p>
          </div>
        </Container>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-24 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-3xl font-bold text-brand pb-4">
                    {service.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed pb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-accent shrink-0 mt-0.5"
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
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact">Get a Quote</Button>
                </div>
                <div
                  className={`relative aspect-4/3 rounded-lg overflow-hidden ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={serviceImages[service.id]}
                    alt={`${service.title} by Balderas Concrete`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quality Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
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
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                "Licensed & Insured",
                "Precision Surveying",
                "Code Compliance",
                "Safety First Approach",
                "Quality Materials",
                "Project Management",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 justify-center text-slate-700"
                >
                  <svg
                    className="w-5 h-5 text-accent"
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
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Ready to Start Your Project?"
        subtitle="Contact us today for an estimate. We'll discuss your needs and provide a detailed quote."
      />
    </>
  );
}
