import type { Metadata } from "next";
import { siteConfig } from "@/src/lib/constants";

/**
 * Metadata for accessibility statement page
 * Optimized for SEO and accessibility compliance visibility
 */
export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `${siteConfig.name} is committed to web accessibility. Learn about our WCAG 2.1 AA compliance efforts, accessibility features, and how to report accessibility issues.`,
  openGraph: {
    title: `Accessibility Statement | ${siteConfig.name}`,
    description: `${siteConfig.name} is committed to web accessibility. Learn about our WCAG 2.1 AA compliance efforts and accessibility features.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
