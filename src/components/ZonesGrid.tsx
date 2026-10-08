"use client";

import { motion } from "framer-motion";
import EditorialCard, { type ZoneData } from "./EditorialCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.05,
    },
  },
};

export default function ZonesGrid({ zones }: { zones: ZoneData[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {zones.map((zone) => (
        <EditorialCard key={zone.id} data={zone} />
      ))}
    </motion.div>
  );
}
