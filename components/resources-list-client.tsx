"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Headphones,
  BookOpen,
  Video,
  Download,
  ExternalLink,
  Search,
  X,
  ClipboardCheck,
  FileSpreadsheet,
} from "lucide-react";
import type { ResourceCategory } from "@/lib/contentful";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory | "other";
  fileUrl: string | null;
  fileName: string | null;
  contentType: string | null;
}

interface ResourcesListClientProps {
  resources: Resource[];
}

const CATEGORY_META: Record<
  string,
  { label: string; icon: typeof FileText }
> = {
  whitepaper: { label: "Whitepaper", icon: FileText },
  guide: { label: "Guide", icon: BookOpen },
  template: { label: "Template", icon: FileSpreadsheet },
  video: { label: "Video", icon: Video },
  podcast: { label: "Podcast", icon: Headphones },
  checklist: { label: "Checklist", icon: ClipboardCheck },
  other: { label: "Resource", icon: FileText },
};

export function ResourcesListClient({ resources }: ResourcesListClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    resources.forEach((r) => cats.add(r.category));
    return Array.from(cats).sort();
  }, [resources]);

  const filtered = useMemo(() => {
    let result = resources;

    if (activeCategory) {
      result = result.filter((r) => r.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [resources, query, activeCategory]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            className="h-10 w-full border border-border bg-background pl-9 pr-9 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c9963e]/40"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={
              "border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors " +
              (activeCategory === null
                ? "border-[#c9963e] bg-[#c9963e] text-white"
                : "border-border text-muted-foreground hover:border-[#c9963e] hover:text-[#c9963e]")
            }
          >
            All
          </button>
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] ?? CATEGORY_META.other;
            return (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={
                  "border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors " +
                  (activeCategory === cat
                    ? "border-[#c9963e] bg-[#c9963e] text-white"
                    : "border-border text-muted-foreground hover:border-[#c9963e] hover:text-[#c9963e]")
                }
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
        {activeCategory
          ? ` in ${CATEGORY_META[activeCategory]?.label ?? activeCategory}`
          : ""}
        {query.trim() ? ` matching "${query}"` : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => {
            const meta =
              CATEGORY_META[resource.category] ?? CATEGORY_META.other;
            const Icon = meta.icon;

            return (
              <Card
                key={resource.id}
                className="group h-full transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-[#c9963e]" />
                    <Badge variant="secondary" className="capitalize">
                      {meta.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {resource.fileUrl ? (
                    <a
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={resource.fileName ?? undefined}
                    >
                      <Button variant="outline" size="sm" className="gap-2">
                        Download
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      disabled
                    >
                      Coming Soon
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg font-medium">No resources found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search or filter.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setActiveCategory(null);
            }}
            className="mt-4 text-sm font-medium text-[#c9963e] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
