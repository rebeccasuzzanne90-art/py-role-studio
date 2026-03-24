"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Trash2 } from "lucide-react";
import { deleteDocument } from "@/lib/admin";

interface Doc {
  id: string;
  title: string;
  assigned_to: string;
  file_url: string | null;
  created_at: string;
}

export function DocumentsTable({ data }: { data: Doc[] }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete(id: string) {
    if (!confirm("Delete this document?")) return;
    startTransition(async () => {
      await deleteDocument(id);
      router.refresh();
    });
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="mt-1 text-muted-foreground">
            Manage client portal documents
          </p>
        </div>
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-medium">{doc.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {doc.assigned_to}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(doc.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={pending}
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-muted-foreground"
                >
                  No documents uploaded yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
