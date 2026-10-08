"use client";

import Link from "next/link";
import type { Lang } from "@/i18n/dictionaries";

export default function LangSwitcher({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <Link
        href="/es"
        className={`px-2 py-1 rounded transition-colors ${
          lang === "es"
            ? "text-foreground"
            : "text-muted hover:text-foreground"
        }`}
      >
        ES
      </Link>
      <span className="text-border select-none">·</span>
      <Link
        href="/en"
        className={`px-2 py-1 rounded transition-colors ${
          lang === "en"
            ? "text-foreground"
            : "text-muted hover:text-foreground"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
