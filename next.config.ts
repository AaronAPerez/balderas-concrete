import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"], // Prefer AVIF (smaller) over WebP
    // Device sizes optimized for common breakpoints - removed oversized options
    deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    qualities: [60, 70, 75],
    // Image sizes for thumbnails and smaller images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    // Note: quality is set per-image via the quality prop on Image components
  },

  // Experimental optimizations
  experimental: {
    optimizeCss: true, // Minify and optimize CSS output
  },

  // Use browserslist for SWC compilation - avoids unnecessary polyfills
  // Targets modern browsers only (defined in .browserslistrc)
  transpilePackages: [],

  // Performance headers
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Security headers for all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
