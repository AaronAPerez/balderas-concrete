import type { Metadata } from "next";
import { siteConfig } from "@/src/lib/constants";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: `Browse our portfolio of completed concrete projects. ${siteConfig.name} - driveways, patios, foundations, and more in the greater Houston area.`,
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
