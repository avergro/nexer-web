"use client";

import { motion } from "framer-motion";

interface Aim {
  title: string;
  text: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const row = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function NexerAimsList({ aims }: { aims: Aim[] }) {
  return (
    <motion.div
      className="space-y-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {aims.map((aim, i) => (
        <motion.div
          key={i}
          variants={row}
          whileHover={{ x: 5, transition: { duration: 0.15, ease: "easeOut" } }}
          className="group relative flex gap-6 p-6 border border-border rounded-lg items-start overflow-hidden"
        >
          {/* Animated number */}
          <motion.span
            className="font-serif text-2xl text-muted shrink-0 w-8 leading-tight"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.08 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {i + 1}.
          </motion.span>

          <div>
            <h3 className="font-medium text-foreground mb-1">{aim.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{aim.text}</p>
          </div>

          {/* Background fill on hover */}
          <motion.div
            className="absolute inset-0 bg-foreground/[0.02] pointer-events-none rounded-lg"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
