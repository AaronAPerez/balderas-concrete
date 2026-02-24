# Performance Optimization Guide

This guide covers performance optimizations implemented in the Balderas Concrete website.

## Lighthouse Score Targets

| Metric | Target | Description |
|--------|--------|-------------|
| Performance | 100 | Fast loading and interactivity |
| Accessibility | 100 | WCAG 2.1 AA compliant |
| Best Practices | 100 | Security and modern standards |
| SEO | 100 | Search engine optimization |

## Image Optimization

### Next.js Image Component

All images use the `next/image` component for automatic optimization:

```tsx
import Image from "next/image";

<Image
  src="/images/concrete/photo.jpg"
  alt="Descriptive alt text"
  fill
  sizes="(max-width: 640px) 100vw, 50vw"
  priority // For above-fold images
/>
```

### Configuration

Image formats and sizes configured in `next.config.ts`:

```typescript
images: {
  formats: ["image/webp", "image/avif"],
  deviceSizes: [640, 768, 1024, 1280, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
}
```

### Best Practices

- Use `priority` for hero/above-fold images
- Use `loading="lazy"` for below-fold images (default)
- Always include `sizes` attribute
- Use appropriate `alt` text

## Font Optimization

Fonts are loaded using `next/font` for optimal performance:

```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevents layout shift
});
```

## Caching Strategy

Cache headers configured in `next.config.ts`:

- Static assets (images, fonts): 1 year cache
- Pages: Default Next.js caching

## Core Web Vitals

### LCP (Largest Contentful Paint)

- Hero images use `priority` attribute
- Fonts use `display: swap`
- Critical CSS is inlined

### FID/INP (First Input Delay / Interaction to Next Paint)

- Minimal JavaScript on initial load
- Event handlers are optimized
- Third-party scripts load `afterInteractive`

### CLS (Cumulative Layout Shift)

- All images have defined dimensions
- Fonts use `display: swap`
- No dynamic content that shifts layout

## Code Splitting

Next.js automatically code-splits by route. Additional optimization:

- Dynamic imports for heavy components (lightbox, maps)
- Route-based splitting via App Router

## Bundle Analysis

To analyze bundle size:

```bash
npm install @next/bundle-analyzer
```

Add to `next.config.ts`:

```typescript
import withBundleAnalyzer from '@next/bundle-analyzer';

const config = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  // your config
});
```

Run:
```bash
ANALYZE=true npm run build
```

## Testing Performance

1. **Lighthouse**: Chrome DevTools > Lighthouse
2. **PageSpeed Insights**: https://pagespeed.web.dev/
3. **WebPageTest**: https://www.webpagetest.org/

## Monitoring

- Vercel Analytics (built-in)
- Google Analytics (Core Web Vitals)
- Chrome UX Report (CrUX)
