"use client";

import { useState, useMemo } from "react";
import type { Publication } from "@/lib/publications";
import type { Dict } from "@/i18n/dictionaries";

interface PublicationsTableProps {
  publications: Publication[];
  dict: Dict;
}

export default function PublicationsTable({ publications, dict }: PublicationsTableProps) {
  const t = dict.research;
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const years = useMemo(() => {
    const unique = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
    return unique;
  }, [publications]);

  const filtered = useMemo(() => {
    return publications.filter((pub) => {
      const matchYear = yearFilter === "all" || pub.year === parseInt(yearFilter);
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.authors.toLowerCase().includes(q) ||
        pub.journal.toLowerCase().includes(q);
      return matchYear && matchSearch;
    });
  }, [publications, search, yearFilter]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-card placeholder:text-muted/60 focus:outline-none focus:border-foreground/40 transition-colors"
        />
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-card focus:outline-none focus:border-foreground/40 transition-colors"
        >
          <option value="all">{t.yearLabel}</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p className="text-xs text-muted mb-6">
        {filtered.length} / {publications.length}
      </p>

      {/* Publication list */}
      <div className="divide-y divide-border">
        {filtered.map((pub) => (
          <div key={pub.id} className="py-5">
            <p className="text-sm text-muted mb-0.5">{pub.authors}</p>
            <p className="text-sm font-medium text-foreground italic mb-1 leading-snug">
              {pub.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
              <span className="text-xs text-muted">{pub.journal}</span>
              <span className="text-xs text-muted">·</span>
              <span className="text-xs text-muted">{pub.year}</span>
              {pub.doi && (
                <>
                  <span className="text-xs text-muted">·</span>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-foreground/60 hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    DOI
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted text-sm py-8 text-center">—</p>
      )}
    </div>
  );
}
