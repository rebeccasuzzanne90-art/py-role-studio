"use client";

import { useState, useMemo, useTransition } from "react";
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
import { Download, Search, Trash2 } from "lucide-react";
import { deleteSubscriber } from "@/lib/admin";
import { useRouter } from "next/navigation";

interface Subscriber {
  id: string;
  email: string;
  first_name: string | null;
  confirmed: boolean;
  created_at: string;
}

export function SubscribersTable({ data }: { data: Subscriber[] }) {
  const [search, setSearch] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const filtered = useMemo(
    () =>
      data.filter(
        (s) =>
          s.email.toLowerCase().includes(search.toLowerCase()) ||
          (s.first_name ?? "").toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  function handleDelete(id: string) {
    if (!confirm("Delete this subscriber?")) return;
    startTransition(async () => {
      await deleteSubscriber(id);
      router.refresh();
    });
  }

  function handleExport() {
    const csv = [
      "email,first_name,subscribed_at,confirmed",
      ...filtered.map(
        (s) =>
          `${s.email},${s.first_name ?? ""},${s.created_at},${s.confirmed}`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscribers</h1>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleExport}
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search subscribers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary">{filtered.length} total</Badge>
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subscribed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-medium">{sub.email}</TableCell>
                <TableCell>{sub.first_name ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(sub.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {sub.confirmed ? (
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      Confirmed
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Pending</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={pending}
                    onClick={() => handleDelete(sub.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  No subscribers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
