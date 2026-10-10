import { asset } from "@/lib/assets";
import { getDictionary, type Lang } from "@/i18n/dictionaries";
import { MEMBERS } from "@/lib/members";
import Footer from "@/components/Footer";
import NexerAims from "@/components/NexerAims";
import AnimatedCard from "@/components/AnimatedCard";

type Props = { params: Promise<{ lang: string }> };

export default async function NosotrosPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.about;

  const boardMembers = MEMBERS.filter((m) => m.category === "board");

  const aims = [
    { title: t.aim1Title, text: t.aim1 },
    { title: t.aim2Title, text: t.aim2 },
    { title: t.aim3Title, text: t.aim3 },
    { title: t.aim4Title, text: t.aim4 },
  ];

  const achievements = [
    { icon: "90+", text: t.papers },
    { icon: "31", text: t.theses },
    { icon: "45+", text: t.outreach },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Page header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.22em] uppercase text-muted font-medium mb-4">
            {t.founded}
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight mb-6">
            {t.pageTitle}
          </h1>
        </div>

        {/* Mission */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl text-foreground mb-4">{t.missionTitle}</h2>
          <p className="text-lg text-muted leading-relaxed border-l-2 border-border pl-6">
            {t.missionText}
          </p>
        </section>

        {/* Objectives */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl text-foreground mb-8">{t.aimsTitle}</h2>
          <NexerAims aims={aims} />
        </section>

        {/* Achievements */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl text-foreground mb-8">{t.achievementsTitle}</h2>
          <div className="grid sm:grid-cols-3 gap-6 p-2 -m-2">
            {achievements.map((a, i) => (
              <AnimatedCard key={i} className="text-center p-8 border border-border rounded-lg bg-card">
                <p className="font-serif text-4xl text-foreground mb-2">{a.icon}</p>
                <p className="text-sm text-muted">{a.text}</p>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Board */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl text-foreground mb-8">{t.boardTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6 p-2 -m-2">
            {boardMembers.map((member) => (
              <AnimatedCard key={member.id} className="p-6 border border-border rounded-lg bg-card">
                <p className="font-medium text-foreground">{member.name}</p>
                {member.role && (
                  <p className="text-sm text-muted mt-1">{member.role}</p>
                )}
                <p className="text-xs text-muted mt-1">{member.institution}</p>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Member institutions */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl text-foreground mb-10">
            {lang === "en" ? "Member Institutions" : "Instituciones Miembro"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            {[
              { src: asset("/images/logos/ua-logo.webp"),                   alt: "Universidad de Antofagasta", href: "https://www.uantof.cl" },
              { src: asset("/images/logos/uoh-horizontal-original.svg"),   alt: "Universidad de O'Higgins",   href: "https://www.uoh.cl" },
              { src: asset("/images/logos/ufro-logo.webp"),                  alt: "Universidad de La Frontera", href: "https://www.ufro.cl" },
              { src: asset("/images/logos/mag-logo.webp"),                   alt: "Universidad de Magallanes",  href: "https://www.umag.cl" },
              { src: asset("/images/logos/bioren-logo.webp"),                alt: "BIOREN · UFRO",              href: "https://www.ufro.cl" },
            ].map((inst) => (
              <a
                key={inst.alt}
                href={inst.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 rounded-lg border border-border hover:border-foreground/20 transition-all duration-300 grayscale hover:grayscale-0"
                title={inst.alt}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={inst.src} alt={inst.alt} className="max-h-14 w-auto object-contain" />
              </a>
            ))}
          </div>
        </section>
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
