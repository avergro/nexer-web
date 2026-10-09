"use client";

import Link from "next/link";
import type { Lang } from "@/i18n/dictionaries";

export default function LangSwitcher({ lang, light = false }: { lang: Lang; light?: boolean }) {
  const active = light ? "text-white" : "text-foreground";
  const idle = light ? "text-white/60 hover:text-white" : "text-muted hover:text-foreground";
  const sep = light ? "text-white/40" : "text-border";
  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <Link
        href="/es"
        className={`px-2 py-1 rounded transition-colors ${
          lang === "es" ? active : idle
        }`}
      >
        ES
      </Link>
      <span className={`select-none ${sep}`}>·</span>
      <Link
        href="/en"
        className={`px-2 py-1 rounded transition-colors ${
          lang === "en" ? active : idle
        }`}
      >
        EN
      </Link>
    </div>
  );
}
