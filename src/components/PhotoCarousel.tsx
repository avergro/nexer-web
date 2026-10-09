"use client";

import { asset } from "@/lib/assets";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  src: string;
  caption: string;
  zone?: string;
}

const SLIDES: Slide[] = [
  {
    src: asset("/images/gallery/atacama-desierto.webp"),
    caption: "Desierto de Atacama",
    zone: "Nodo Norte · UA",
  },
  {
    src: asset("/images/gallery/outreach-04.webp"),
    caption: "Vinculación con la comunidad",
    zone: "Red NEXER",
  },
];

const INTERVAL = 5000;

export default function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(i);
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo((index + 1) % SLIDES.length), [index, goTo]);
  const prev = useCallback(() => goTo((index - 1 + SLIDES.length) % SLIDES.length), [index, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (INTERVAL / 50), 100));
    }, 50);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [index, paused, next]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(260px, 38vw, 520px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Ken Burns zoom */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVAL / 1000 + 1, ease: "linear" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SLIDES[index].src}
              alt={SLIDES[index].caption}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(28,25,23,0.72) 0%, rgba(28,25,23,0.15) 40%, transparent 70%)",
            }}
          />

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-10 left-8 sm:left-12"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1.5"
               style={{ color: "rgba(249,247,242,0.55)" }}>
              {SLIDES[index].zone}
            </p>
            <p className="font-serif text-xl sm:text-2xl text-white leading-tight">
              {SLIDES[index].caption}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
        style={{ background: "rgba(249,247,242,0.12)", backdropFilter: "blur(4px)" }}
        aria-label="Anterior"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 opacity-0 hover:opacity-100 focus:opacity-100"
        style={{ background: "rgba(249,247,242,0.12)", backdropFilter: "blur(4px)" }}
        aria-label="Siguiente"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Slide counter + dots */}
      <div className="absolute bottom-4 right-8 sm:right-12 flex items-center gap-3">
        <span className="text-[10px] font-medium tabular-nums"
              style={{ color: "rgba(249,247,242,0.45)" }}>
          {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? "20px" : "6px",
                height: "6px",
                background: i === index ? "rgba(249,247,242,0.9)" : "rgba(249,247,242,0.3)",
              }}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
           style={{ background: "rgba(249,247,242,0.1)" }}>
        <motion.div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: "rgba(249,247,242,0.6)",
            transition: paused ? "none" : undefined,
          }}
        />
      </div>
    </section>
  );
}
