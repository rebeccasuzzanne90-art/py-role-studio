import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, Download } from "lucide-react";

export default async function PortalDocumentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/portal/login");

  const documents = [
    {
      id: "1",
      title: "Risk Assessment Report — Q4 2025",
      uploadedAt: "2025-12-15",
      fileUrl: "#",
    },
    {
      id: "2",
      title: "HIPAA Compliance Certificate",
      uploadedAt: "2025-11-01",
      fileUrl: "#",
    },
    {
      id: "3",
      title: "Employee Training Completion Records",
      uploadedAt: "2025-10-20",
      fileUrl: "#",
    },
    {
      id: "4",
      title: "Security Policies Package v3.1",
      uploadedAt: "2025-09-05",
      fileUrl: "#",
    },
    {
      id: "5",
      title: "Penetration Test Results — External",
      uploadedAt: "2025-08-12",
      fileUrl: "#",
    },
  ];

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/portal"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Portal
        </Link>

        <h1 className="text-3xl font-bold">Your Documents</h1>
        <p className="mt-2 text-muted-foreground">
          Access all compliance documents shared with your organization
        </p>

        <div className="mt-8 space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded{" "}
                      {new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
