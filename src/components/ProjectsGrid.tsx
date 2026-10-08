"use client";

import { motion, type Variants } from "framer-motion";
import type { Project } from "@/lib/projects";
import type { Lang } from "@/i18n/dictionaries";

const ZONE_COLORS: Record<string, string> = {
  norte:    "#c4a04a",
  usach:    "#6b5f8e",
  ohiggins: "#a06b3a",
  centro:   "#3d6b4f",
  sur:      "#4a7fa5",
};

const ZONE_LIGHT: Record<string, string> = {
  norte:    "#fdf6e3",
  usach:    "#f0eef7",
  ohiggins: "#fdf0e8",
  centro:   "#edf5f0",
  sur:      "#edf4f9",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const accent = ZONE_COLORS[project.zone] ?? "#78716c";
  const light  = ZONE_LIGHT[project.zone]  ?? "#f9f7f2";

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.04, transition: { duration: 0.22, ease: "easeOut" } }}
      className="p-7 rounded-xl border border-border hover:border-foreground/20 transition-colors duration-200 cursor-default"
      style={{ borderLeftColor: accent, borderLeftWidth: "3px" }}
    >
      <div
        className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-4"
        style={{ backgroundColor: light, color: accent }}
      >
        {project.institution}
      </div>
      <h3 className="font-serif text-lg text-foreground leading-snug mb-2">
        {project.title[lang]}
      </h3>
      <p className="text-xs text-muted mb-4">{project.director}</p>
      <p className="text-sm text-muted leading-relaxed">{project.description[lang]}</p>
    </motion.div>
  );
}

interface Props {
  projects: Project[];
  title: string;
  lang: Lang;
}

export default function ProjectsGrid({ projects, title, lang }: Props) {
  return (
    <section className="mb-20">
      <motion.h2
        className="font-serif text-2xl text-foreground mb-8"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="grid sm:grid-cols-2 gap-6 p-3 -m-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} />
        ))}
      </motion.div>
    </section>
  );
}
