import { getSubscribers } from "@/lib/admin";
import { SubscribersTable } from "@/components/admin/subscribers-table";

export const revalidate = 0;

export default async function SubscribersPage() {
  let subscribers: Awaited<ReturnType<typeof getSubscribers>> = [];

  try {
    subscribers = await getSubscribers();
  } catch {
    // Supabase not configured
  }

  return <SubscribersTable data={subscribers} />;
}
