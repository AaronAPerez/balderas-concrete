import type { Metadata } from "next";
import {
  getAllCitySlugs,
  getCityBySlug,
  getCityPageTitle,
  getCityPageDescription,
} from "@/src/lib/serviceAreaData";
import { siteConfig } from "@/src/lib/constants";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ city: string }>;
}

/**
 * Generate static params for all city pages at build time
 * This enables static generation for better performance and SEO
 */
export async function generateStaticParams() {
  const slugs = getAllCitySlugs();
  return slugs.map((city) => ({ city }));
}

/**
 * Generate dynamic metadata for each city page
 * Optimized for local SEO with city-specific titles and descriptions
 */
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: "Service Area Not Found",
      description: "The requested service area could not be found.",
    };
  }

  const title = getCityPageTitle(cityData);
  const description = getCityPageDescription(cityData);
  const url = `${siteConfig.url}/areas/${cityData.slug}`;

  return {
    title,
    description,
    keywords: [
      `concrete contractor ${cityData.name}`,
      `${cityData.name} concrete services`,
      `earthwork ${cityData.name} TX`,
      `foundation contractor ${cityData.name}`,
      `concrete driveway ${cityData.name}`,
      `commercial concrete ${cityData.name}`,
      `${cityData.county} concrete contractor`,
    ],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ServiceAreaLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
