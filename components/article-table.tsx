import type { ReactNode } from "react";

export function ArticleTable({ caption, children }: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="article-table" tabIndex={0} role="region" aria-label={caption}>
      <table>
        <caption>{caption}</caption>
        {children}
      </table>
    </div>
  );
}
