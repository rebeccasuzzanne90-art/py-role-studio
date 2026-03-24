"use server";

import { resend, sendContactEmail, sendNewsletterConfirmation } from "@/lib/resend";
import { createClient } from "@supabase/supabase-js";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function subscribeToNewsletter(name: string, email: string) {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("subscribers")
    .upsert({ email, first_name: name, confirmed: true }, { onConflict: "email" });

  if (error) throw new Error(error.message);

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
  await sendContactEmail(data);
  return { success: true };
}

export async function trackPageView(path: string, referrer?: string) {
  const supabase = getServiceClient();
  await supabase.from("page_views").insert({ path, referrer });
}
