import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, business, contact, website, message } = body;

    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");

      return NextResponse.json(
        { error: "RESEND_API_KEY is not set." },
        { status: 500 }
      );
    }

    if (!toEmail) {
      console.error("Missing CONTACT_TO_EMAIL");

      return NextResponse.json(
        { error: "CONTACT_TO_EMAIL is not set." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const contactString = String(contact).trim();
    const contactIsEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactString);

    const { data, error } = await resend.emails.send({
      from: "LeadOn <onboarding@resend.dev>",
      to: [toEmail],
      subject: `New LeadOn site review request from ${name}`,
      replyTo: contactIsEmail ? contactString : undefined,
      text: `
New LeadOn contact form submission

Name:
${name}

Business:
${business || "Not provided"}

Email / Phone:
${contactString}

Current website:
${website || "Not provided"}

What they want improved:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: "Resend failed to send email.", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact route error:", error);

    return NextResponse.json(
      { error: "Something went wrong.", details: String(error) },
      { status: 500 }
    );
  }
}