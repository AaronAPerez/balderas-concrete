# Analytics Setup Guide

This guide covers setting up and using analytics for the Balderas Concrete website.

## Google Analytics 4

### Setup

1. **Create GA4 Property**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property
   - Get Measurement ID (starts with `G-`)

2. **Add to Environment Variables**:
   ```env
   NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
   ```

3. **Deploy**: Analytics will automatically be enabled

### Implementation

The GA4 script is in `src/components/analytics/GoogleAnalytics.tsx` and loaded in the root layout.

### Event Tracking

Use the `trackEvent` helper for custom events:

```typescript
import { trackEvent } from "@/src/components/analytics/GoogleAnalytics";

// Track button click
trackEvent("click", "CTA", "Get Free Estimate");

// Track form submission
trackEvent("submit", "Contact Form", "Contact Page");

// Track phone call
trackEvent("click", "Phone", contactInfo.phone);
```

### Recommended Events to Track

| Event | Category | Label |
|-------|----------|-------|
| Form Submission | Contact Form | Page name |
| Phone Click | Phone | Phone number |
| CTA Click | CTA | Button text |
| Gallery View | Gallery | Image index |
| Service Click | Services | Service name |

## Google Search Console

### Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add domain
3. Verify using HTML tag method:
   - Add code to `NEXT_PUBLIC_GOOGLE_VERIFICATION` env var
4. Submit sitemap: `https://domain-name.com/sitemap.xml`

### Monitoring

- **Performance**: Track search queries, clicks, impressions
- **Coverage**: Monitor indexed pages
- **Experience**: Core Web Vitals data

## Vercel Analytics

If hosted on Vercel, enable built-in analytics:

1. Go to Project Settings > Analytics
2. Enable Web Analytics and/or Speed Insights
3. No code changes needed

Features:
- Real-time traffic data
- Core Web Vitals monitoring
- Audience insights

## Privacy Considerations

### Cookie Consent

For GDPR compliance, consider adding a cookie consent banner before loading analytics.

### Privacy Policy

Update `/privacy` page with:
- What data is collected
- How it's used
- Third-party services (Google Analytics, etc.)

## Dashboard Setup

Create a GA4 dashboard with these reports:

1. **Overview**
   - Users
   - Sessions
   - Bounce rate
   - Average session duration

2. **Acquisition**
   - Traffic sources
   - Organic search queries
   - Referrals

3. **Engagement**
   - Page views by page
   - Events (form submissions, phone clicks)
   - Conversions

4. **Conversions**
   - Set up goals:
     - Contact form submission
     - Phone number clicks
     - Get estimate button clicks

## Monthly Reporting

Track these KPIs monthly:

- [ ] Total website visitors
- [ ] Organic search traffic
- [ ] Contact form submissions
- [ ] Phone call clicks
- [ ] Top landing pages
- [ ] Bounce rate by page
- [ ] Mobile vs desktop traffic
- [ ] Core Web Vitals scores
