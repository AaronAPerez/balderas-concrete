import type { Metadata } from "next";
import { siteConfig } from "@/src/lib/constants";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Balderas Concrete serves the Greater Houston metropolitan area. View our complete list of service areas including Houston, Katy, Sugar Land, Pearland, Cypress, and more.",
  keywords: [
    "Houston concrete contractor",
    "Texas concrete services",
    "Greater Houston concrete",
    "concrete contractor near me",
    "earthwork Houston area",
    "concrete services Katy",
    "concrete contractor Sugar Land",
  ],
  openGraph: {
    title: `Service Areas | ${siteConfig.name}`,
    description:
      "Balderas Concrete serves the Greater Houston metropolitan area with professional concrete and earthwork services.",
    url: `${siteConfig.url}/areas`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: `${siteConfig.url}/areas`,
  },
};

export default function AreasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
