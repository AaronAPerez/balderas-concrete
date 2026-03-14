import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { Resend } from "resend";

/**
 * Contact form submission schema
 * Validates incoming form data before processing
 */
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z
    .string()
    .min(5)
    .max(100)
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Invalid email address",
    }),
  phone: z.string().optional(),
  service: z.string().optional(),
  city: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10).max(1000),
});

// Initialize Resend client for email delivery
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/contact
 * Handles contact form submissions:
 * 1. Validates form data
 * 2. Saves submission to database
 * 3. Sends notification email to company
 * 4. Sends auto-reply confirmation to customer
 */
export async function POST(req: Request) {
  try {
    // Check for required environment variables
    if (!process.env.DATABASE_URL) {
      console.error("Missing DATABASE_URL environment variable");
      return NextResponse.json(
        { success: false, error: "Database not configured" },
        { status: 500 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 },
      );
    }

    if (!process.env.EMAIL_FROM) {
      console.error("Missing EMAIL_FROM environment variable");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 },
      );
    }

    if (!process.env.CONTACT_NOTIFICATION_EMAIL) {
      console.error("Missing CONTACT_NOTIFICATION_EMAIL environment variable");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 },
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      const zodErrors = parseResult.error.issues;
      console.error("Validation error:", zodErrors);
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: zodErrors.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const data = parseResult.data;

    // Save to database
    try {
      await prisma.contactSubmission.create({ data });
    } catch (dbError) {
      // Log detailed error for debugging
      console.error("Database error details:", {
        name: (dbError as Error).name,
        message: (dbError as Error).message,
        stack: (dbError as Error).stack,
      });

      // Return error details for debugging (temporarily enabled for production)
      const errorMessage =
        (dbError as Error).message || "Unknown database error";
      const errorName = (dbError as Error).name || "Unknown";
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save submission",
          errorType: errorName,
          errorDetail: errorMessage.substring(0, 200), // Truncate for safety
        },
        { status: 500 },
      );
    }

    // Send notification email to company
    // EMAIL_FROM env var: use "onboarding@resend.dev" for dev, "no-reply@mail.balderasconcrete.com" for production
    try {
      const notificationResult = await resend.emails.send({
        from: `Balderas Concrete <${process.env.EMAIL_FROM}>`,
        to: process.env.CONTACT_NOTIFICATION_EMAIL,
        replyTo: data.email, // Reply goes directly to the user who submitted the form
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

      if (notificationResult.error) {
        console.error("Notification email error:", notificationResult.error);
      }
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Continue anyway - the submission is saved
    }

    // Send auto-reply confirmation to customer with branded HTML template
    try {
      const companyPhone = process.env.COMPANY_PHONE ?? "(281) 720-9070";
      const websiteUrl =
        process.env.WEBSITE_URL ?? "https://balderasconcrete.com";

      // Branded HTML email template with logo
      const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Balderas Concrete</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header with brand color and logo -->
          <tr>
            <td style="background-color: #2C4557; padding: 30px 40px; text-align: center;">
              <img
                src="${websiteUrl}/images/logo/logo.png"
                alt="Balderas Concrete"
                width="56"
                height="56"
                style="display: block; margin: 0 auto 15px auto;"
              />
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">BALDERAS CONCRETE</h1>
              <p style="color: #9CA3AF; margin: 8px 0 0 0; font-size: 14px; letter-spacing: 1px;">QUALITY CONCRETE SERVICES</p>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #2C4557; margin: 0 0 20px 0; font-size: 22px;">Thank You, ${data.name}!</h2>

              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                We've received your request and appreciate you reaching out to Balderas Concrete. Our team will review your project details and get back to you within <strong>24 hours</strong>.
              </p>

              <!-- Request summary box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 6px; margin: 25px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="color: #2C4557; font-weight: bold; margin: 0 0 10px 0; font-size: 14px;">YOUR REQUEST SUMMARY:</p>
                    ${data.service ? `<p style="color: #4B5563; margin: 5px 0; font-size: 14px;"><strong>Service:</strong> ${data.service}</p>` : ""}
                    ${data.city ? `<p style="color: #4B5563; margin: 5px 0; font-size: 14px;"><strong>Location:</strong> ${data.city}</p>` : ""}
                    ${data.budget ? `<p style="color: #4B5563; margin: 5px 0; font-size: 14px;"><strong>Budget:</strong> ${data.budget}</p>` : ""}
                  </td>
                </tr>
              </table>

              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Need immediate assistance? Give us a call:
              </p>

              <!-- Call button -->
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #2C4557; border-radius: 6px;">
                    <a href="tel:${companyPhone.replace(/[^0-9]/g, "")}" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                      📞 Call ${companyPhone}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1A2A3A; padding: 30px 40px; text-align: center;">
              <p style="color: #9CA3AF; margin: 0 0 10px 0; font-size: 14px;">
                Balderas Concrete | Houston, TX Area
              </p>
              <p style="color: #6B7280; margin: 0; font-size: 12px;">
                <a href="${websiteUrl}" style="color: #9CA3AF; text-decoration: none;">balderasconcrete.com</a>
              </p>
              <p style="color: #6B7280; margin: 15px 0 0 0; font-size: 11px;">
                Monday – Friday: 7:00 AM – 6:00 PM
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      // Plain text fallback for email clients that don't support HTML
      const textTemplate = `
Hi ${data.name},

Thank you for contacting Balderas Concrete! We've received your request and will get back to you within 24 hours.

${data.service ? `Service: ${data.service}` : ""}
${data.city ? `Location: ${data.city}` : ""}
${data.budget ? `Budget: ${data.budget}` : ""}

Need immediate assistance? Call us at ${companyPhone}

Best regards,
Balderas Concrete
${websiteUrl}
      `;

      const autoReplyResult = await resend.emails.send({
        from: `Balderas Concrete <${process.env.EMAIL_FROM}>`,
        to: data.email,
        subject: "We received your request – Balderas Concrete",
        html: htmlTemplate,
        text: textTemplate,
      });

      if (autoReplyResult.error) {
        console.error("Auto-reply email error:", autoReplyResult.error);
      }
    } catch (emailError) {
      console.error("Failed to send auto-reply email:", emailError);
      // Continue anyway - the submission is saved
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the full error for debugging
    console.error("Contact API error:", error);

    // Return a generic error message to the client
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
