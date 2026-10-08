import { notFound } from "next/navigation";
import { marked } from "marked";
import { getDictionary, type Lang } from "@/i18n/dictionaries";
import { getAllNewsSlugs, getNewsPostBySlug } from "@/lib/news";
import { asset } from "@/lib/assets";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getAllNewsSlugs();
  return ["es", "en"].flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

const ZONE_LABELS: Record<string, string> = {
  general: "General",
  norte: "Norte",
  ohiggins: "O'Higgins",
  centro: "Centro",
  sur: "Sur",
};

export default async function NoticiaDetallePage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const post = getNewsPostBySlug(slug);
  if (!post) notFound();

  const html = marked.parse(post.content ?? "") as string;

  const dateLabel = new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.dateISO));

  return (
    <>
      <article className="max-w-3xl mx-auto px-6 pt-16 pb-2">
        <a
          href={`/${lang}/noticias`}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ← {dict.news.title}
        </a>

        <h1 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mt-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm text-muted">
          <time>{dateLabel}</time>
          {post.author && <span>· {post.author}</span>}
          {post.zone && post.zone !== "general" && (
            <span>· {ZONE_LABELS[post.zone] ?? post.zone}</span>
          )}
        </div>

        {post.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(post.image)}
            alt={post.title}
            className="w-full rounded-2xl mt-8 mb-2 object-cover aspect-[16/9] border border-border"
          />
        )}

        {post.excerpt && (
          <p className="font-serif text-xl text-muted leading-relaxed mt-8 mb-8 border-l-2 border-border pl-5">
            {post.excerpt}
          </p>
        )}

        <div
          className="news-content mt-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      <Footer dict={dict} lang={lang} />
    </>
  );
}
