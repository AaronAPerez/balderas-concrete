import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { CTABanner } from "@/src/components/features/CTABanner";
import { ServiceAreas } from "@/src/components/features/ServiceAreas";
import { siteConfig, contactInfo } from "@/src/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} - a family-owned concrete contractor serving the greater Houston area with quality workmanship and exceptional service for over 15 years.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-8 lg:py-16 bg-brand">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white pb-6">
              About Balderas Concrete
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Building quality concrete solutions for Texas families and businesses.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand pb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Balderas Concrete was founded with a simple mission: to provide
                  exceptional concrete work that stands the test of time. As a
                  family-owned business, we take pride in treating every project
                  as if it were our own home.
                </p>
                <p>
                  For over 30 years, we&apos;ve been serving the greater Houston area,
                  building lasting relationships with our customers through honest
                  communication, quality craftsmanship, and reliable service.
                </p>
                <p>
                  From small residential repairs to large commercial projects,
                  our experienced team brings the same level of dedication and
                  attention to detail to every job.
                </p>
              </div>
            </div>
            <div className="relative aspect-4/3 rounded-lg overflow-hidden">
              <Image
                src="/images/concrete/1000035716.jpg"
                alt="Balderas Concrete team at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <SectionHeading
            title="Why Choose Us"
            subtitle="Our commitment to excellence sets us apart."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Licensed & Insured",
                description:
                  "Fully licensed and insured for your peace of mind. We carry comprehensive coverage on every project.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Quality Materials",
                description:
                  "We use only premium concrete mixes and reinforcement materials that exceed industry standards.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
              {
                title: "Experienced Team",
                description:
                  "Our skilled craftsmen bring decades of copbined experience to every project we undertake.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: "Satisfaction Guaranteed",
                description:
                  "We stand behind our work with a satisfaction guarantee. Your happiness is our top priority.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand pb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-brand pb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Info */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="bg-white rounded-lg border border-slate-200 p-8 lg:p-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand pb-6">Get in Touch</h2>
            <div className="space-y-4">
              <p className="text-slate-600">
                Ready to discuss your project? We&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-brand hover:text-accent transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {contactInfo.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center gap-2 text-brand hover:text-accent transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAreas />
      <CTABanner />
    </>
  );
}
