import { asset } from "@/lib/assets";
import { getDictionary, type Lang } from "@/i18n/dictionaries";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string }> };

const WEBINARS = [
  {
    date: "27 de agosto 2020",
    dateEn: "August 27, 2020",
    title: "Ecología microbiana en ambientes extremos del norte de Chile",
    titleEn: "Microbial ecology in extreme environments of northern Chile",
    speaker: "Dra. María de la Luz Mora",
    institution: "Universidad de La Frontera",
    poster: asset("/images/outreach/entrevista-maria-luz-mora.jpg"),
  },
  {
    date: "8 de septiembre 2020",
    dateEn: "September 8, 2020",
    title: "Biología de ambientes extremos: investigación en el nodo sur",
    titleEn: "Extreme environment biology: research at the southern node",
    speaker: "Dr. Pedro Zamorano",
    institution: "Universidad de La Frontera",
    poster: asset("/images/outreach/entrevista-pedro-zamorano.jpg"),
  },
  {
    date: "1 de octubre 2020",
    dateEn: "October 1, 2020",
    title: "Plantas en ambientes extremos: estrés y tolerancia",
    titleEn: "Plants in extreme environments: stress and tolerance",
    speaker: "Dr. León Bravo",
    institution: "Universidad de La Frontera",
    poster: asset("/images/outreach/entrevista-leon-bravo.jpg"),
  },
  {
    date: "24 de septiembre 2020",
    dateEn: "September 24, 2020",
    title: "Microbiomas en ambientes poliextremos",
    titleEn: "Microbiomes in polyextreme environments",
    speaker: "Dra. Leticia Barrientos",
    institution: "Universidad de La Frontera",
    poster: asset("/images/outreach/entrevista-leticia-barrientos.jpg"),
  },
  {
    date: "29 de octubre 2020",
    dateEn: "October 29, 2020",
    title: "Bioprospección microbiana en ambientes extremos",
    titleEn: "Microbial bioprospecting in extreme environments",
    speaker: "Dr. Milko Jorquera",
    institution: "Universidad de La Frontera",
    poster: asset("/images/outreach/webinar-nexer-1.jpg"),
  },
  {
    date: "3 de noviembre 2020",
    dateEn: "November 3, 2020",
    title: "Dinámica de carbono en suelos extremos",
    titleEn: "Carbon dynamics in extreme soils",
    speaker: "Dr. Francisco Matus",
    institution: "Universidad de La Frontera",
    poster: asset("/images/outreach/webinar-francisco-matus.jpg"),
  },
];

const SOCIAL_LINKS = [
  { label: "Instagram", handle: "@nexerchile", href: "https://www.instagram.com/nexerchile" },
  { label: "ResearchGate", handle: "NEXER Chile", href: "https://www.researchgate.net" },
];

export default async function DifusionPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.outreach;

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
            {t.pageTitle}
          </h1>
        </div>

        {/* Webinars */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl text-foreground mb-10">{t.webinarsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WEBINARS.map((webinar, i) => (
              <div
                key={i}
                className="group flex flex-col overflow-hidden rounded-xl border border-border"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                {webinar.poster && (
                  <div className="aspect-video overflow-hidden bg-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={webinar.poster}
                      alt={webinar.speaker}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted font-medium mb-2">
                    {lang === "en" ? webinar.dateEn : webinar.date}
                  </p>
                  <h3 className="font-serif text-base leading-snug text-foreground mb-3">
                    {lang === "en" ? webinar.titleEn : webinar.title}
                  </h3>
                  <p className="text-xs text-muted">
                    <span className="font-medium text-foreground">{webinar.speaker}</span>
                    {" · "}
                    {webinar.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social media */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl text-foreground mb-6">{t.socialTitle}</h2>
          <p className="text-sm text-muted mb-6">{t.followUs}</p>
          <div className="flex flex-wrap gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm text-foreground hover:bg-foreground/5 transition-colors"
              >
                <span className="font-medium">{link.label}</span>
                <span className="text-muted text-xs">{link.handle}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
