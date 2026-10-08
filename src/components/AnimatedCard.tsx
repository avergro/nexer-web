"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedCard({ children, className }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.035, y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
      className={className}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
