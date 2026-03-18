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
    "concrete contractor",
    "concrete services Texas",
    "driveway installation",
    "patio concrete",
    "stamped concrete",
    "concrete repair",
    "foundation contractor",
    "Houston concrete",
    "Texas concrete contractor",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload LCP hero image with responsive sizes for faster rendering */}
        {/* Note: Source image is 1440px wide - widths must not exceed source dimensions */}
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fimages%2Fconcrete%2Fprofessional-concrete-contractors-houston-tx.jpg&w=1440&q=70"
          imageSrcSet="/_next/image?url=%2Fimages%2Fconcrete%2Fprofessional-concrete-contractors-houston-tx.jpg&w=640&q=70 640w, /_next/image?url=%2Fimages%2Fconcrete%2Fprofessional-concrete-contractors-houston-tx.jpg&w=1080&q=70 1080w, /_next/image?url=%2Fimages%2Fconcrete%2Fprofessional-concrete-contractors-houston-tx.jpg&w=1440&q=70 1440w"
          imageSizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white/95 backdrop-blur-sm border border-slate-200`}
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
