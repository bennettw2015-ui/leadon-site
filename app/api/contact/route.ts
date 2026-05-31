import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!toEmail) {
      return NextResponse.json(
        { error: "CONTACT_TO_EMAIL is not set." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "LeadOn <onboarding@resend.dev>",
      to: [toEmail],
      subject: `New LeadOn site review request from ${name}`,
      replyTo: contact,
      text: `
New LeadOn contact form submission

Name:
${name}

Business:
${business || "Not provided"}

Email / Phone:
${contact}

Current website:
${website || "Not provided"}

What they want improved:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact route error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}