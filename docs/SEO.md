# SEO Configuration Guide

This guide covers SEO configuration for the Balderas Concrete website.

## Meta Tags

Meta tags are configured in `src/app/layout.tsx` and individual page files.

### Global Configuration

Edit `src/lib/constants.ts` to update:

```typescript
export const siteConfig = {
  name: "Balderas Concrete",
  tagline: "Quality Concrete Services in Texas",
  description: "Your SEO description here...",
  url: "https://domain-name.com",
  ogImage: "/og-image.jpg",
};
```

### Per-Page Meta Tags

Each page exports its own metadata:

```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for search engines...",
};
```

## Sitemap

The sitemap is dynamically generated at `/sitemap.xml`.

Edit `src/app/sitemap.ts` to add/modify pages.

## Robots.txt

Generated at `/robots.txt` from `src/app/robots.ts`.

Current configuration:
- Allows all crawlers
- Blocks `/api/` and `/_next/`
- Points to sitemap

## Structured Data (JSON-LD)

The website includes LocalBusiness schema for rich search results.

### Updating Business Information

Edit `src/lib/constants.ts`:

```typescript
export const contactInfo = {
  phone: "(555) 123-4567",
  email: "contact@example.com",
  address: {
    street: "123 Main Street",
    city: "Houston",
    state: "TX",
    zip: "77001",
  },
  // ...
};
```

### Schema Location

- `src/components/seo/LocalBusinessSchema.tsx` - Main business schema
- Included in root layout automatically

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership (HTML tag method):
   - Add verification code to `NEXT_PUBLIC_GOOGLE_VERIFICATION` env var
4. Submit sitemap: `https://domain-name.com/sitemap.xml`

## Open Graph Images

Create a 1200x630 pixel image and save as `/public/og-image.jpg`.

This image appears when sharing on social media.

## Keywords

Target keywords are configured in `src/app/layout.tsx`:

```typescript
keywords: [
  "concrete contractor",
  "concrete services Texas",
  "driveway installation",
  // ...
],
```

## Best Practices

1. **Unique Titles**: Each page has a unique, descriptive title
2. **Meta Descriptions**: 150-160 characters, include primary keyword
3. **Semantic HTML**: Using proper heading hierarchy (h1, h2, h3)
4. **Alt Text**: All images have descriptive alt text
5. **Internal Linking**: Pages link to each other naturally
6. **Mobile-Friendly**: Responsive design verified

## Monitoring SEO Performance

- Google Search Console: Track rankings, clicks, impressions
- Google Analytics: Monitor organic traffic
- Lighthouse: Run periodic audits for SEO score
