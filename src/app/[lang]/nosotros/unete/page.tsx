import { getDictionary, type Lang } from "@/i18n/dictionaries";
import Footer from "@/components/Footer";
import JoinForm from "@/components/JoinForm";

type Props = { params: Promise<{ lang: string }> };

export default async function UnetePage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.joinUs;

  return (
    <>
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight mb-6">
            {t.pageTitle}
          </h1>
          <p className="text-base text-muted leading-relaxed">{t.intro}</p>
        </div>

        {/* Categories info */}
        <div className="mb-10 p-5 bg-card border border-border rounded-lg">
          <p className="text-xs text-muted leading-relaxed">{t.categories}</p>
        </div>

        {/* Contact form */}
        <JoinForm t={t} lang={lang} />

        {/* Contact info */}
        <p className="text-xs text-muted mt-8 text-center leading-relaxed">{t.contactInfo}</p>
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
