import type { Metadata } from "next";
import { siteConfig } from "@/src/lib/constants";

export const metadata: Metadata = {
  title: "Our Services",
  description: `Professional concrete, earthwork, and utility services in Houston and surrounding areas. Turnkey concrete, site work, and underground utilities for commercial, industrial, and residential projects. ${siteConfig.name} - quality workmanship guaranteed.`,
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
