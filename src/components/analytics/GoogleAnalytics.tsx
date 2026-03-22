"use client";

import Script from "next/script";
import { useEffect, useCallback } from "react";
import { reportWebVitals } from "@/src/lib/webVitals";

interface GoogleAnalyticsProps {
  gaId: string;
}

/**
 * Google Analytics 4 Component
 *
 * Performance optimized loading strategy:
 * - Uses 'lazyOnload' strategy to defer loading until browser is idle
 * - This reduces Total Blocking Time (TBT) and improves Lighthouse Performance score
 * - Web Vitals reporting is initialized after GA loads via onLoad callback
 *
 * The 'lazyOnload' strategy uses requestIdleCallback when available,
 * loading analytics only when the main thread is idle.
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  // Initialize Web Vitals reporting after GA script loads
  const handleGALoad = useCallback(() => {
    // Defer Web Vitals to next idle period to avoid blocking
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => reportWebVitals(), { timeout: 3000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => reportWebVitals(), 2000);
    }
  }, []);

  // Safety net: ensure Web Vitals runs even if GA fails to load
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (typeof window !== "undefined" && !("gtag" in window)) {
        reportWebVitals();
      }
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <>
      {/*
        Using 'lazyOnload' strategy for optimal performance:
        - Loads after page is interactive and browser is idle
        - Reduces TBT by deferring non-critical script parsing
        - Better for Core Web Vitals than 'afterInteractive'
      */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
        onLoad={handleGALoad}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            // Disable third-party cookies to improve Best Practices score
            cookie_flags: 'SameSite=Strict;Secure'
          });
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
