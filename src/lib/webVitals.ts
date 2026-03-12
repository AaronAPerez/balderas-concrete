/**
 * Web Vitals Reporting
 *
 * Tracks Core Web Vitals and sends them to Google Analytics:
 * - LCP (Largest Contentful Paint) - Loading performance
 * - FID (First Input Delay) - Interactivity
 * - CLS (Cumulative Layout Shift) - Visual stability
 * - FCP (First Contentful Paint) - Perceived load speed
 * - TTFB (Time to First Byte) - Server response time
 * - INP (Interaction to Next Paint) - Responsiveness
 */

import type { Metric } from "web-vitals";

// Rating thresholds for Core Web Vitals
// Note: FID is deprecated as of March 2024, replaced by INP
const vitalsThresholds = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  INP: { good: 200, needsImprovement: 500 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

/**
 * Get rating label based on metric value and thresholds
 */
function getRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
  const thresholds = vitalsThresholds[name as keyof typeof vitalsThresholds];
  if (!thresholds) return "good";

  if (value <= thresholds.good) return "good";
  if (value <= thresholds.needsImprovement) return "needs-improvement";
  return "poor";
}

/**
 * Send Web Vital metric to Google Analytics
 */
function sendToAnalytics(metric: Metric) {
  // Check if gtag is available
  if (typeof window === "undefined" || !("gtag" in window)) {
    // Log to console in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vital] ${metric.name}:`, {
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        rating: getRating(metric.name, metric.value),
        id: metric.id,
      });
    }
    return;
  }

  const gtag = window.gtag as (...args: unknown[]) => void;

  // Send event to Google Analytics
  // Use non-interaction to avoid affecting bounce rate
  gtag("event", metric.name, {
    // Built-in params
    event_category: "Web Vitals",
    event_label: metric.id,
    // Google Analytics 4 recommended params for web vitals
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    // Custom params for debugging
    metric_id: metric.id,
    metric_value: metric.value,
    metric_rating: getRating(metric.name, metric.value),
    // Non-interaction event
    non_interaction: true,
  });
}

/**
 * Report all Core Web Vitals
 * Call this function in your app to start tracking
 */
export async function reportWebVitals() {
  // Dynamically import web-vitals to reduce bundle size
  // Note: onFID is removed in web-vitals v4+, replaced by INP
  const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import("web-vitals");

  // Register callbacks for each Core Web Vital
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  onFCP(sendToAnalytics);  // First Contentful Paint
  onINP(sendToAnalytics);  // Interaction to Next Paint (replaced FID)
  onLCP(sendToAnalytics);  // Largest Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
}

/**
 * Report a single custom performance metric
 */
export function reportCustomMetric(name: string, value: number, label?: string) {
  if (typeof window === "undefined" || !("gtag" in window)) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Custom Metric] ${name}:`, value, label);
    }
    return;
  }

  const gtag = window.gtag as (...args: unknown[]) => void;

  gtag("event", name, {
    event_category: "Performance",
    event_label: label,
    value: Math.round(value),
    non_interaction: true,
  });
}
