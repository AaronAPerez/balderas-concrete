import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { Resend } from "resend";


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

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // Save to DB
    await prisma.contactSubmission.create({ data });

    // Notify company
    // EMAIL_FROM env var: use "onboarding@resend.dev" for dev, "no-reply@mail.balderasconcrete.com" for production
    await resend.emails.send({
      from: `Balderas Concrete <${process.env.EMAIL_FROM}>`,
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

    // Auto-reply to customer confirming we received their message
    await resend.emails.send({
      from: `Balderas Concrete <${process.env.EMAIL_FROM}>`,
      to: data.email,
      subject: "We received your request – Balderas Concrete",
      text: `
Hi ${data.name},

Thank you for contacting Balderas Concrete. We’ve received your request and will get back to you shortly.

If this is urgent, please call us at ${process.env.COMPANY_PHONE ?? "our main phone number"}.

Best regards,
Balderas Concrete
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}