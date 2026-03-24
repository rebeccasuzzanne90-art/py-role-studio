"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, FileText, Trash2 } from "lucide-react";

interface Document {
  id: string;
  title: string;
  assignedTo: string;
  uploadedAt: string;
}

const MOCK_DOCUMENTS: Document[] = [
  { id: "1", title: "Risk Assessment Report — Q4 2025", assignedTo: "john@acme.com", uploadedAt: "2025-12-15" },
  { id: "2", title: "HIPAA Compliance Certificate", assignedTo: "john@acme.com", uploadedAt: "2025-11-01" },
  { id: "3", title: "Employee Training Records", assignedTo: "sarah@healthco.com", uploadedAt: "2025-10-20" },
  { id: "4", title: "Security Policies v3.1", assignedTo: "sarah@healthco.com", uploadedAt: "2025-09-05" },
  { id: "5", title: "Pen Test Results — External", assignedTo: "mike@fintech.io", uploadedAt: "2025-08-12" },
];

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);

  function handleDelete(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
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
        <Button size="sm" className="gap-2">
          <Upload className="h-3.5 w-3.5" />
          Upload Document
        </Button>
      </div>

      <div className="rounded-lg border">
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
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-medium">{doc.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {doc.assignedTo}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
