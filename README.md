# Balderas Concrete

Professional concrete and earthwork contractor website serving Houston and surrounding areas. Built with Next.js 16, React 19, and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)

## Overview

A modern, SEO-optimized website for Balderas Concrete, a commercial and industrial concrete contractor with 30+ years of experience. The site showcases their services including turnkey concrete, earthwork & site work, and underground utilities.

### Hero Section
![Balderas Concrete Hero Section](public/images/hero.png)

## Features

- **Modern Stack**: Next.js 16 App Router with React 19 and TypeScript
- **SEO Optimized**: Dynamic sitemap, robots.txt, JSON-LD structured data, and meta tags
- **Performance**: Optimized images, lazy loading, and Lighthouse-focused architecture
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Mobile-First**: Responsive design with mobile navigation
- **Contact System**: Form submissions stored in PostgreSQL via Prisma, with email notifications via Resend
- **Analytics**: Vercel Analytics and Web Vitals tracking
- **Animations**: Smooth transitions with Framer Motion

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript 5 |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 6 |
| Email | Resend |
| State | Zustand, React Query |
| Forms | React Hook Form + Zod validation |
| Animations | Framer Motion |
| Analytics | Vercel Analytics, Web Vitals |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── api/                # API routes (contact, email, health)
│   ├── areas/              # Service area pages (dynamic routes)
│   ├── contact/            # Contact page with form
│   ├── gallery/            # Project gallery
│   ├── privacy/            # Privacy policy
│   ├── services/           # Services page
│   ├── terms/              # Terms of service
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/
│   ├── analytics/          # Google Analytics component
│   ├── features/           # Feature components (Hero, CTA, Gallery, etc.)
│   ├── layout/             # Header, Footer, MobileNav
│   ├── seo/                # JSON-LD and schema components
│   └── ui/                 # Reusable UI components (Button, Container, etc.)
├── generated/prisma/       # Prisma generated client
├── lib/                    # Utilities and configuration
│   ├── constants.ts        # Site config, services, navigation
│   ├── prisma.ts           # Prisma client instance
│   ├── serviceAreaData.ts  # Service area data
│   └── webVitals.ts        # Performance monitoring
├── store/                  # Zustand state management
└── types/                  # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/balderas-concrete.git
   cd balderas-concrete
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your `.env.local`:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

   # Site URL
   NEXT_PUBLIC_SITE_URL="https://www.balderasconcrete.com"
   WEBSITE_URL="https://www.balderasconcrete.com"

   # Email (Resend)
   RESEND_API_KEY="re_xxxxxxxxxxxx"
   CONTACT_EMAIL="contact@balderasconcrete.com"

   # Analytics (optional)
   NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
   ```

5. Generate Prisma client:
   ```bash
   npm run db:generate
   ```

6. Push database schema:
   ```bash
   npm run db:push
   ```

7. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run optimize-images` | Optimize images with Sharp |

## Database Schema

The project uses Prisma with PostgreSQL. Current models:

```prisma
model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  service   String?
  city      String?
  budget    String?
  message   String
  createdAt DateTime @default(now())
}
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Submit contact form |
| `/api/email/inbound` | POST | Handle inbound emails |
| `/api/health` | GET | Health check endpoint |

## Services Offered

- **Earthwork & Site Work**: Land clearing, demolition, grading, excavating, building pads, detention ponds
- **Turnkey Concrete**: Foundations, slabs, post-tension, tilt-up panels, industrial concrete, WWTP
- **Underground Utilities**: Sanitary sewer, waterline, storm sewer systems, trench drains

## Service Areas

Houston and surrounding areas within a 75-mile radius, including:
- Houston, Katy, Sugar Land, Pearland, Cypress
- Spring, The Woodlands, Pasadena, Baytown
- League City, Conroe, Galveston, and more

## Deployment

The site is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy

For other platforms, build and start:
```bash
npm run build
npm run start
```

## Development Principles

- **Performance**: Target 100 Lighthouse scores across all categories
- **Accessibility**: WCAG compliance, screen reader compatibility, keyboard navigation
- **Mobile-First**: Responsive design with mobile-friendly touch targets
- **SEO**: Structured data, dynamic sitemaps, optimized meta tags
- **Code Quality**: TypeScript, ESLint, documented components

## License

Private - All rights reserved.

---

Built with Next.js by [Aaron Perez](https://github.com/aaronaperez)
