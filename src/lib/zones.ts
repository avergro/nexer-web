import type { Lang } from "@/i18n/dictionaries";

export interface ZoneContent {
  label: string;
  tagline: string;
  description: string;
  environment: string;
}

export interface ZoneData {
  id: string;
  zone: "norte" | "ohiggins" | "usach" | "centro" | "sur";
  city: string;
  university: string;
  universityShort: string;
  universityUrl: string;
  researchers: string[];
  accentColor: string;
  accentLight: string;
  mapX: number;
  mapY: number;
  labelY?: number; // optional vertical offset for label when dots are close together
  content: Record<Lang, ZoneContent>;
}

export function getZoneContent(zone: ZoneData, lang: Lang): ZoneContent {
  return zone.content[lang];
}

export const ZONES: ZoneData[] = [
  {
    id: "norte",
    zone: "norte",
    city: "Antofagasta",
    university: "Universidad de Antofagasta",
    universityShort: "UA",
    universityUrl: "https://www.uantof.cl",
    researchers: [],
    accentColor: "#c4a04a",
    accentLight: "#fdf6e3",
    mapX: 103,
    mapY: 112,
    content: {
      es: {
        label: "Zona Norte · I",
        tagline: "Vida al límite del desierto más árido del mundo",
        description:
          "En el Desierto de Atacama, los organismos han desarrollado estrategias únicas para sobrevivir en condiciones de radiación extrema, escasez hídrica y salinidad. El nodo norte investiga estos mecanismos a nivel molecular y celular.",
        environment: "Desierto de Atacama · Ambientes Poliextremos",
      },
      en: {
        label: "Northern Zone · I",
        tagline: "Life at the edge of the world's driest desert",
        description:
          "In the Atacama Desert, organisms have developed unique strategies to survive extreme radiation, water scarcity, and salinity. The northern node investigates these mechanisms at the molecular and cellular level.",
        environment: "Atacama Desert · Polyextreme Environments",
      },
    },
  },
  {
    id: "usach",
    zone: "usach",
    city: "Santiago",
    university: "Universidad de Santiago de Chile",
    universityShort: "USACH",
    universityUrl: "https://www.usach.cl",
    researchers: [],
    accentColor: "#6b5f8e",
    accentLight: "#f0eef7",
    mapX: 100,
    mapY: 262,
    labelY: 238,
    content: {
      es: {
        label: "Zona Metropolitana · II",
        tagline: "Ciencia aplicada en el corazón de Chile",
        description:
          "La Universidad de Santiago aporta capacidades únicas en ecología urbana, química ambiental y biotecnología. El nodo USACH estudia la interfaz entre los ecosistemas andinos y el entorno metropolitano, un ambiente extremo de tipo socioeconómico y climático.",
        environment: "Cuencas Andinas · Interfaz Urbano-Natural",
      },
      en: {
        label: "Metropolitan Zone · II",
        tagline: "Applied science at the heart of Chile",
        description:
          "The University of Santiago contributes unique expertise in urban ecology, environmental chemistry, and biotechnology. The USACH node studies the interface between Andean ecosystems and the metropolitan environment.",
        environment: "Andean Watersheds · Urban-Natural Interface",
      },
    },
  },
  {
    id: "ohiggins",
    zone: "ohiggins",
    city: "Rancagua",
    university: "Universidad de O'Higgins",
    universityShort: "UOH",
    universityUrl: "https://www.uoh.cl",
    researchers: [],
    accentColor: "#a06b3a",
    accentLight: "#fdf0e8",
    mapX: 99,
    mapY: 273,
    labelY: 300,
    content: {
      es: {
        label: "Zona O'Higgins · III",
        tagline: "Ecosistemas mediterráneos en el umbral del cambio",
        description:
          "O'Higgins es la principal zona agrícola de Chile: viñedos, frutales y cultivos de exportación que alimentan mercados globales crecen aquí bajo un clima mediterráneo cada vez más extremo. La sequía, las heladas tardías y las olas de calor someten estos cultivos a un estrés ambiental sin precedentes. El nodo UOH es clave para comprender cómo los organismos —desde microbiota del suelo hasta plantas cultivadas— responden y se adaptan a estos límites, conectando ciencia de ambientes extremos con la seguridad alimentaria del país.",
        environment: "Agricultura Mediterránea · Estrés Hídrico y Térmico",
      },
      en: {
        label: "O'Higgins Zone · III",
        tagline: "Mediterranean ecosystems at the threshold of change",
        description:
          "O'Higgins is Chile's foremost agricultural region: vineyards, orchards, and export crops that feed global markets grow here under an increasingly extreme Mediterranean climate. Drought, late frosts, and heat waves subject these crops to unprecedented environmental stress. The UOH node is central to understanding how organisms — from soil microbiota to cultivated plants — respond and adapt to these limits, linking extreme-environment science to the country's food security.",
        environment: "Mediterranean Agriculture · Hydric and Thermal Stress",
      },
    },
  },
  {
    id: "centro",
    zone: "centro",
    city: "Temuco",
    university: "Universidad de La Frontera",
    universityShort: "UFRO",
    universityUrl: "https://www.ufro.cl",
    researchers: [],
    accentColor: "#3d6b4f",
    accentLight: "#edf5f0",
    mapX: 74,
    mapY: 349,
    content: {
      es: {
        label: "Zona Araucanía · IV",
        tagline: "Carbono, suelos y la memoria del bosque templado",
        description:
          "Los suelos volcánicos del sur de Chile almacenan vastas reservas de carbono orgánico. La sede coordinadora UFRO estudia la secuestración de carbono en suelos extremos, la tolerancia al estrés en plantas y los ciclos biogeoquímicos.",
        environment: "Bosque Valdiviano · Suelos Volcánicos Andosoles",
      },
      en: {
        label: "Araucanía Zone · IV",
        tagline: "Carbon, soils, and the memory of the temperate forest",
        description:
          "The volcanic soils of southern Chile store vast reserves of organic carbon. UFRO, the network's coordinating institution, studies carbon sequestration in extreme soils, plant stress tolerance, and biogeochemical cycles.",
        environment: "Valdivian Forest · Volcanic Andosol Soils",
      },
    },
  },
  {
    id: "sur",
    zone: "sur",
    city: "Punta Arenas",
    university: "Universidad de Magallanes",
    universityShort: "UMAG",
    universityUrl: "https://www.umag.cl",
    researchers: [],
    accentColor: "#4a7fa5",
    accentLight: "#edf4f9",
    mapX: 97,
    mapY: 630,
    content: {
      es: {
        label: "Zona Sur · V",
        tagline: "Dinámica del carbono en el fin del mundo",
        description:
          "La Patagonia y sus ecosistemas subantárticos representan uno de los últimos grandes sumideros de carbono del planeta. El nodo austral estudia la dinámica del carbono en el Antropoceno bajo las condiciones más extremas del hemisferio sur.",
        environment: "Patagonia · Ecosistemas Subantárticos",
      },
      en: {
        label: "Southern Zone · V",
        tagline: "Carbon dynamics at the end of the world",
        description:
          "Patagonia and its subantarctic ecosystems represent one of the planet's last great carbon sinks. The southern node studies carbon dynamics in the Anthropocene under the most extreme conditions in the Southern Hemisphere.",
        environment: "Patagonia · Subantarctic Ecosystems",
      },
    },
  },
];
