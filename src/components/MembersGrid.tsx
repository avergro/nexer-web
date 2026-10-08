"use client";

import { useState } from "react";
import type { Member } from "@/lib/members";
import type { Dict } from "@/i18n/dictionaries";

interface MembersGridProps {
  members: Member[];
  dict: Dict;
  allLabel: string;
}

type CategoryFilter = "all" | Member["category"];

const ACCENT_COLORS: Record<string, string> = {
  norte:    "#c4a04a",
  usach:    "#6b5f8e",
  ohiggins: "#a06b3a",
  centro:   "#3d6b4f",
  sur:      "#4a7fa5",
};

function roleLabel(name: string): string {
  return name.startsWith("Dra.") ? "Investigadora" : "Investigador";
}

export default function MembersGrid({ members, dict, allLabel }: MembersGridProps) {
  const t = dict.members;
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: "all",            label: allLabel },
    { key: "researcher",     label: t.researchersTitle },
    { key: "postgrad",       label: t.postgradsTitle },
    { key: "technician",     label: t.techniciansTitle },
    { key: "national_collab",label: t.nationalCollabTitle },
    { key: "intl_collab",    label: t.intlCollabTitle },
  ];

  const filtered = filter === "all" ? members : members.filter((m) => m.category === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors duration-150 ${
              filter === cat.key
                ? "bg-foreground text-card border-foreground"
                : "text-muted border-border hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Members grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((member) => {
          const accent = ACCENT_COLORS[member.zone] ?? "#78716c";
          const label = roleLabel(member.name);
          return (
            <div
              key={member.id}
              className="p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors"
            >
              <div className="w-1 h-10 rounded-full mb-4" style={{ backgroundColor: accent }} />

              {member.scholarUrl ? (
                <a
                  href={member.scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground text-sm leading-snug hover:opacity-60 transition-opacity"
                >
                  {member.name}
                </a>
              ) : (
                <p className="font-medium text-foreground text-sm leading-snug">{member.name}</p>
              )}

              <p className="text-xs text-muted mt-1">{label}</p>
              <p className="text-xs text-muted mt-0.5">{member.institution}</p>

              {member.expertise && (
                <p className="text-xs text-muted mt-3 leading-relaxed border-t border-border pt-3">
                  <span className="font-medium">{t.expertiseLabel}:</span> {member.expertise}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted text-sm py-8 text-center">—</p>
      )}
    </div>
  );
}
