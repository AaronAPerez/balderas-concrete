import type { Metadata } from "next";
import { Container } from "@/src/components/ui/Container";
import { GalleryGrid } from "@/src/components/features/GalleryGrid";
import { CTABanner } from "@/src/components/features/CTABanner";
import { siteConfig } from "@/src/lib/constants";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: `Browse our portfolio of completed concrete projects. ${siteConfig.name} - driveways, patios, foundations, and more in the greater Houston area.`,
};

const galleryImages = [
  { src: "/images/concrete/1000035716.jpg", alt: "Concrete driveway installation" },
  { src: "/images/concrete/1000035719.jpg", alt: "Residential patio project" },
  { src: "/images/concrete/1000037663.jpg", alt: "Stamped concrete work" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-brand">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white pb-6">
              Our Work
            </h1>
            <p className="text-xl text-brand-light">
              Browse our portfolio of completed concrete projects throughout the
              greater Houston area.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <GalleryGrid
        images={galleryImages}
        showHeading={false}
        columns={3}
      />

      {/* More Projects Coming */}
      <section className="py-12 bg-slate-50">
        <Container>
          <p className="text-center text-slate-600">
            More project photos coming soon! Contact us to see additional examples of our work.
          </p>
        </Container>
      </section>

      <CTABanner
        title="Like What You See?"
        subtitle="Let us create something beautiful for your property. Contact us for an estimate."
      />
    </>
  );
}
