import { Resend } from "resend";

export function validateSubscriber(name: unknown, email: unknown) {
  if (typeof name !== "string" || typeof email !== "string") return null;
  const firstName = name.trim();
  const address = email.trim().toLowerCase();
  if (firstName.length > 100 || address.length > 254 || /[\r\n]/.test(name + email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) return null;
  return { name: firstName, email: address };
}

// A normal signup makes three API requests. Retry Resend's per-second limit.
async function withRateLimitRetry<T extends { error: { statusCode?: number | null } | null }>(request: () => Promise<T>): Promise<T> {
  let result = await request();
  for (let attempt = 0; result.error?.statusCode === 429 && attempt < 2; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 1100 * (attempt + 1)));
    result = await request();
  }
  return result;
}

export async function saveNewsletterSubscriber(
  subscriber: { name: string; email: string },
  client: Resend,
  from: string,
) {
  const existing = await withRateLimitRetry(() => client.contacts.get(subscriber.email));
  if (existing.error && existing.error.statusCode !== 404) throw new Error("Unable to read Resend contacts");

  let contactId = existing.data?.id;
  if (!contactId) {
    const created = await withRateLimitRetry(() => client.contacts.create({
      email: subscriber.email,
      ...(subscriber.name ? { firstName: subscriber.name } : {}),
      unsubscribed: false,
    }));
    if (created.error || !created.data?.id) throw new Error("Unable to save Resend contact");
    contactId = created.data.id;
  } else if (existing.data?.unsubscribed) {
    // Submitting the subscribe form is an explicit new subscription request.
    const updated = await withRateLimitRetry(() => client.contacts.update({ email: subscriber.email, unsubscribed: false }));
    if (updated.error || !updated.data?.id) throw new Error("Unable to update Resend contact");
  }

  const notification = await withRateLimitRetry(() => client.emails.send({
    from,
    to: ["rebeccasuzzanne90@gmail.com"],
    replyTo: subscriber.email,
    subject: "New newsletter subscriber | The Payroll Studio",
    text: `A visitor subscribed to The Payroll Studio newsletter.\n\nEmail: ${subscriber.email}\n\nThe subscriber is saved in Resend Contacts.`,
  }, {
    // Resend retains this key for 24 hours, making retries safe after a partial failure.
    idempotencyKey: `newsletter-notification/${contactId}`,
  }));
  if (notification.error || !notification.data?.id) throw new Error("Unable to send subscriber notification");
  return { contactId, notificationId: notification.data.id };
}
