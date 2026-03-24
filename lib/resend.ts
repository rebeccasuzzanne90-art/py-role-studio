import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  return resend.emails.send({
    from: "VanRein Compliance <noreply@vanreincompliance.com>",
    to: ["hello@vanreincompliance.com"],
    replyTo: data.email,
    subject: `New contact form submission from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
  });
}

export async function sendNewsletterConfirmation(email: string, name: string) {
  return resend.emails.send({
    from: "VanRein Compliance <noreply@vanreincompliance.com>",
    to: [email],
    subject: "Welcome to VanRein Compliance Newsletter",
    text: `Hi ${name},\n\nThank you for subscribing to our newsletter! You'll receive the latest updates on data security and compliance.\n\nBest regards,\nVanRein Compliance Team`,
  });
}
