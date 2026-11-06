// Universidades y áreas científicas que conforman la red NEXER.
// Fuente: "NEXER 2030 — Informe de Consolidación Científica" (oct 2026):
// 5 Áreas Científicas + 4 Plataformas Transversales.

import { asset } from "@/lib/assets";
import type { Lang } from "@/i18n/dictionaries";

export interface NetworkUniversity {
  id: string;
  short: string;
  name: string;
  href: string;
  /** Logo oficial a color */
  logo: string;
  /** Alto relativo del logo para equilibrar su peso visual */
  h: number;
}

// Orden norte → sur.
export const UNIVERSITIES: NetworkUniversity[] = [
  { id: "ua",    short: "UA",    name: "Universidad de Antofagasta",       href: "https://www.uantof.cl", logo: asset("/images/logos/ua-original.webp"),          h: 52 },
  { id: "usach", short: "USACH", name: "Universidad de Santiago de Chile", href: "https://www.usach.cl",  logo: asset("/images/logos/usach-escudo.svg"),          h: 72 },
  { id: "uoh",   short: "UOH",   name: "Universidad de O'Higgins",         href: "https://www.uoh.cl",    logo: asset("/images/logos/uoh-horizontal-original.svg"), h: 40 },
  { id: "ufro",  short: "UFRO",  name: "Universidad de La Frontera",       href: "https://www.ufro.cl",   logo: asset("/images/logos/ufro-original.webp"),        h: 68 },
  { id: "umag",  short: "UMAG",  name: "Universidad de Magallanes",        href: "https://www.umag.cl",   logo: asset("/images/logos/umag-original.webp"),        h: 72 },
];

export const THEMATIC_AREAS: Record<Lang, string[]> = {
  es: [
    "Área 1. Biodiversidad y Adaptación",
    "Área 2. Biogeoquímica y Funcionamiento de Sistemas Extremos",
    "Área 3. Procesos Físicos, Geológicos y Climáticos Extremos",
    "Área 4. Riesgos, Territorio y Resiliencia",
    "Área 5. Sociedad, Salud y Gobernanza en Ambientes Extremos",
  ],
  en: [
    "Area 1. Biodiversity and Adaptation",
    "Area 2. Biogeochemistry and Functioning of Extreme Systems",
    "Area 3. Extreme Physical, Geological and Climatic Processes",
    "Area 4. Risks, Territory and Resilience",
    "Area 5. Society, Health and Governance in Extreme Environments",
  ],
};

/** Valida un ORCID iD (formato + dígito verificador ISO 7064 11,2). */
export function isValidOrcid(raw: string): boolean {
  const id = raw.trim().replace(/^https?:\/\/orcid\.org\//i, "");
  if (!/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/i.test(id)) return false;
  const digits = id.replace(/-/g, "");
  let total = 0;
  for (let i = 0; i < 15; i++) total = (total + Number(digits[i])) * 2;
  const check = (12 - (total % 11)) % 11;
  const expected = check === 10 ? "X" : String(check);
  return digits[15].toUpperCase() === expected;
}

export function normalizeOrcid(raw: string): string {
  return raw.trim().replace(/^https?:\/\/orcid\.org\//i, "").toUpperCase();
}
