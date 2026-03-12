import type { Metadata } from "next";
import { siteConfig } from "@/src/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} for a free estimate on your concrete project. Serving Houston and surrounding areas within 75 miles.`,
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
