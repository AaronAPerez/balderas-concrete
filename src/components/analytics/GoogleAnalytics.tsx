"use client";

import Script from "next/script";
import { useEffect } from "react";
import { reportWebVitals } from "@/src/lib/webVitals";

interface GoogleAnalyticsProps {
  gaId: string;
}

/**
 * Google Analytics 4 Component
 * Loads GA4 script and initializes web vitals reporting
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  // Initialize Web Vitals reporting after GA loads
  useEffect(() => {
    // Small delay to ensure gtag is available
    const timer = setTimeout(() => {
      reportWebVitals();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

/**
 * Generic event tracking helper
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track phone number clicks
 * Use this when a user clicks a tel: link
 */
export function trackPhoneClick(location: string) {
  trackEvent("phone_click", "Contact", location);

  // Also log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Phone click from: ${location}`);
  }
}

/**
 * Track CTA button clicks
 * Use this for "Get a Quote", "Contact Us", etc.
 */
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent("cta_click", "Engagement", `${ctaName} - ${location}`);

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] CTA click: ${ctaName} from ${location}`);
  }
}

/**
 * Track email link clicks
 */
export function trackEmailClick(location: string) {
  trackEvent("email_click", "Contact", location);

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Email click from: ${location}`);
  }
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formName: string, success: boolean) {
  trackEvent(
    success ? "form_submit_success" : "form_submit_error",
    "Forms",
    formName
  );

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Form ${formName}: ${success ? "success" : "error"}`);
  }
}

/**
 * Track gallery image views
 */
export function trackGalleryView(imageIndex: number, imageName?: string) {
  trackEvent("gallery_view", "Engagement", imageName || `Image ${imageIndex + 1}`);

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Gallery view: ${imageName || `Image ${imageIndex + 1}`}`);
  }
}
