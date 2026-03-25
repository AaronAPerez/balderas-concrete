import Image from "next/image";
import { Container } from "@/src/components/ui/Container";
import { HeroContent } from "./HeroContent";
import blurPlaceholders from "@/src/data/blur-placeholders.json";

interface HeroSectionProps {
  /** Title can be a string or React node for custom styling */
  title: React.ReactNode;
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

/**
 * Gets blur data URL for image placeholder
 * Provides smooth loading experience while image loads
 */
function getBlurDataUrl(imagePath: string): string | undefined {
  const fileName = imagePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
  return fileName ? blurPlaceholders[fileName as keyof typeof blurPlaceholders] : undefined;
}

/**
 * HeroSection - Full-width hero with animated text and CTAs
 *
 * This is a server component for optimal LCP performance.
 * The background image renders immediately without waiting for JS hydration.
 * Only the text animations (HeroContent) require client-side hydration.
 *
 * Features:
 * - Background image with dark gradient overlay (server-rendered)
 * - Animated title, subtitle, and buttons on page load (client-hydrated)
 * - Accessible: respects reduced motion preferences
 * - Mobile-responsive layout
 */
export function HeroSection({
  title,
  subtitle,
  backgroundImage = "/images/concrete/professional-concrete-contractors-houston-tx.webp",
  primaryCta = { text: "Get an Estimate", href: "/contact" },
  secondaryCta = { text: "View Our Work", href: "/gallery" },
}: HeroSectionProps) {
  return (
    <section className="relative min-h-150 lg:min-h-175 flex items-center overflow-hidden">
      {/* Background image - server-rendered for instant LCP */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Professional concrete work"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          quality={55}
          // Optimized sizes for actual rendered dimensions
          // Mobile: 450px matches Lighthouse-reported display size
          // Tablet/Desktop: full viewport width for hero coverage
          sizes="(max-width: 640px) 450px, (max-width: 1024px) 100vw, 100vw"
          placeholder="blur"
          blurDataURL={getBlurDataUrl(backgroundImage)}
        />
        {/* Dark overlay gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.50) 100%)'
          }}
        />
      </div>

      {/* Animated content - client component for interactivity */}
      <Container className="relative z-10 py-20 lg:py-28">
        <HeroContent
          title={title}
          subtitle={subtitle}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
        />
      </Container>
    </section>
  );
}
