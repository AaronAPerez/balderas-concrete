# Balderas Concrete Website

A modern, responsive website for Balderas Concrete, a professional concrete contractor serving the greater Houston, Texas area.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI**: React 19.2.3 + Tailwind CSS 4.1.18
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Database**: PostgreSQL via Neon (serverless)
- **ORM**: Prisma 6.19.2
- **Email**: Resend
- **Type Safety**: TypeScript 5

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd balderas-concrete
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run database migrations:
```bash
npx prisma db push
```

6. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://..."

# Email (Resend)
RESEND_API_KEY="re_..."
CONTACT_NOTIFICATION_EMAIL="your-email@example.com"
COMPANY_PHONE="(555) 123-4567"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# SEO
NEXT_PUBLIC_SITE_URL="https://domain-NAME.com"
NEXT_PUBLIC_GOOGLE_VERIFICATION="verification-code"
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── contact/           # Contact page
│   ├── gallery/           # Gallery page
│   ├── services/          # Services page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/
│   ├── analytics/         # Google Analytics
│   ├── features/          # Feature components (Hero, CTA, etc.)
│   ├── layout/            # Header, Footer, MobileNav
│   ├── seo/               # JSON-LD schemas
│   └── ui/                # Reusable UI components
├── lib/
│   ├── constants.ts       # Site configuration
│   └── prisma.ts          # Prisma client
├── store/
│   └── uiStore.ts         # Zustand UI state
└── generated/
    └── prisma/            # Generated Prisma client
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- **Responsive Design**: Mobile-first with 44px touch targets
- **SEO Optimized**: Meta tags, sitemap, robots.txt, JSON-LD
- **Performance**: Optimized images, caching headers
- **Accessibility**: WCAG 2.1 AA compliant
- **Contact Form**: With email notifications and auto-reply
- **Analytics Ready**: Google Analytics 4 integration

## Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [SEO Configuration](./SEO.md)
- [Performance Guide](./PERFORMANCE.md)
- [Brand Colors](./COLORS.md)
- [Analytics Setup](./ANALYTICS.md)

## License

Private - All rights reserved.
