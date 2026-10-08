import { asset } from "@/lib/assets";
import { getDictionary, type Lang } from "@/i18n/dictionaries";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string }> };

const GALLERY_IMAGES = [
  {
    src: asset("/images/gallery/outreach-01.jpg"),
    alt: "Actividad de difusión NEXER",
    caption: "Actividades de difusión",
  },
  {
    src: asset("/images/gallery/outreach-02.jpg"),
    alt: "Evento de divulgación científica",
    caption: "Divulgación científica",
  },
  {
    src: asset("/images/gallery/outreach-03.jpg"),
    alt: "Feria científica NEXER",
    caption: "Feria científica",
  },
  {
    src: asset("/images/gallery/outreach-04.jpg"),
    alt: "Actividad comunitaria",
    caption: "Vinculación con la comunidad",
  },
  {
    src: asset("/images/gallery/outreach-05.jpg"),
    alt: "Evento educativo NEXER",
    caption: "Educación científica",
  },
  {
    src: asset("/images/gallery/outreach-06.jpg"),
    alt: "Actividad de campo",
    caption: "Trabajo de campo",
  },
  {
    src: asset("/images/gallery/atacama-desierto.jpg"),
    alt: "Desierto de Atacama",
    caption: "Desierto de Atacama · Nodo Norte",
  },
  {
    src: asset("/images/gallery/co2-navarino.jpg"),
    alt: "Muestra de CO₂ en Navarino",
    caption: "Medición de CO₂ · Isla Navarino",
  },
  {
    src: asset("/images/gallery/event-2019-01.jpg"),
    alt: "Evento NEXER 2019",
    caption: "NEXER 2019",
  },
  {
    src: asset("/images/gallery/event-umag-2019.jpg"),
    alt: "Evento UMAG 2019",
    caption: "Universidad de Magallanes",
  },
  {
    src: asset("/images/gallery/event-2020-01.jpg"),
    alt: "Evento NEXER 2020",
    caption: "NEXER 2020",
  },
  {
    src: asset("/images/gallery/conference-2020.jpg"),
    alt: "Conferencia internacional 2020",
    caption: "Conferencia internacional",
  },
  {
    src: asset("/images/gallery/institutional-01.jpg"),
    alt: "Imagen institucional NEXER",
    caption: "Red NEXER",
  },
  {
    src: asset("/images/gallery/umagtv.jpg"),
    alt: "Cobertura televisiva UMAG",
    caption: "UMAG TV",
  },
];

export default async function GaleriaPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.gallery;

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs tracking-[0.22em] uppercase text-muted font-medium mb-4 block">
            {lang === "en" ? "Visual Archive" : "Archivo visual"}
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
            {t.pageTitle}
          </h1>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="group relative break-inside-avoid overflow-hidden rounded-lg border border-border"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                style={{
                  background:
                    "linear-gradient(to top, rgba(28,25,23,0.7) 0%, transparent 60%)",
                }}
              >
                <span className="text-[11px] font-medium tracking-wide text-white/90">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Outreach posters section */}
        <div className="mt-20">
          <h2 className="font-serif text-3xl text-foreground mb-10">
            {lang === "en" ? "Webinar Posters" : "Afiches de Webinars"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: asset("/images/outreach/webinar-francisco-matus.jpg"),
                label: "Dr. Francisco Matus",
              },
              {
                src: asset("/images/outreach/webinar-nexer-1.jpg"),
                label: "Webinar NEXER",
              },
              {
                src: asset("/images/outreach/entrevista-leon-bravo.jpg"),
                label: "Dr. León Bravo",
              },
              {
                src: asset("/images/outreach/entrevista-leticia-barrientos.jpg"),
                label: "Dra. Leticia Barrientos",
              },
              {
                src: asset("/images/outreach/entrevista-pedro-zamorano.jpg"),
                label: "Dr. Pedro Zamorano",
              },
              {
                src: asset("/images/outreach/entrevista-maria-luz-mora.jpg"),
                label: "Dra. María de la Luz Mora",
              },
            ].map((poster, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-xl border border-border"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poster.src}
                  alt={poster.label}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="px-4 py-3">
                  <p className="text-xs font-medium text-muted tracking-wide">
                    {poster.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
