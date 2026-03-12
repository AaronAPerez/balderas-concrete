import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

/**
 * Inbound Email Webhook Handler
 *
 * Receives incoming emails via Resend webhook and forwards them
 * to the configured notification email address.
 *
 * Setup required:
 * 1. Add MX record in Vercel DNS: @ -> inbound.resend.com (priority 10)
 * 2. Enable inbound emails in Resend dashboard for your domain
 * 3. Add webhook in Resend: https://www.balderasconcrete.com/api/email/inbound
 * 4. Set RESEND_WEBHOOK_SECRET in Vercel environment variables
 */

const resend = new Resend(process.env.RESEND_API_KEY);

// Email address to forward incoming emails to
const FORWARD_TO = process.env.CONTACT_NOTIFICATION_EMAIL || "aaronperezdev@gmail.com";

// Email address to send forwarded emails from (must be verified in Resend)
const FORWARD_FROM = process.env.EMAIL_FROM || "no-reply@mail.balderasconcrete.com";

/**
 * Verify Resend webhook signature using svix
 * Ensures the webhook request is actually from Resend
 */
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !secret) {
    console.warn("[Inbound Email] Missing signature or secret, skipping verification");
    return true; // Skip verification if not configured (for development)
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

/**
 * Format the forwarded email body with original email info
 */
function formatForwardedEmail(
  fromAddress: string,
  toAddresses: string[],
  subject: string,
  htmlBody: string | null,
  textBody: string | null,
  receivedAt: string
): { html: string; text: string } {
  const header = `
---------- Forwarded message ----------
From: ${fromAddress}
To: ${toAddresses.join(", ")}
Date: ${new Date(receivedAt).toLocaleString()}
Subject: ${subject}
  `.trim();

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; font-size: 14px; color: #666;">
    <strong>---------- Forwarded message ----------</strong><br>
    <strong>From:</strong> ${fromAddress}<br>
    <strong>To:</strong> ${toAddresses.join(", ")}<br>
    <strong>Date:</strong> ${new Date(receivedAt).toLocaleString()}<br>
    <strong>Subject:</strong> ${subject}
  </div>
  <div>
    ${htmlBody || textBody?.replace(/\n/g, "<br>") || "(No content)"}
  </div>
</div>
  `.trim();

  const text = `${header}\n\n${textBody || "(No content)"}`;

  return { html, text };
}

/**
 * Handle incoming email webhook from Resend
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("svix-signature");
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

    // Verify webhook signature in production
    if (process.env.NODE_ENV === "production" && webhookSecret) {
      const isValid = verifyWebhookSignature(payload, signature, webhookSecret);
      if (!isValid) {
        console.error("[Inbound Email] Invalid webhook signature");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    }

    const data = JSON.parse(payload);
    const eventType = data.type;

    console.log(`[Inbound Email] Received webhook event: ${eventType}`);

    if (eventType === "email.received") {
      // Extract email details from webhook payload
      const email = data.data;
      const fromAddress = email.from || "unknown@sender.com";
      const subject = email.subject || "(No Subject)";
      const toAddresses: string[] = email.to || [];
      const htmlBody = email.html || null;
      const textBody = email.text || null;
      const receivedAt = email.created_at || new Date().toISOString();

      console.log(`[Inbound Email] Processing email from ${fromAddress}: ${subject}`);

      // Format the forwarded email
      const { html, text } = formatForwardedEmail(
        fromAddress,
        toAddresses,
        subject,
        htmlBody,
        textBody,
        receivedAt
      );

      // Forward the email by sending a new email with the content
      const sendResult = await resend.emails.send({
        from: `Balderas Concrete <${FORWARD_FROM}>`,
        to: FORWARD_TO,
        subject: `[Forwarded] ${subject}`,
        html: html,
        text: text,
        replyTo: fromAddress, // Allow replying directly to the original sender
      });

      if (sendResult.error) {
        console.error("[Inbound Email] Forward failed:", sendResult.error);
        return NextResponse.json(
          { success: false, error: sendResult.error.message },
          { status: 200 } // Return 200 to acknowledge receipt
        );
      }

      console.log(`[Inbound Email] Successfully forwarded to ${FORWARD_TO}`);

      return NextResponse.json({
        success: true,
        message: "Email forwarded successfully",
        forwardedTo: FORWARD_TO,
        emailId: sendResult.data?.id,
      });
    }

    // Handle other webhook events
    if (eventType === "email.bounced") {
      console.warn("[Inbound Email] Email bounced:", data.data);
    } else if (eventType === "email.complained") {
      console.warn("[Inbound Email] Email complaint:", data.data);
    } else if (eventType === "email.delivered") {
      console.log("[Inbound Email] Email delivered:", data.data?.id);
    }

    // Acknowledge receipt of webhook
    return NextResponse.json({ success: true, event: eventType });
  } catch (error) {
    console.error("[Inbound Email] Webhook error:", error);

    // Always return 200 to prevent Resend from retrying indefinitely
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 }
    );
  }
}

/**
 * Handle webhook verification (GET request)
 * Used to verify the endpoint is working
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Balderas Concrete Inbound Email Forwarding",
    forwardTo: FORWARD_TO,
    timestamp: new Date().toISOString(),
  });
}
