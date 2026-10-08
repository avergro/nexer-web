"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { MapPin, FlaskConical, Users } from "lucide-react";
import { type ZoneData, getZoneContent } from "@/lib/zones";
import type { Dict, Lang } from "@/i18n/dictionaries";

export type { ZoneData };

export const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const SPRING = { stiffness: 300, damping: 30, mass: 0.5 };

interface Props {
  data: ZoneData;
  lang?: Lang;
  dict?: Dict;
}

export default function EditorialCard({ data, lang = "es", dict }: Props) {
  const content = getZoneContent(data, lang);
  const researchersLabel = dict?.card.researchersLabel ?? "Investigadores";

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, SPRING);
  const springY = useSpring(mouseY, SPRING);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${useTransform(
    springX, [-0.5, 0.5], ["0%", "100%"]
  )} ${useTransform(
    springY, [-0.5, 0.5], ["0%", "100%"]
  )}, rgba(255,255,255,0.18) 0%, transparent 60%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d" as const,
        perspective: "1000px",
        boxShadow:
          "0 1px 3px rgba(28,25,23,0.06), 0 8px 24px rgba(28,25,23,0.08), 0 24px 48px rgba(28,25,23,0.04)",
      }}
      className="group relative bg-card rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: glareBackground }}
      />

      {/* Accent band */}
      <div className="h-1.5 w-full" style={{ backgroundColor: data.accentColor }} />

      <div
        className="p-8 flex flex-col gap-6"
        style={{ transform: "translateZ(20px)", willChange: "transform" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className="text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: data.accentColor }}
            >
              {content.label}
            </span>
            <h2 className="font-serif text-3xl leading-tight mt-1 text-foreground">
              {data.city}
            </h2>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
            style={{ backgroundColor: data.accentLight }}
          >
            <MapPin size={16} style={{ color: data.accentColor }} />
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        {/* Environment */}
        <div className="flex items-center gap-2.5">
          <FlaskConical size={14} className="text-muted flex-shrink-0" />
          <span className="text-sm text-muted font-medium">{content.environment}</span>
        </div>

        {/* Tagline */}
        <p className="font-serif text-xl leading-snug text-foreground italic">
          "{content.tagline}"
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted">{content.description}</p>

        {/* Researchers */}
        <div className="mt-auto pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Users size={13} className="text-muted" />
            <span className="text-xs tracking-wider uppercase text-muted font-medium">
              {researchersLabel}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`/${lang}/nosotros/miembros?zona=${data.zone}`}
              className="text-xs font-medium transition-opacity hover:opacity-70"
              style={{ color: data.accentColor }}
            >
              Investigadores {data.universityShort} →
            </Link>
            <Link
              href={`/${lang}/nosotros/miembros`}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Red NEXER completa →
            </Link>
          </div>
        </div>

        {/* University footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <a
            href={data.universityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-foreground transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {data.university}
          </a>
          <span className="text-xs font-semibold tracking-wide" style={{ color: data.accentColor }}>
            {data.universityShort}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
