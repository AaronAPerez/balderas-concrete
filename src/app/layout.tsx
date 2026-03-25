import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/src/components/layout/Header";
import { MobileNav } from "@/src/components/layout/MobileNav";
import { Footer } from "@/src/components/layout/Footer";
import { GoogleAnalytics } from "@/src/components/analytics/GoogleAnalytics";
import { Analytics } from '@vercel/analytics/next';
import { LocalBusinessSchema } from "@/src/components/seo/LocalBusinessSchema";
import { FloatingContactButton } from "@/src/components/features/FloatingContactButton";
import { siteConfig } from "@/src/lib/constants";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3A8A",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    // Brand
    "Balderas Concrete",
    "Balderas Concrete Houston",

    // Earthwork & Site Work Services
    "earthwork contractor Houston",
    "site work contractor",
    "land clearing Houston",
    "land grubbing services",
    "demolition contractor Houston",
    "subgrade preparation",
    "soil stabilization Houston",
    "building pads construction",
    "detention ponds Houston",
    "retention ponds contractor",
    "surveying and layout",
    "grading contractor Houston",
    "mass grading services",
    "excavating contractor Houston",

    // Turnkey Concrete Services
    "concrete contractor Houston",
    "turnkey concrete services",
    "concrete foundations Houston",
    "slab on grade contractor",
    "post tension slabs Houston",
    "elevated slabs contractor",
    "industrial concrete Houston",
    "wastewater treatment plant concrete",
    "WWTP concrete contractor",
    "tilt-up panels Houston",
    "tilt wall construction",
    "retaining walls Houston",
    "concrete pavement contractor",
    "sidewalk installation Houston",
    "decorative concrete Houston",
    "stamped concrete Houston",
    "multi-level concrete construction",
    "residential concrete Houston",
    "commercial concrete contractor",

    // Underground Utilities Services
    "underground utilities contractor",
    "sanitary sewer installation Houston",
    "waterline installation Houston",
    "storm sewer contractor",
    "trench drains installation",

    // General Concrete Keywords
    "concrete services Houston TX",
    "concrete company Houston",
    "concrete work Houston",
    "foundation contractor Houston",
    "driveway installation Houston",
    "patio concrete Houston",
    "concrete repair Houston",
    "concrete pouring Houston",
    "concrete finishing Houston",

    // Location-Based Keywords
    "concrete contractor Katy TX",
    "concrete contractor Sugar Land",
    "concrete contractor Pearland",
    "concrete contractor Cypress TX",
    "concrete contractor Spring TX",
    "concrete contractor The Woodlands",
    "Houston area concrete contractor",
    "Texas concrete contractor",

    // Industry Terms
    "licensed concrete contractor",
    "insured concrete contractor",
    "commercial construction Houston",
    "industrial construction Houston",
    "mid rise construction Houston",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
  icons: {
    icon: "/images/logo/logo.png",
    shortcut: "/images/logo/logo.png",
    apple: "/images/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Tag Manager for faster analytics loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      // className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white/95 backdrop-blur-sm border border-slate-200 dark:bg-[#121212]/95  dark:border-slate-700`}
      >
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <LocalBusinessSchema />
        <Providers>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded-md"
          >
            Skip to main content
          </a>
          <Header />
          <MobileNav />
          <main id="main-content" className="min-h-screen">
            {children}
            <Analytics />
          </main>
          <Footer />
          {/* Floating contact button - sticky bottom-right */}
          <FloatingContactButton />
          {/* Toast notification container - positioned top-right for visibility */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              duration: 5000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
