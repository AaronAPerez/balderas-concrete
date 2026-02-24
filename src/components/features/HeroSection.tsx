import Image from "next/image";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import blurPlaceholders from "@/src/data/blur-placeholders.json";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

function getBlurDataUrl(imagePath: string): string | undefined {
  const fileName = imagePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
  return fileName ? blurPlaceholders[fileName as keyof typeof blurPlaceholders] : undefined;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage = "/images/concrete/1000035716.jpg",
  primaryCta = { text: "Get an Estimate", href: "/contact" },
  secondaryCta = { text: "View Our Work", href: "/gallery" },
}: HeroSectionProps) {
  return (
    <section className="relative min-h-150 lg:min-h-175 flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Professional concrete work"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
          placeholder="blur"
          blurDataURL={getBlurDataUrl(backgroundImage)}
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.50) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-md leading-tight">
            {title}
          </h1>
          <p className="pt-6 text-lg sm:text-xl text-slate-100 leading-relaxed max-w-xl">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href={primaryCta.href} size="lg" className="bg-orange text-white hover:bg-orange/90">
              {primaryCta.text}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange"
            >
              {secondaryCta.text}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
