import { getDictionary, type Lang } from "@/i18n/dictionaries";
import { getNewsPosts } from "@/lib/news";
import NewsFeed from "@/components/NewsFeed";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string }> };

export default async function NoticiasPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const posts = await getNewsPosts();

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-2">
        <span className="text-xs tracking-[0.22em] uppercase text-muted font-medium mb-4 block">
          {dict.news.timelineLabel}
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
          {dict.news.title}
        </h1>
      </div>

      {/* NewsFeed with no limit — shows all CMS + Instagram posts */}
      <NewsFeed initialNews={posts} dict={dict} lang={lang} />

      <Footer dict={dict} lang={lang} />
    </>
  );
}
