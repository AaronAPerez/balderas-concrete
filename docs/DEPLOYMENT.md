# Deployment Guide

This guide covers deploying the Balderas Concrete website to production.

## Recommended: Vercel

Vercel is the recommended hosting platform for Next.js applications.

### Steps

1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)

2. **Connect Repository**: Link your GitHub/GitLab repository

3. **Configure Environment Variables**:
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.local`

4. **Deploy**: Push to main branch to trigger deployment

### Environment Variables on Vercel

Add these in the Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `RESEND_API_KEY` | Resend API key for emails |
| `CONTACT_NOTIFICATION_EMAIL` | Email to receive contact form submissions |
| `COMPANY_PHONE` | Company phone number |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID |
| `NEXT_PUBLIC_SITE_URL` | Production URL (e.g., https://balderasconcrete.com) |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console verification |

## Database Setup (Neon)

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string to `DATABASE_URL`
3. Run migrations:
```bash
npx prisma db push
```

## Domain Configuration

1. Add your domain in Vercel project settings
2. Configure DNS records as instructed
3. SSL is automatic with Vercel

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test contact form submission
- [ ] Check email delivery (both notification and auto-reply)
- [ ] Verify sitemap.xml is accessible
- [ ] Verify robots.txt is accessible
- [ ] Run Lighthouse audit
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics

## Alternative: Self-Hosting

If self-hosting on a VPS:

1. Build the application:
```bash
npm run build
```

2. Start with PM2:
```bash
pm2 start npm --name "balderas-concrete" -- start
```

3. Set up Nginx reverse proxy
4. Configure SSL with Let's Encrypt

## Monitoring

- **Vercel Analytics**: Enable in project settings
- **Google Analytics**: Add `NEXT_PUBLIC_GA_ID`
- **Error Tracking**: Consider Sentry (free tier available)
