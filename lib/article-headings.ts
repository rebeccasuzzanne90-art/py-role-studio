type Node = {
  type: string;
  depth?: number;
  value?: string;
  children?: Node[];
  data?: { hProperties?: Record<string, unknown> };
};

export type ArticleHeading = { id: string; title: string };

// One MDX transform supplies both rendered IDs and the contents menu.
export function createArticleHeadings() {
  const headings: ArticleHeading[] = [];
  const used = new Set(["faqs", "related-articles", "article-top"]);
  function text(node: Node): string {
    return node.value ?? node.children?.map(text).join("") ?? "";
  }
  function plugin() {
    return (tree: Node) => {
      function walk(node: Node) {
        if (node.type === "heading" && node.depth && node.depth >= 2) {
          const title = text(node);
          const base = title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-") || "section";
          let id = base;
          let suffix = 2;
          while (used.has(id)) id = `${base}-${suffix++}`;
          used.add(id);
          node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
          if (node.depth === 2) headings.push({ id, title });
        }
        node.children?.forEach(walk);
      }
      walk(tree);
    };
  }
  return { headings, plugin };
}
