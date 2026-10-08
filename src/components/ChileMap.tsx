"use client";

import { motion } from "framer-motion";

/* Simplified Chile outline — Pacific coast (left) + Andes border (right).
   ViewBox 0 0 460 680 → outline occupies x=30-115, labels at x=165+. */
const CHILE_PATH =
  "M 72,12 C 70,60 67,130 64,200 C 60,270 55,325 50,380 C 44,430 37,485 35,540 C 34,575 38,610 45,638 L 48,650 L 102,650 C 106,630 108,605 109,575 L 109,540 C 108,510 107,480 107,450 C 107,415 106,380 105,345 C 104,305 103,265 101,225 C 100,185 98,145 96,105 C 94,68 93,35 91,12 Z";

const NODES = [
  {
    id: "norte",
    city: "Antofagasta",
    shortUni: "UA",
    university: "Universidad de Antofagasta",
    env: "Desierto de Atacama",
    dotX: 72,
    dotY: 100,
    color: "#c4a04a",
    light: "#fdf6e3",
  },
  {
    id: "ohiggins",
    city: "Rancagua",
    shortUni: "UOH",
    university: "Universidad de O'Higgins",
    env: "Mediterráneo Semiárido",
    dotX: 69,
    dotY: 282,
    color: "#a06b3a",
    light: "#fdf0e8",
  },
  {
    id: "centro",
    city: "Temuco",
    shortUni: "UFRO",
    university: "Universidad de La Frontera",
    env: "Bosque Valdiviano",
    dotX: 65,
    dotY: 360,
    color: "#3d6b4f",
    light: "#edf5f0",
  },
  {
    id: "sur",
    city: "Punta Arenas",
    shortUni: "UMAG",
    university: "Universidad de Magallanes",
    env: "Ecosistema Subantártico",
    dotX: 70,
    dotY: 610,
    color: "#4a7fa5",
    light: "#edf4f9",
  },
];

export default function ChileMap() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs tracking-[0.22em] uppercase text-muted font-medium mb-4">
            Geografía de la red
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
            Cuatro Nodos, Un País
          </h2>
          <p className="text-muted text-base leading-relaxed max-w-lg mt-4">
            Desde el desierto más árido del mundo hasta los ecosistemas
            subantárticos: NEXER cubre el gradiente climático completo de Chile.
          </p>
        </div>

        {/* Map */}
        <div className="flex justify-center">
          <svg
            viewBox="0 0 460 680"
            style={{ width: "100%", maxWidth: "540px", height: "auto" }}
            aria-label="Mapa de Chile con los cuatro nodos universitarios de NEXER"
          >
            {/* Chile outline */}
            <motion.path
              d={CHILE_PATH}
              fill="#e8e4dc"
              stroke="#1c1917"
              strokeWidth="0.8"
              fillOpacity="0.35"
              strokeOpacity="0.15"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Nodes */}
            {NODES.map((node, i) => (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + i * 0.18,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Dashed connector line */}
                <line
                  x1={node.dotX + 7}
                  y1={node.dotY}
                  x2="150"
                  y2={node.dotY}
                  stroke={node.color}
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  opacity="0.55"
                />

                {/* Pulse ring */}
                <motion.circle
                  cx={node.dotX}
                  cy={node.dotY}
                  r="5"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  animate={{ r: [5, 14, 5], opacity: [0.4, 0, 0.4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.8,
                    delay: i * 0.7,
                    ease: "easeOut",
                  }}
                />

                {/* Dot */}
                <circle cx={node.dotX} cy={node.dotY} r="5" fill={node.color} />

                {/* Zone label (overline) */}
                <text
                  x="158"
                  y={node.dotY - 9}
                  fontSize="8.5"
                  fill={node.color}
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    letterSpacing: "0.12em",
                  }}
                >
                  {node.shortUni.toUpperCase()} · {node.env.toUpperCase()}
                </text>

                {/* City name */}
                <text
                  x="158"
                  y={node.dotY + 5}
                  fontSize="18"
                  fill="#1c1917"
                  style={{
                    fontFamily:
                      "var(--font-instrument-serif), Georgia, serif",
                  }}
                >
                  {node.city}
                </text>

                {/* University full name */}
                <text
                  x="158"
                  y={node.dotY + 19}
                  fontSize="10"
                  fill="#78716c"
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  {node.university}
                </text>
              </motion.g>
            ))}

            {/* Vertical spine connecting dots */}
            <motion.line
              x1="70"
              y1="110"
              x2="70"
              y2="600"
              stroke="#e8e4dc"
              strokeWidth="1"
              strokeDasharray="2 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
