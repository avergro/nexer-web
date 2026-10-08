import { getDictionary, type Lang } from "@/i18n/dictionaries";
import { PUBLICATIONS } from "@/lib/publications";
import PublicationsTable from "@/components/PublicationsTable";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string }> };

export default async function PublicacionesPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.research;

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
            {t.publicationsTitle}
          </h1>
        </div>

        <PublicationsTable publications={PUBLICATIONS} dict={dict} />
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
