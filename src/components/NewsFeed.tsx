"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, Camera, FileText, ArrowRight } from "lucide-react";
import type { NewsPost } from "@/lib/news";
import type { InstagramPost } from "@/types/instagram";
import type { Dict, Lang } from "@/i18n/dictionaries";
import { asset } from "@/lib/assets";

/* --- Unified feed item ---------------------------------------------------- */
interface FeedItem {
  id: string;
  source: "cms" | "instagram";
  title?: string;
  excerpt?: string;
  dateISO: string;
  image?: string;
  href: string;
  zone?: string;
  category?: string;
  author?: string;
  isReel?: boolean;
}

const ZONE_COLORS: Record<string, string> = {
  norte: "#c4a04a",
  ohiggins: "#a06b3a",
  centro: "#3d6b4f",
  sur: "#4a7fa5",
  general: "#78716c",
};

function formatDate(iso: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/* --- Individual feed card ------------------------------------------------- */
function FeedCard({ item, index, lang }: { item: FeedItem; index: number; lang: Lang }) {
  const accentColor = ZONE_COLORS[item.zone ?? "general"] ?? "#78716c";
  const isInstagram = item.source === "instagram";

  return (
    <motion.a
      href={item.href}
      target={isInstagram ? "_blank" : undefined}
      rel={isInstagram ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="group flex flex-col bg-background rounded-xl overflow-hidden"
      style={{
        border: "1px solid var(--color-border)",
        boxShadow: "0 1px 3px rgba(28,25,23,0.05), 0 4px 12px rgba(28,25,23,0.06)",
      }}
    >
      {/* Image / placeholder */}
      <div className="relative aspect-video overflow-hidden bg-border">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(item.image)}
            alt={item.title ?? ""}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
              item.image.includes("/logos/") ? "object-contain p-8" : "object-cover"
            }`}
            style={item.image.includes("/logos/") ? { background: "#f5f3ef" } : undefined}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}08 100%)`,
              borderBottom: `2px solid ${accentColor}33`,
            }}
          />
        )}

        {/* Source badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{ backgroundColor: "rgba(28,25,23,0.75)", backdropFilter: "blur(4px)" }}
        >
          {isInstagram ? (
            <Camera size={10} style={{ color: "#f9f7f2" }} />
          ) : (
            <FileText size={10} style={{ color: "#f9f7f2" }} />
          )}
          {item.isReel && (
            <Play size={9} style={{ color: "#f9f7f2", fill: "#f9f7f2" }} />
          )}
          <span className="text-[10px] font-medium tracking-wide" style={{ color: "#f9f7f2" }}>
            {isInstagram ? (item.isReel ? "REEL" : "IG") : (item.category ?? "NEXER")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Zone dot + label */}
        {item.zone && item.zone !== "general" && (
          <div className="flex items-center gap-1.5 mb-3">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-muted">
              {item.zone}
            </span>
          </div>
        )}

        {/* Title */}
        {item.title && (
          <h3 className="font-serif text-lg leading-snug text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
            {item.title}
          </h3>
        )}

        {/* Excerpt */}
        {item.excerpt && (
          <p className="text-sm text-muted leading-relaxed line-clamp-3 flex-1">
            {item.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted">{formatDate(item.dateISO, lang)}</span>
          <ExternalLink
            size={12}
            className="text-muted opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </motion.a>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-background rounded-xl overflow-hidden animate-pulse border border-border">
      <div className="aspect-video bg-border" />
      <div className="p-5 flex flex-col gap-2">
        <div className="h-2.5 bg-border rounded w-1/4" />
        <div className="h-4 bg-border rounded w-full mt-1" />
        <div className="h-4 bg-border rounded w-4/5" />
        <div className="h-3 bg-border rounded w-2/3 mt-2" />
      </div>
    </div>
  );
}

/* --- Main component ------------------------------------------------------- */
export default function NewsFeed({
  initialNews,
  dict,
  lang,
  limit,
}: {
  initialNews: NewsPost[];
  dict: Dict;
  lang: Lang;
  limit?: number;
}) {
  const t = dict.news;
  const [igPosts, setIgPosts] = useState<InstagramPost[]>([]);
  const [igLoading, setIgLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => setIgPosts(data.posts ?? []))
      .catch(() => {})
      .finally(() => setIgLoading(false));
  }, []);

  /* Convert CMS posts */
  const cmsItems: FeedItem[] = initialNews.map((p) => ({
    id: `cms-${p.slug}`,
    source: "cms",
    title: p.title,
    excerpt: p.excerpt,
    dateISO: p.dateISO,
    image: p.image || undefined,
    href: `/${lang}/noticias/${p.slug}`,
    zone: p.zone,
    category: p.category,
    author: p.author,
  }));

  /* Convert Instagram posts */
  const igItems: FeedItem[] = igPosts.map((p) => ({
    id: `ig-${p.id}`,
    source: "instagram",
    excerpt: p.caption?.slice(0, 180),
    dateISO: p.timestamp,
    image: p.thumbnail_url ?? p.media_url,
    href: p.permalink,
    isReel: p.media_product_type === "REELS" || p.media_type === "VIDEO",
  }));

  /* Merged + sorted by date */
  const allItems = [...cmsItems, ...igItems].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );

  const displayItems = limit ? allItems.slice(0, limit) : allItems;
  const showSkeletons = igLoading && cmsItems.length === 0;

  return (
    <section className="px-6 py-16 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs tracking-[0.22em] uppercase text-muted font-medium mb-3 block">
              {t.timelineLabel}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
              {t.title}
            </h2>
          </div>
          <a
            href="https://www.instagram.com/nexerchile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors shrink-0"
          >
            <Camera size={14} />
            {t.igHandle}
          </a>
        </div>

        {/* Feed grid */}
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {showSkeletons ? (
              Array.from({ length: limit ?? 3 }).map((_, i) => <SkeletonCard key={i} />)
            ) : displayItems.length === 0 ? (
              <div className="col-span-full py-14 text-center">
                <FileText size={32} className="text-border mx-auto mb-4" />
                <p className="text-sm text-muted">{t.empty}</p>
              </div>
            ) : (
              displayItems.map((item, i) => (
                <FeedCard key={item.id} item={item} index={i} lang={lang} />
              ))
            )}
          </div>
        </AnimatePresence>

        {/* "All news" link — only shown when a limit is active */}
        {limit && (
          <div className="mt-10 flex justify-center">
            <a
              href={`/${lang}/noticias`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/20 pb-0.5 hover:border-foreground transition-colors duration-200"
            >
              {t.allNews}
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
