"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { Search, Trash2, Mail, MailOpen } from "lucide-react";
import { deleteContact, markContactRead } from "@/lib/admin";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export function ContactsTable({ data }: { data: Contact[] }) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const filtered = useMemo(
    () =>
      data.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          (c.company ?? "").toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  function handleDelete(id: string) {
    if (!confirm("Delete this submission?")) return;
    startTransition(async () => {
      await deleteContact(id);
      router.refresh();
    });
  }

  function handleMarkRead(id: string) {
    startTransition(async () => {
      await markContactRead(id);
      router.refresh();
    });
  }

  const unreadCount = data.filter((c) => !c.read).length;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <p className="mt-1 text-muted-foreground">
          {unreadCount > 0
            ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
            : "All messages read"}
        </p>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or company..."
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
              <TableHead className="w-8" />
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <>
                <TableRow
                  key={c.id}
                  className="cursor-pointer"
                  onClick={() =>
                    setExpanded(expanded === c.id ? null : c.id)
                  }
                >
                  <TableCell>
                    {c.read ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {c.name}
                    {!c.read && (
                      <Badge className="ml-2 bg-primary/10 text-primary" variant="secondary">
                        New
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.company ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(c.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {!c.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={pending}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkRead(c.id);
                          }}
                          title="Mark as read"
                        >
                          <MailOpen className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={pending}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(c.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expanded === c.id && (
                  <TableRow key={`${c.id}-msg`}>
                    <TableCell colSpan={6} className="bg-muted/30 px-8 py-4">
                      <p className="whitespace-pre-wrap text-sm">{c.message}</p>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground"
                >
                  No contact submissions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
