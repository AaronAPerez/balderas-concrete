import { HeroSection } from "@/src/components/features/HeroSection";
import { ServicesGrid } from "@/src/components/features/ServicesGrid";

import { ProcessSteps } from "@/src/components/features/ProcessSteps";
import { GalleryPreview } from "@/src/components/features/GalleryPreview";
import { CTABanner } from "@/src/components/features/CTABanner";
import { ServiceAreas } from "@/src/components/features/ServiceAreas";

export default function HomePage() {
  return (
    <>
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
      <ServicesGrid />
      {/* <StatsSection /> */}
      <ProcessSteps />
      <GalleryPreview />
      <ServiceAreas />
      <CTABanner />
    </>
  );
}
