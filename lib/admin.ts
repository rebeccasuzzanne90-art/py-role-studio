"use server";

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

// ── Dashboard ────────────────────────────────────────────────

export async function getDashboardStats() {
  const supabase = getServiceClient();
  if (!supabase) {
    return { subscriberCount: 0, contactCount: 0, pageViewCount: 0, enabledFlags: 0, totalFlags: 0 };
  }

  const [subscribers, contacts, pageViews, flags] = await Promise.all([
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("page_views").select("id", { count: "exact", head: true }),
    supabase.from("feature_flags").select("id", { count: "exact", head: true }).eq("enabled", true),
  ]);

  const totalFlags = await supabase
    .from("feature_flags")
    .select("id", { count: "exact", head: true });

  return {
    subscriberCount: subscribers.count ?? 0,
    contactCount: contacts.count ?? 0,
    pageViewCount: pageViews.count ?? 0,
    enabledFlags: flags.count ?? 0,
    totalFlags: totalFlags.count ?? 0,
  };
}

export async function getRecentActivity() {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const [subs, contacts] = await Promise.all([
    supabase
      .from("subscribers")
      .select("email, first_name, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_submissions")
      .select("name, email, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  type Activity = { action: string; detail: string; time: string };
  const activities: Activity[] = [];

  for (const s of subs.data ?? []) {
    activities.push({
      action: "New subscriber",
      detail: `${s.first_name || "Someone"} (${s.email}) joined the newsletter`,
      time: s.created_at,
    });
  }

  for (const c of contacts.data ?? []) {
    activities.push({
      action: "Contact form",
      detail: `${c.name} (${c.email}) sent a message`,
      time: c.created_at,
    });
  }

  activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  return activities.slice(0, 10);
}

// ── Subscribers ──────────────────────────────────────────────

export async function getSubscribers() {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function deleteSubscriber(id: string) {
  const supabase = getServiceClient();
  if (!supabase) return;
  const { error } = await supabase.from("subscribers").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ── Contact Submissions ──────────────────────────────────────

export async function getContactSubmissions() {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function markContactRead(id: string) {
  const supabase = getServiceClient();
  if (!supabase) return;
  const { error } = await supabase
    .from("contact_submissions")
    .update({ read: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteContact(id: string) {
  const supabase = getServiceClient();
  if (!supabase) return;
  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ── Analytics ────────────────────────────────────────────────

export async function getAnalyticsSummary() {
  const supabase = getServiceClient();
  if (!supabase) return { totalViews30d: 0 };

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { count } = await supabase
    .from("page_views")
    .select("id", { count: "exact", head: true })
    .gte("created_at", thirtyDaysAgo.toISOString());

  return { totalViews30d: count ?? 0 };
}

export async function getTopPages() {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("page_views_by_path")
    .select("path, views")
    .limit(10);

  return data ?? [];
}

export async function getMonthlyViews() {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { data } = await supabase
    .from("page_views")
    .select("created_at")
    .gte("created_at", sixMonthsAgo.toISOString())
    .order("created_at", { ascending: true });

  const buckets: Record<string, number> = {};
  for (const row of data ?? []) {
    const d = new Date(row.created_at);
    const key = d.toLocaleString("en-US", { month: "short", year: "numeric" });
    buckets[key] = (buckets[key] ?? 0) + 1;
  }

  return Object.entries(buckets).map(([month, views]) => ({ month, views }));
}

// ── Feature Flags ────────────────────────────────────────────

export async function getFeatureFlags() {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("feature_flags")
    .select("*")
    .order("id");

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function toggleFeatureFlag(id: string, enabled: boolean) {
  const supabase = getServiceClient();
  if (!supabase) return;
  const { error } = await supabase
    .from("feature_flags")
    .update({ enabled, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ── Documents ────────────────────────────────────────────────

export async function getDocuments() {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("client_documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function deleteDocument(id: string) {
  const supabase = getServiceClient();
  if (!supabase) return;
  const { error } = await supabase
    .from("client_documents")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}
