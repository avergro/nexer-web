import { getDictionary, type Lang } from "@/i18n/dictionaries";
import { getNewsPosts } from "@/lib/news";
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import InteractiveMap from "@/components/InteractiveMap";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string }> };

export default async function Page({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const news = await getNewsPosts();

  return (
    <main className="flex-1">
      <Hero dict={dict} lang={lang} />
      <MissionSection dict={dict} lang={lang} news={news} />
      <InteractiveMap dict={dict} lang={lang} />
      <Footer dict={dict} lang={lang} />
    </main>
  );
}
