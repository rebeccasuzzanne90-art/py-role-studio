import { Resend } from "resend";
import { contactEmail, validateContact } from "@/lib/contact";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Render terminates HTTPS before forwarding requests to the Next.js server.
  const allowedOrigins = new Set([
    new URL(request.url).origin,
    "https://www.thepayrollstudio.com.au",
    "https://thepayrollstudio.com.au",
    "https://py-role-studio.onrender.com",
  ]);
  if (origin && !allowedOrigins.has(origin)) {
    return Response.json({ error: "Please submit the form from this website." }, { status: 403 });
  }
  if (Number(request.headers.get("content-length")) > 20000) {
    return Response.json({ error: "Your message is too long." }, { status: 413 });
  }
  let raw;
  try {
    const body = await request.text();
    if (body.length > 20000) return Response.json({ error: "Your message is too long." }, { status: 413 });
    raw = JSON.parse(body);
  } catch {
    return Response.json({ error: "Please check your form and try again." }, { status: 400 });
  }
  if (raw?.website) return Response.json({ error: "Unable to submit this form." }, { status: 400 });
  const data = validateContact(raw);
  if (!data) return Response.json({ error: "Please complete all required fields with a valid email and phone number." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const unavailable = "We couldn't send your message. Please try again, or email rebeccasuzzanne90@gmail.com directly.";
  if (!apiKey || !from) return Response.json({ error: unavailable }, { status: 503 });
  try {
    const { data: sent, error } = await new Resend(apiKey).emails.send({ from, ...contactEmail(data) });
    if (error || !sent?.id) return Response.json({ error: unavailable }, { status: 502 });
    return Response.json({ success: true, submissionId: sent.id });
  } catch {
    return Response.json({ error: unavailable }, { status: 502 });
  }
}
