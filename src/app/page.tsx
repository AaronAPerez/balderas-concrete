import { HeroSection } from "@/src/components/features/HeroSection";
import { ServicesGrid } from "@/src/components/features/ServicesGrid";
import { StatsSection } from "@/src/components/features/StatsSection";
import { ProcessSteps } from "@/src/components/features/ProcessSteps";
import { GalleryPreview } from "@/src/components/features/GalleryPreview";
import { CTABanner } from "@/src/components/features/CTABanner";
import { ServiceAreas } from "@/src/components/features/ServiceAreas";

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Built to Last. 
        Designed to Impress"
        // title="Quality Concrete Services in Texas"
        subtitle="From driveways to decorative stamped concrete, Balderas Concrete delivers premium quality concrete services with lasting results for residential and commercial projects."
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
