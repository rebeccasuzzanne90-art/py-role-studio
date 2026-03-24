import { getContactSubmissions } from "@/lib/admin";
import { ContactsTable } from "@/components/admin/contacts-table";

export const revalidate = 0;

export default async function ContactsPage() {
  let contacts: Awaited<ReturnType<typeof getContactSubmissions>> = [];

  try {
    contacts = await getContactSubmissions();
  } catch {
    // Supabase not configured
  }

  return <ContactsTable data={contacts} />;
}
