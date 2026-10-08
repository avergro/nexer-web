import { getDictionary, type Lang } from "@/i18n/dictionaries";
import { MEMBERS } from "@/lib/members";
import MembersGrid from "@/components/MembersGrid";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function MiembrosPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.members;

  const members = MEMBERS.filter((m) => m.category !== "board");
  const allLabel = lang === "en" ? "All" : "Todos";

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
            {t.pageTitle}
          </h1>
        </div>
        <MembersGrid members={members} dict={dict} allLabel={allLabel} />
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
