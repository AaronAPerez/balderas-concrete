import dynamic from "next/dynamic";
import { HeroSection } from "@/src/components/features/HeroSection";

/**
 * Dynamic imports for below-the-fold components
 *
 * Performance optimization strategy:
 * - HeroSection is static import (critical for LCP)
 * - Below-fold components use dynamic imports to reduce initial JS bundle
 * - This defers parsing/execution of Framer Motion for non-critical sections
 * - Loading states prevent layout shift while chunks load
 *
 * Each dynamic import creates a separate chunk that loads on demand,
 * reducing Total Blocking Time (TBT) and improving Lighthouse Performance score.
 */

// ServicesGrid - first below-fold section, loads immediately but in separate chunk
const ServicesGrid = dynamic(
  () =>
    import("@/src/components/features/ServicesGrid").then(
      (mod) => mod.ServicesGrid
    ),
  {
    loading: () => (
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="h-96 animate-pulse bg-slate-200 rounded-lg" />
        </div>
      </section>
    ),
  }
);

// ProcessSteps - further down, can be deferred
const ProcessSteps = dynamic(
  () =>
    import("@/src/components/features/ProcessSteps").then(
      (mod) => mod.ProcessSteps
    ),
  {
    loading: () => (
      <section className="py-20 lg:py-28 bg-[#6B6B6B]/10">
        <div className="container mx-auto px-4">
          <div className="h-64 animate-pulse bg-slate-200 rounded-lg" />
        </div>
      </section>
    ),
  }
);

// GalleryPreview - image-heavy section, loads when needed
const GalleryPreview = dynamic(
  () =>
    import("@/src/components/features/GalleryPreview").then(
      (mod) => mod.GalleryPreview
    ),
  {
    loading: () => (
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="h-96 animate-pulse bg-slate-200 rounded-lg" />
        </div>
      </section>
    ),
  }
);

// ServiceAreas - can be deferred until needed
const ServiceAreas = dynamic(
  () =>
    import("@/src/components/features/ServiceAreas").then(
      (mod) => mod.ServiceAreas
    ),
  {
    loading: () => (
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="h-64 animate-pulse bg-slate-200 rounded-lg" />
        </div>
      </section>
    ),
  }
);

// CTABanner - at bottom of page, lowest priority
const CTABanner = dynamic(
  () =>
    import("@/src/components/features/CTABanner").then((mod) => mod.CTABanner),
  {
    loading: () => (
      <section className="py-16 bg-brand">
        <div className="container mx-auto px-4">
          <div className="h-32 animate-pulse bg-brand-light/20 rounded-lg" />
        </div>
      </section>
    ),
  }
);

/**
 * HomePage - Main landing page component
 *
 * Layout structure:
 * 1. HeroSection (static import - critical for LCP)
 * 2. ServicesGrid (dynamic - below fold)
 * 3. ProcessSteps (dynamic - below fold)
 * 4. GalleryPreview (dynamic - below fold)
 * 5. ServiceAreas (dynamic - below fold)
 * 6. CTABanner (dynamic - bottom of page)
 */
export default function HomePage() {
  return (
    <>
      {/* Hero - statically imported for optimal LCP */}
      <HeroSection
        title={
          <>
            <span className="text-brand-light text-shadow-brand-light">Built to Last.</span>
            <br />
            <span className="text-white">Designed to Impress.</span>
          </>
        }
        subtitle="Comprehensive earthwork, turnkey concrete, and underground utility services for commercial, industrial, and residential projects. Serving Houston and surrounding areas within 75 miles."
      />
      {/* Below-fold sections - dynamically imported to reduce initial bundle */}
      <ServicesGrid />
      <ProcessSteps />
      <GalleryPreview />
      <ServiceAreas />
      <CTABanner />
    </>
  );
}
