"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "@/components/blog-card";
import { Search, X } from "lucide-react";

interface BlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishDate?: string;
  date?: string;
  imageUrl?: string;
}

interface BlogListClientProps {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, query, activeCategory]);

  return (
    <div>
      {/* Search + Filters */}
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
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

        {/* Category filters */}
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
          {categories.map((cat) => (
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
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {activeCategory ? ` in ${activeCategory}` : ""}
        {query.trim() ? ` matching "${query}"` : ""}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg font-medium">No articles found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search or filter to find what you&apos;re looking
            for.
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
