import { getDocuments } from "@/lib/admin";
import { DocumentsTable } from "@/components/admin/documents-table";

export const revalidate = 0;

export default async function AdminDocumentsPage() {
  let documents: Awaited<ReturnType<typeof getDocuments>> = [];

  try {
    documents = await getDocuments();
  } catch {
    // Supabase not configured
  }

  return <DocumentsTable data={documents} />;
}
