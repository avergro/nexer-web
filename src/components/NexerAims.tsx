"use client";

import { motion } from "framer-motion";

interface Aim {
  title: string;
  text: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function NexerAims({ aims }: { aims: Aim[] }) {
  return (
    <motion.div
      className="grid sm:grid-cols-2 gap-5 p-2 -m-2"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {aims.map((aim, i) => (
        <motion.div
          key={i}
          variants={card}
          whileHover={{ scale: 1.035, y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
          className="group relative flex flex-col p-8 border border-border rounded-lg bg-card"
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {/* Ghost number — clipped to card bounds */}
          <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
            <span
              aria-hidden
              className="select-none absolute -right-1 -bottom-5 font-serif leading-none text-foreground/[0.045]"
              style={{ fontSize: "9rem" }}
            >
              {i + 1}
            </span>
          </div>

          {/* Index badge */}
          <p className="font-mono text-xs text-muted tracking-[0.2em] mb-5">
            {String(i + 1).padStart(2, "0")}
          </p>

          <h3 className="font-serif text-xl text-foreground mb-3 leading-snug">
            {aim.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">{aim.text}</p>

          {/* Animated left accent line */}
          <motion.div
            className="absolute left-0 top-0 w-[2px] bg-foreground/20 rounded-full"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15 + i * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Hover bottom line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1.5px] bg-foreground/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.2 + i * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ originX: 0 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
