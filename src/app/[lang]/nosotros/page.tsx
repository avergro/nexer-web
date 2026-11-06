import { getDictionary, type Lang } from "@/i18n/dictionaries";
import { MEMBERS } from "@/lib/members";
import { UNIVERSITIES } from "@/lib/network";
import Footer from "@/components/Footer";
import NexerAims from "@/components/NexerAims";
import AnimatedCard from "@/components/AnimatedCard";

type Props = { params: Promise<{ lang: string }> };

export default async function NosotrosPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.about;

  const committee = MEMBERS.filter((m) => m.category === "committee");

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

        {/* Comité Científico */}
        <section id="comite-cientifico" className="mb-20 scroll-mt-20">
          <h2 className="font-serif text-2xl text-foreground mb-8">{t.committeeTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6 p-2 -m-2">
            {committee.map((member) => (
              <AnimatedCard key={member.id} className="p-6 border border-border rounded-lg bg-card">
                {member.scholarUrl ? (
                  <a
                    href={member.scholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:opacity-60 transition-opacity"
                  >
                    {member.name}
                  </a>
                ) : (
                  <p className="font-medium text-foreground">{member.name}</p>
                )}
                {member.role && (
                  <p className="text-sm text-muted mt-1">{member.role}</p>
                )}
                <p className="text-xs text-muted mt-1">{member.institution}</p>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Universidades de la red (logos oficiales a color) */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl text-foreground mb-10">{t.institutionsTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {UNIVERSITIES.map((u) => (
              <a
                key={u.id}
                href={u.href}
                target="_blank"
                rel="noopener noreferrer"
                title={u.name}
                className="flex items-center justify-center h-28 p-4 rounded-lg border border-border bg-white hover:border-foreground/20 transition-colors duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={u.logo}
                  alt={u.name}
                  style={{ height: `${u.h}px` }}
                  className="w-auto max-w-full object-contain"
                  draggable={false}
                />
              </a>
            ))}
          </div>
        </section>
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
