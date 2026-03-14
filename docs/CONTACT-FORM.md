# Contact Form Setup Guide

This guide covers setting up and configuring the contact form system, including email notifications, auto-reply functionality, and database storage.

## Overview

The contact form system consists of three main components:

1. **Frontend Form** (`src/app/contact/page.tsx`) - Client-side form with validation, loading states, and toast notifications
2. **API Route** (`src/app/api/contact/route.ts`) - Server-side form handler
3. **Database** (PostgreSQL via Neon) - Stores all submissions

### Email Flow

When a user submits the form:
1. Form data is validated on both client and server
2. Submit button shows loading spinner and "Sending..." text
3. Submission is saved to the database
4. **Notification email** is sent to the company (with reply-to set to customer)
5. **Auto-reply email** with branded HTML template is sent to the customer
6. Toast notification appears in top-right corner

## Prerequisites

- [Resend](https://resend.com) account for email delivery
- [Neon](https://neon.tech) PostgreSQL database
- Verified domain for sending emails

## 1. Neon Database Setup

### Create Neon Project

1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project (e.g., `balderas_concrete`)
3. Note your project is in a specific region (e.g., `us-east-1`)

### Connection String

Get your connection string from Neon dashboard. Use the **pooled** connection for serverless:

```env
# Use pooled connection for Vercel serverless
DATABASE_URL="postgresql://neondb_owner:PASSWORD@ep-xxxxx-pooler.REGION.aws.neon.tech/neondb?sslmode=require"
```

**Important**: Remove `channel_binding=require` from the connection string when deploying to Vercel - it can cause authentication issues in serverless environments.

### Prisma Schema

The contact submissions use this schema (`prisma/schema.prisma`):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  output        = "../src/generated/prisma"
  binaryTargets = ["native", "rhel-openssl-3.0.x", "debian-openssl-3.0.x"]
}

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

**Key Configuration Notes**:
- Use `prisma-client-js` provider (not `prisma-client`) for stability
- Include `rhel-openssl-3.0.x` and `debian-openssl-3.0.x` binary targets for Vercel deployment
- Output to custom path `../src/generated/prisma`

### Prisma Client Setup

The Prisma client (`src/lib/prisma.ts`) uses a singleton pattern:

```typescript
import { PrismaClient } from "@/src/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

**Note**: We use the standard Prisma client without the Neon adapter. The pooled connection URL works directly with Prisma in Vercel serverless functions.

### Generate and Push Schema

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### View Submissions

```bash
npx prisma studio
```

Or query in Neon console:
```sql
SELECT * FROM "ContactSubmission" ORDER BY "createdAt" DESC;
```

## 2. Resend Email Setup

### Create Account & API Key

1. Go to [resend.com](https://resend.com) and create an account
2. Navigate to **API Keys** > **Create API Key**
3. Copy the key (starts with `re_`)

### Verify Domain

1. Go to **Domains** > **Add Domain**
2. Enter your domain (e.g., `balderasconcrete.com`)
3. Add the DNS records Resend provides
4. Wait for verification

### Email Configuration

The system sends two emails:

1. **Notification to Company**: Plain text with all form details, `replyTo` set to customer email
2. **Auto-Reply to Customer**: Branded HTML template with logo

## 3. Environment Variables

### Local Development (`.env.local`)

```env
# Database (Neon PostgreSQL - use pooled connection)
DATABASE_URL="postgresql://neondb_owner:PASSWORD@ep-xxxxx-pooler.REGION.aws.neon.tech/neondb?sslmode=require"

# Resend Email Service
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxx"

# Email Configuration
EMAIL_FROM="no-reply@mail.balderasconcrete.com"
CONTACT_NOTIFICATION_EMAIL="owner@balderasconcrete.com"

# Optional
COMPANY_PHONE="(281) 720-9070"
WEBSITE_URL="https://balderasconcrete.com"
```

### Vercel Production

Add these in Vercel Dashboard > Settings > Environment Variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon pooled connection (without `channel_binding=require`) | Yes |
| `RESEND_API_KEY` | Resend API key | Yes |
| `EMAIL_FROM` | Verified sender email | Yes |
| `CONTACT_NOTIFICATION_EMAIL` | Where to receive submissions | Yes |
| `COMPANY_PHONE` | Phone shown in auto-reply | No |
| `WEBSITE_URL` | Used for logo URL in emails | No |

## 4. Frontend Features

### Toast Notifications

Toast notifications are configured in `src/app/layout.tsx`:

```typescript
import { Toaster } from "sonner";

<Toaster
  position="top-right"  // Visible regardless of scroll position
  richColors
  closeButton
  toastOptions={{
    duration: 5000,
  }}
/>
```

### Loading State

The submit button shows a loading state during submission:

```typescript
<button
  type="submit"
  disabled={mutation.isPending}
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
  {mutation.isPending ? (
    <>
      <SpinnerIcon /> Sending...
    </>
  ) : (
    "Submit Request"
  )}
</button>
```

### Form Validation

Uses React Hook Form with Zod validation:

```typescript
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().optional(),
  city: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Please provide at least 10 characters"),
});
```

## 5. HTML Email Template

The auto-reply email uses a branded HTML template with:

- Company logo (loaded from `WEBSITE_URL/images/logo/logo.png`)
- Brand colors (#2C4557 header)
- Request summary box
- Click-to-call button
- Plain text fallback

```typescript
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Thank You - Balderas Concrete</title>
</head>
<body>
  <table>
    <!-- Header with logo -->
    <tr>
      <td style="background-color: #2C4557; padding: 30px 40px; text-align: center;">
        <img
          src="${websiteUrl}/images/logo/logo.png"
          alt="Balderas Concrete"
          width="56"
          height="56"
        />
        <h1>BALDERAS CONCRETE</h1>
      </td>
    </tr>
    <!-- Content -->
    ...
  </table>
</body>
</html>
`;
```

**Important**: Use standard HTML `<img>` tags with absolute URLs in email templates, not React's `<Image>` component.

## 6. Deployment

### Deploy to Vercel

```bash
npx vercel --prod
```

### Deployment Checklist

- [ ] Verify `DATABASE_URL` in Vercel uses pooled connection
- [ ] Verify `DATABASE_URL` does NOT contain `channel_binding=require`
- [ ] All required environment variables are set
- [ ] Domain is verified in Resend
- [ ] Run `npx prisma db push` if schema changed

### Common Production Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| 500 error on submit | `PrismaClientInitializationError` | Use `prisma-client-js` provider, include all binary targets |
| Query Engine not found | Wrong binary targets | Add `rhel-openssl-3.0.x` and `debian-openssl-3.0.x` |
| Database connection fails | `channel_binding=require` | Remove from Vercel `DATABASE_URL` |
| Emails not arriving | Domain not verified | Complete DNS verification in Resend |
| Logo not showing in email | Relative URL | Use absolute URL with `WEBSITE_URL` |

## 7. Troubleshooting

### Test Production API

```bash
curl -X POST https://balderasconcrete.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message here"}'
```

Expected response:
```json
{"success":true}
```

### Check Vercel Logs

```bash
npx vercel logs balderasconcrete.com
```

### Debug Database Connection

1. Verify DATABASE_URL format in Vercel
2. Check Neon dashboard for connection status
3. Ensure table exists: `npx prisma db push`

### Check Resend Logs

1. Go to Resend dashboard > **Emails**
2. View sent/failed emails with error details

## 8. Security

### Reply-To Header

The notification email uses `replyTo` so replies go directly to the customer:

```typescript
await resend.emails.send({
  from: `Balderas Concrete <${process.env.EMAIL_FROM}>`,
  to: process.env.CONTACT_NOTIFICATION_EMAIL,
  replyTo: data.email,  // Replies go to customer
  subject: `New contact from ${data.name}`,
  text: "...",
});
```

### Input Validation

Both client and server validate inputs using Zod schemas to prevent injection attacks.

## Related Documentation

- [Resend Documentation](https://resend.com/docs)
- [Prisma with Neon](https://www.prisma.io/docs/guides/database/neon)
- [Neon Serverless Driver](https://neon.tech/docs/serverless/serverless-driver)
- [Sonner Toast Documentation](https://sonner.emilkowal.ski/)
