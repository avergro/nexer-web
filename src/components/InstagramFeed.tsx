"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon, ExternalLink, Camera } from "lucide-react";
import type { InstagramPost } from "@/types/instagram";

interface FeedState {
  posts: InstagramPost[];
  configured: boolean;
  loading: boolean;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function PostCard({ post, index }: { post: InstagramPost; index: number }) {
  const isReel =
    post.media_product_type === "REELS" || post.media_type === "VIDEO";
  const thumb = post.thumbnail_url ?? post.media_url;

  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="group relative bg-card rounded-xl overflow-hidden block"
      style={{
        boxShadow:
          "0 1px 3px rgba(28,25,23,0.06), 0 4px 16px rgba(28,25,23,0.07)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden bg-border">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={post.caption?.slice(0, 60) ?? "Post de Instagram"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-border">
            <ImageIcon size={28} className="text-muted" />
          </div>
        )}

        {/* Reel badge */}
        {isReel && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-foreground/80 backdrop-blur-sm rounded-full px-2.5 py-1">
            <Play size={10} className="text-background fill-background" />
            <span className="text-background text-[10px] font-medium tracking-wide">
              REEL
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        {post.caption && (
          <p className="text-sm text-foreground leading-relaxed line-clamp-3 mb-3">
            {post.caption}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">{formatDate(post.timestamp)}</span>
          <ExternalLink
            size={13}
            className="text-muted group-hover:text-foreground transition-colors"
          />
        </div>
      </div>
    </motion.a>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-border" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 bg-border rounded w-full" />
        <div className="h-3 bg-border rounded w-4/5" />
        <div className="h-3 bg-border rounded w-2/3 mt-1" />
      </div>
    </div>
  );
}

function SetupCard() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-14 h-14 rounded-full bg-border flex items-center justify-center mb-5">
        <Camera size={24} className="text-muted" />
      </div>
      <h3 className="font-serif text-xl text-foreground mb-2">
        Conecta Instagram
      </h3>
      <p className="text-sm text-muted max-w-sm leading-relaxed mb-6">
        Agrega tu token de acceso en{" "}
        <code className="text-xs bg-border px-1.5 py-0.5 rounded font-mono">
          .env.local
        </code>{" "}
        para mostrar los reels y publicaciones de{" "}
        <strong>@nexerchile</strong> automáticamente.
      </p>
      <div className="text-left bg-card border border-border rounded-xl p-5 text-xs font-mono text-muted w-full max-w-sm">
        <p className="text-muted/60 mb-1"># .env.local</p>
        <p>
          INSTAGRAM_ACCESS_TOKEN=<span className="text-norte">tu_token_aquí</span>
        </p>
      </div>
      <a
        href="https://developers.facebook.com/docs/instagram-basic-display-api/getting-started"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 text-xs text-muted hover:text-foreground transition-colors underline underline-offset-4"
      >
        Cómo obtener un token de acceso →
      </a>
    </div>
  );
}

export default function InstagramFeed() {
  const [state, setState] = useState<FeedState>({
    posts: [],
    configured: false,
    loading: true,
  });

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) =>
        setState({
          posts: data.posts ?? [],
          configured: data.configured,
          loading: false,
        })
      )
      .catch(() => setState({ posts: [], configured: false, loading: false }));
  }, []);

  return (
    <section className="px-6 py-20 bg-card">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs tracking-[0.22em] uppercase text-muted font-medium mb-3 block">
              Novedades
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
              Desde Instagram
            </h2>
          </div>
          <a
            href="https://www.instagram.com/nexerchile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors shrink-0"
          >
            <Camera size={16} />
            @nexerchile
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {state.loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : !state.configured || state.posts.length === 0 ? (
            <SetupCard />
          ) : (
            state.posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
