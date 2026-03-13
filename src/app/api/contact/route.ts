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
  email: z.string().min(5).max(100).refine(
    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: 'Invalid email address' }
  ),
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
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    if (!process.env.EMAIL_FROM) {
      console.error("Missing EMAIL_FROM environment variable");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_NOTIFICATION_EMAIL) {
      console.error("Missing CONTACT_NOTIFICATION_EMAIL environment variable");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
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
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Save to database
    try {
      await prisma.contactSubmission.create({ data });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { success: false, error: "Failed to save submission" },
        { status: 500 }
      );
    }

    // Send notification email to company
    // EMAIL_FROM env var: use "onboarding@resend.dev" for dev, "no-reply@mail.balderasconcrete.com" for production
    try {
      const notificationResult = await resend.emails.send({
        from: `Balderas Concrete <${process.env.EMAIL_FROM}>`,
        to: process.env.CONTACT_NOTIFICATION_EMAIL,
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

    // Send auto-reply confirmation to customer
    try {
      const autoReplyResult = await resend.emails.send({
        from: `Balderas Concrete <${process.env.EMAIL_FROM}>`,
        to: data.email,
        subject: "We received your request – Balderas Concrete",
        text: `
Hi ${data.name},

Thank you for contacting Balderas Concrete. We've received your request and will get back to you shortly.

If this is urgent, please call us at ${process.env.COMPANY_PHONE ?? "(832) 724-1543"}.

Best regards,
Balderas Concrete
        `,
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
      { status: 500 }
    );
  }
}