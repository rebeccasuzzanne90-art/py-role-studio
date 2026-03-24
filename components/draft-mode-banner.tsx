"use client";

import { usePathname } from "next/navigation";
import { Eye, X } from "lucide-react";
import { useState } from "react";

export function DraftModeBanner() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-lg border border-amber-400/50 bg-amber-50 px-4 py-2.5 shadow-lg dark:border-amber-600/50 dark:bg-amber-950/90">
      <Eye className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
        Preview Mode
      </span>
      <a
        href={`/api/disable-draft?slug=${encodeURIComponent(pathname)}`}
        className="rounded-md bg-amber-200/60 px-2.5 py-1 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-300/60 dark:bg-amber-800/60 dark:text-amber-200 dark:hover:bg-amber-700/60"
      >
        Exit Preview
      </a>
      <button
        onClick={() => setDismissed(true)}
        className="ml-1 rounded p-0.5 text-amber-600 transition-colors hover:bg-amber-200/60 dark:text-amber-400 dark:hover:bg-amber-800/60"
        aria-label="Dismiss banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
