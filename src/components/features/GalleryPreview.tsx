import Image from "next/image";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { Button } from "@/src/components/ui/Button";
import blurPlaceholders from "@/src/data/blur-placeholders.json";

function getBlurDataUrl(imagePath: string): string | undefined {
  const fileName = imagePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
  return fileName ? blurPlaceholders[fileName as keyof typeof blurPlaceholders] : undefined;
}

const previewImages = [
  { src: "/images/concrete/1000035716.jpg", alt: "Concrete driveway project" },
  { src: "/images/concrete/1000035719.jpg", alt: "Concrete patio installation" },
  { src: "/images/concrete/1000037663.jpg", alt: "Stamped concrete work" },
];

export function GalleryPreview() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="Recent Projects"
          subtitle="See the quality of our work in these recent concrete projects."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {previewImages.map((image, index) => (
            <Link
              key={index}
              href="/gallery"
              className="relative aspect-4/3 overflow-hidden rounded-lg group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={getBlurDataUrl(image.src)}
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors" />
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Button href="/gallery" variant="secondary">
            View All Projects
          </Button>
        </div>
      </Container>
    </section>
  );
}
