# Contact Form Setup Guide

This guide covers setting up and configuring the contact form system, including email notifications, auto-reply functionality, and database storage.

## Overview

The contact form system consists of three main components:

1. **Frontend Form** (`src/app/contact/page.tsx`) - Client-side form with validation
2. **API Route** (`src/app/api/contact/route.ts`) - Server-side form handler
3. **Database** (PostgreSQL via Neon) - Stores all submissions

### Email Flow

When a user submits the form:
1. Form data is validated on both client and server
2. Submission is saved to the database
3. **Notification email** is sent to the company
4. **Auto-reply email** is sent to the customer

## Prerequisites

- [Resend](https://resend.com) account for email delivery
- [Neon](https://neon.tech) PostgreSQL database (or compatible PostgreSQL)
- Verified domain for sending emails

## 1. Resend Setup

### Create Account

1. Go to [resend.com](https://resend.com) and create an account
2. Verify your email address

### Get API Key

1. Navigate to **API Keys** in the Resend dashboard
2. Click **Create API Key**
3. Name it (e.g., `balderas-concrete-production`)
4. Copy the key (starts with `re_`)

### Verify Domain

**Important**: To send emails from your own domain (e.g., `no-reply@balderasconcrete.com`), you must verify the domain.

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `balderasconcrete.com`)
4. Add the DNS records Resend provides:

| Type | Name | Value |
|------|------|-------|
| MX | send | feedback-smtp.region.amazonses.com |
| TXT | send | v=spf1 include:amazonses.com ~all |
| TXT | resend._domainkey | (provided by Resend) |

5. Wait for verification (can take up to 72 hours, usually faster)
6. Once verified, you can send from any address at that domain

### Testing Without Domain Verification

During development, you can use Resend's test domain:
- From address: `onboarding@resend.dev`
- Limited to sending to the email you signed up with

## 2. Database Setup

### Prisma Schema

The contact submissions are stored using this schema (`prisma/schema.prisma`):

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

### Database Connection

1. Create a Neon project at [neon.tech](https://neon.tech)
2. Get your connection string from the dashboard
3. Add to environment variables:
   ```env
   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
   ```

### Generate Prisma Client

```bash
npx prisma generate
```

### Push Schema to Database

```bash
npx prisma db push
```

### View Submissions

Use Prisma Studio to view form submissions:
```bash
npx prisma studio
```

Or query directly in Neon console:
```sql
SELECT * FROM "ContactSubmission" ORDER BY "createdAt" DESC;
```

## 3. Environment Variables

Add these to your `.env.local` file:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Resend Email Service
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxx"

# Email Configuration
CONTACT_NOTIFICATION_EMAIL="owner@balderasconcrete.com"
COMPANY_PHONE="(832) 678-9095"
```

### Variable Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `RESEND_API_KEY` | Resend API key | `re_abc123...` |
| `CONTACT_NOTIFICATION_EMAIL` | Email to receive form submissions | `owner@company.com` |
| `COMPANY_PHONE` | Phone shown in auto-reply | `(555) 123-4567` |

## 4. API Route Configuration

The API route (`src/app/api/contact/route.ts`) handles:

### Form Validation

Uses Zod schema to validate incoming data:

```typescript
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  city: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10),
});
```

### Company Notification Email

Sent to `CONTACT_NOTIFICATION_EMAIL` with all form details:

```typescript
await resend.emails.send({
  from: "Balderas Concrete <no-reply@balderasconcrete.com>",
  to: process.env.CONTACT_NOTIFICATION_EMAIL!,
  subject: `New contact from ${data.name}`,
  text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone ?? "N/A"}
Service: ${data.service ?? "N/A"}
City: ${data.city ?? "N/A"}
Budget: ${data.budget ?? "N/A"}

Message:
${data.message}
  `,
});
```

### Auto-Reply to Customer

Sent to the customer's email address:

```typescript
await resend.emails.send({
  from: "Balderas Concrete <no-reply@balderasconcrete.com>",
  to: data.email,
  subject: "We received your request – Balderas Concrete",
  text: `
Hi ${data.name},

Thank you for contacting Balderas Concrete. We've received your request and will get back to you shortly.

If this is urgent, please call us at ${process.env.COMPANY_PHONE ?? "our main phone number"}.

Best regards,
Balderas Concrete
  `,
});
```

## 5. Customizing Emails

### Change From Address

Update the `from` field in both email sends:

```typescript
from: "Your Company <no-reply@yourdomain.com>",
```

**Note**: The domain must be verified in Resend.

### Add HTML Emails

For richer emails, use the `html` property instead of `text`:

```typescript
await resend.emails.send({
  from: "Balderas Concrete <no-reply@balderasconcrete.com>",
  to: data.email,
  subject: "We received your request",
  html: `
    <h1>Thank you, ${data.name}!</h1>
    <p>We've received your request and will get back to you shortly.</p>
    <p>Call us at <a href="tel:${process.env.COMPANY_PHONE}">${process.env.COMPANY_PHONE}</a></p>
  `,
});
```

### Use React Email Templates

For more complex emails, consider using [React Email](https://react.email):

```bash
npm install @react-email/components
```

Then create templates in `src/emails/` directory.

## 6. Email Forwarding Options

### Multiple Recipients

To notify multiple people, use an array:

```typescript
to: ["owner@company.com", "sales@company.com"],
```

### CC and BCC

```typescript
await resend.emails.send({
  from: "...",
  to: "primary@company.com",
  cc: ["manager@company.com"],
  bcc: ["records@company.com"],
  subject: "...",
  text: "...",
});
```

### Reply-To Header

Set reply-to so responses go to the customer:

```typescript
await resend.emails.send({
  from: "Balderas Concrete <no-reply@balderasconcrete.com>",
  to: process.env.CONTACT_NOTIFICATION_EMAIL!,
  replyTo: data.email,  // Replies go to customer
  subject: `New contact from ${data.name}`,
  text: "...",
});
```

## 7. Testing

### Local Testing

1. Start development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/contact`

3. Fill out the form and submit

4. Check:
   - Console for any errors
   - `CONTACT_NOTIFICATION_EMAIL` inbox for notification
   - Customer email for auto-reply
   - Prisma Studio for database entry

### Test with Resend Sandbox

During development without a verified domain:
- Change `from` to `onboarding@resend.dev`
- Emails only deliver to your Resend account email

### Verify Database Storage

```bash
npx prisma studio
```

Open browser and check `ContactSubmission` table.

## 8. Production Deployment

### Vercel Deployment

1. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `RESEND_API_KEY`
   - `CONTACT_NOTIFICATION_EMAIL`
   - `COMPANY_PHONE`

2. Ensure domain is verified in Resend

3. Deploy:
   ```bash
   vercel --prod
   ```

### Post-Deployment Checklist

- [ ] Submit test form on production site
- [ ] Verify notification email arrives
- [ ] Verify auto-reply email arrives
- [ ] Check database for submission
- [ ] Test from different email providers (Gmail, Outlook, etc.)

## 9. Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| 400 error on submit | Validation failed | Check browser console for specific field |
| Emails not arriving | Domain not verified | Complete DNS verification in Resend |
| Emails in spam | Domain reputation | Add SPF/DKIM records, warm up domain |
| Database error | Connection issue | Check `DATABASE_URL` is correct |
| API key invalid | Wrong key | Regenerate key in Resend dashboard |

### Check Resend Logs

1. Go to Resend dashboard
2. Click **Emails** in sidebar
3. View sent/failed emails with details

### Debug API Route

Add logging to see what's happening:

```typescript
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Form data received:", body);

    const data = contactSchema.parse(body);
    console.log("Validation passed");

    await prisma.contactSubmission.create({ data });
    console.log("Saved to database");

    // ... email sends

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
```

### Email Deliverability

To improve email deliverability:

1. **SPF Record**: Already included with Resend setup
2. **DKIM**: Resend provides this record
3. **DMARC**: Add optional record:
   ```
   TXT _dmarc.yourdomain.com "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com"
   ```

## 10. Security Considerations

### Rate Limiting

Consider adding rate limiting to prevent abuse:

```typescript
// Example using upstash/ratelimit
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 per hour
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }
  // ... rest of handler
}
```

### Honeypot Field

Add a hidden field to catch bots:

```typescript
// In form schema
const schema = z.object({
  // ... existing fields
  website: z.string().max(0), // Honeypot - should be empty
});

// In form JSX (hidden from users, visible to bots)
<input
  {...register("website")}
  className="absolute -left-2499.75"
  tabIndex={-1}
  autoComplete="off"
/>
```

### Input Sanitization

The Zod validation provides basic sanitization. For additional security, consider sanitizing HTML:

```bash
npm install sanitize-html
```

## Related Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [Analytics Setup](./ANALYTICS.md) - Track form submissions
- [Resend Documentation](https://resend.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
