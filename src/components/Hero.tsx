"use client";

import { asset } from "@/lib/assets";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { Dict, Lang } from "@/i18n/dictionaries";
import LangSwitcher from "./LangSwitcher";

const SLIDES = [
  { src: asset("/images/gallery/atacama-desierto.webp"), alt: "Desierto de Atacama · Nodo Norte" },
  { src: asset("/images/gallery/outreach-04.webp"), alt: "Vinculación con la comunidad · Red NEXER" },
];

const INTERVAL = 6000;

export default function Hero({ dict, lang }: { dict: Dict; lang: Lang }) {
  const t = dict.hero;
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);

  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[92vh] px-6 text-center overflow-hidden">

      {/* -- Background carousel -- */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVAL / 1000 + 1.5, ease: "linear" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SLIDES[index].src}
              alt={SLIDES[index].alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* -- Overlays -- */}
      {/* Dark base */}
      <div className="absolute inset-0 z-10" style={{ background: "rgba(18,15,13,0.52)" }} />
      {/* Bottom fade to page bg */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 z-10"
        style={{ background: "linear-gradient(to top, #f9f7f2 0%, transparent 100%)" }}
      />
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-24 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(18,15,13,0.4) 0%, transparent 100%)" }}
      />

      {/* -- Lang switcher -- */}
      <div className="absolute top-6 right-6 z-20">
        <LangSwitcher lang={lang} light />
      </div>

      {/* -- Content -- */}
      <div className="relative z-20 max-w-3xl mx-auto">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="h-px w-12" style={{ background: "rgba(249,247,242,0.4)" }} />
          <span
            className="text-xs tracking-[0.22em] uppercase font-medium"
            style={{ color: "rgba(249,247,242,0.7)" }}
          >
            {t.networkTag}
          </span>
          <span className="h-px w-12" style={{ background: "rgba(249,247,242,0.4)" }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl leading-[1.05] tracking-tight"
          style={{ color: "#f9f7f2" }}
        >
          NEXER
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-xl sm:text-2xl italic mt-4 leading-relaxed"
          style={{ color: "rgba(249,247,242,0.75)" }}
        >
          {t.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto mt-8"
          style={{ color: "rgba(249,247,242,0.62)" }}
        >
          {t.description}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <a
            href="#zonas"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "#f9f7f2", color: "#1c1917" }}
          >
            {t.ctaExplore}
            <ArrowDown size={14} />
          </a>
          <a
            href="mailto:coordinacion.nexer@ufrontera.cl"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all duration-200 active:scale-95"
            style={{
              color: "rgba(249,247,242,0.85)",
              border: "1px solid rgba(249,247,242,0.25)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(249,247,242,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {t.ctaContact}
          </a>
        </motion.div>
      </div>

      {/* -- Slide dots -- */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? "20px" : "6px",
              height: "6px",
              background: i === index ? "rgba(249,247,242,0.85)" : "rgba(249,247,242,0.3)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* -- Scroll indicator -- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={18} style={{ color: "rgba(249,247,242,0.4)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
