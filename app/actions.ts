"use server";

import { sendContactEmail } from "@/lib/resend";
import { Resend } from "resend";
import { saveNewsletterSubscriber, validateSubscriber } from "@/lib/newsletter";
import { createClient } from "@supabase/supabase-js";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (
    !url ||
    !key ||
    url === "https://your-project.supabase.co" ||
    key === "your_service_role_key"
  ) {
    return null;
  }

  return createClient(url, key);
}

export async function subscribeToNewsletter(name: string, email: string) {
  const subscriber = validateSubscriber(name, email);
  if (!subscriber) return { success: false, error: "Please enter a valid email address." };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const unavailable = "We couldn't complete your subscription. Please try again, or email rebeccasuzzanne90@gmail.com.";
  if (!apiKey || !from) return { success: false, error: unavailable };

  try {
    await saveNewsletterSubscriber(subscriber, new Resend(apiKey), from);
  } catch {
    return { success: false, error: unavailable };
  }

  // Resend is the subscriber source of truth. Keep the existing admin list in sync
  // when available, without failing a successfully saved and notified subscription.
  try {
    const supabase = getServiceClient();
    if (supabase) {
      const { error } = await supabase.from("subscribers").upsert(
        { email: subscriber.email, ...(subscriber.name ? { first_name: subscriber.name } : {}), confirmed: true },
        { onConflict: "email" }
      );
      if (error) console.error("Newsletter admin-list sync failed");
    }
  } catch {
    console.error("Newsletter admin-list sync failed");
  }
  return { success: true };
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  const supabase = getServiceClient();

  if (supabase) {
    await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      message: data.message,
    });
  }

  try {
    await sendContactEmail(data);
  } catch {
    // Email send failure shouldn't block storage
  }

  return { success: true };
}

export async function trackPageView(path: string, referrer?: string) {
  const supabase = getServiceClient();
  if (!supabase) return;
  await supabase.from("page_views").insert({ path, referrer });
}
