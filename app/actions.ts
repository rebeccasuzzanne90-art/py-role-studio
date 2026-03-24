"use server";

import { sendContactEmail, sendNewsletterConfirmation } from "@/lib/resend";
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
  const supabase = getServiceClient();

  if (supabase) {
    const { error } = await supabase
      .from("subscribers")
      .upsert(
        { email, first_name: name, confirmed: true },
        { onConflict: "email" }
      );
    if (error) throw new Error(error.message);
  }

  try {
    await sendNewsletterConfirmation(email, name);
  } catch {
    // Email send failure shouldn't block subscription
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
