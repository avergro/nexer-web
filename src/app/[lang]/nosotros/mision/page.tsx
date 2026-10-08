import { getDictionary, type Lang } from "@/i18n/dictionaries";
import Footer from "@/components/Footer";
import NexerAimsList from "@/components/NexerAimsList";

type Props = { params: Promise<{ lang: string }> };

export default async function MisionPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.about;

  const aims = [
    { title: t.aim1Title, text: t.aim1 },
    { title: t.aim2Title, text: t.aim2 },
    { title: t.aim3Title, text: t.aim3 },
    { title: t.aim4Title, text: t.aim4 },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight mb-4">
            {t.missionTitle}
          </h1>
        </div>

        {/* Mission statement */}
        <section className="mb-20">
          <blockquote className="text-xl sm:text-2xl font-serif italic text-foreground leading-relaxed border-l-4 border-foreground/20 pl-8">
            {t.missionText}
          </blockquote>
        </section>

        {/* Objectives */}
        <section>
          <h2 className="font-serif text-2xl text-foreground mb-8">{t.aimsTitle}</h2>
          <NexerAimsList aims={aims} />
        </section>
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
