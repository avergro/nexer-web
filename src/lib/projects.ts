export interface Project {
  id: string;
  title: Record<"es" | "en", string>;
  director: string;
  institution: string;
  zone: "norte" | "usach" | "ohiggins" | "centro" | "sur";
  description: Record<"es" | "en", string>;
  type: "official" | "associated";
}

export const PROJECTS: Project[] = [
  // Official NEXER projects
  {
    id: "carbon-dynamics",
    title: {
      es: "Dinámica del carbono en el Antropoceno",
      en: "Carbon Dynamics in the Anthropocene",
    },
    director: "Dr. Armando Sepúlveda",
    institution: "Universidad de Magallanes",
    zone: "sur",
    description: {
      es: "Estudio de la secuestración de carbono en ambientes extremos chilenos y la acumulación de carbono en el Holoceno en fiordos patagónicos.",
      en: "Study of carbon sequestration in extreme Chilean environments and Holocene carbon accumulation in Patagonian fjords.",
    },
    type: "official",
  },
  {
    id: "soil-carbon",
    title: {
      es: "Efecto de los ciclos de secado y congelamiento en la secuestración de carbono del suelo",
      en: "Effect of Drying and Freezing Cycles on Soil Carbon Sequestration",
    },
    director: "Dr. Francisco Matus",
    institution: "Universidad de La Frontera",
    zone: "centro",
    description: {
      es: "Dinámica de suelos, formación de agregados y ciclos biogeoquímicos en suelos volcánicos del sur de Chile.",
      en: "Soil dynamics, aggregate formation and biogeochemical cycles in volcanic soils of southern Chile.",
    },
    type: "official",
  },
  {
    id: "extremophytes",
    title: {
      es: "Extremophytes: Mecanismos de tolerancia al estrés",
      en: "Extremophytes: Stress Tolerance Mechanisms",
    },
    director: "Dr. León Bravo",
    institution: "Universidad de La Frontera",
    zone: "centro",
    description: {
      es: "Tolerancia al estrés en plantas de ambientes extremos: mecanismos fisiológicos y moleculares en plantas antárticas y del desierto.",
      en: "Stress tolerance in plants from extreme environments: physiological and molecular mechanisms in Antarctic and desert plants.",
    },
    type: "official",
  },
  {
    id: "polyextreme",
    title: {
      es: "Adaptaciones en Ambientes Poliextremos",
      en: "Adaptations in Polyextreme Environments",
    },
    director: "Dra. Cristina Dorador",
    institution: "Universidad de Antofagasta",
    zone: "norte",
    description: {
      es: "Ecología microbiana en condiciones extremas, relaciones entre bacterias y arqueas en salares, metagenómica y secuenciación genómica de células individuales.",
      en: "Microbial ecology under extreme conditions, bacteria-archaea relationships in salt flats, metagenomics and single-cell genome sequencing.",
    },
    type: "official",
  },
  // Associated projects
  {
    id: "atacama-microbial-mat",
    title: {
      es: "Tapetes Microbianos del Atacama",
      en: "Atacama Microbial Mats",
    },
    director: "Dra. Alexandra Galetović",
    institution: "Universidad de Antofagasta",
    zone: "norte",
    description: {
      es: "Estudio de la diversidad y funcionamiento de tapetes microbianos en lagunas hipersalinas del Atacama, con foco en cianobacterias y su resistencia al arsénico.",
      en: "Study of diversity and functioning of microbial mats in hypersaline Atacama lagoons, focusing on cyanobacteria and their arsenic resistance.",
    },
    type: "associated",
  },
  {
    id: "fungal-biotech",
    title: {
      es: "Biotecnología Fúngica en Suelos Extremos",
      en: "Fungal Biotechnology in Extreme Soils",
    },
    director: "Dr. Cledir Santos",
    institution: "Universidad de La Frontera",
    zone: "centro",
    description: {
      es: "Prospección de hongos con capacidades biotecnológicas en suelos extremos del sur de Chile, con aplicaciones en biorremediación y producción de metabolitos secundarios.",
      en: "Prospecting for fungi with biotechnological capabilities in extreme soils of southern Chile, with applications in bioremediation and secondary metabolite production.",
    },
    type: "associated",
  },
];
