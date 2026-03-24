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
import { Download, Search, Trash2 } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  firstName: string;
  subscribedAt: string;
  confirmed: boolean;
}

const MOCK_SUBSCRIBERS: Subscriber[] = [
  { id: "1", email: "john@acme.com", firstName: "John", subscribedAt: "2026-01-20", confirmed: true },
  { id: "2", email: "sarah@healthco.com", firstName: "Sarah", subscribedAt: "2026-01-19", confirmed: true },
  { id: "3", email: "mike@fintech.io", firstName: "Mike", subscribedAt: "2026-01-18", confirmed: false },
  { id: "4", email: "lisa@startup.com", firstName: "Lisa", subscribedAt: "2026-01-15", confirmed: true },
  { id: "5", email: "tom@enterprise.co", firstName: "Tom", subscribedAt: "2026-01-12", confirmed: true },
  { id: "6", email: "anna@saas.dev", firstName: "Anna", subscribedAt: "2026-01-10", confirmed: true },
  { id: "7", email: "dave@hospital.org", firstName: "Dave", subscribedAt: "2026-01-08", confirmed: false },
  { id: "8", email: "kate@legal.com", firstName: "Kate", subscribedAt: "2026-01-05", confirmed: true },
];

export default function SubscribersPage() {
  const [search, setSearch] = useState("");
  const [subscribers, setSubscribers] = useState(MOCK_SUBSCRIBERS);

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.firstName.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id: string) {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  }

  function handleExport() {
    const csv = [
      "email,first_name,subscribed_at,confirmed",
      ...filtered.map(
        (s) => `${s.email},${s.firstName},${s.subscribedAt},${s.confirmed}`
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
        <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
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

      <div className="rounded-lg border">
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
                <TableCell>{sub.firstName}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {sub.confirmed ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
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
                    onClick={() => handleDelete(sub.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
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
