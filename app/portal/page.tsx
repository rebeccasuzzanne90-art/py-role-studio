import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ShieldCheck, Clock, Settings } from "lucide-react";
import { PortalLogout } from "@/components/portal-logout";

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/portal/login");

  const userName =
    user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "User";

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userName}</h1>
            <p className="mt-1 text-muted-foreground">{user.email}</p>
          </div>
          <PortalLogout />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <CardTitle className="text-base">Compliance Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Active
              </Badge>
              <p className="mt-2 text-sm text-muted-foreground">
                Your compliance is up to date
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Documents</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">
                Available documents
              </p>
              <Link href="/portal/documents" className="mt-2 inline-block">
                <Button variant="link" size="sm" className="h-auto p-0">
                  View All
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-base">Next Review</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold">March 2026</p>
              <p className="text-sm text-muted-foreground">
                Annual compliance review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Account</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent documents */}
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold">Recent Documents</h2>
          <div className="space-y-3">
            {[
              {
                name: "Risk Assessment Report — Q4 2025",
                date: "Dec 15, 2025",
              },
              {
                name: "HIPAA Compliance Certificate",
                date: "Nov 1, 2025",
              },
              {
                name: "Employee Training Completion Records",
                date: "Oct 20, 2025",
              },
            ].map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
