import type { Metadata } from "next";
import { siteConfig } from "@/src/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} - a family-owned concrete contractor with 30+ years of experience serving the greater Houston area. Specializing in sitework, residential, commercial, tilt wall, mid rise, WWTP, and industrial projects.`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
