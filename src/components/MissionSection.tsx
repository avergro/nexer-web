import type { Dict, Lang } from "@/i18n/dictionaries";
import type { NewsPost } from "@/lib/news";
import NewsFeed from "./NewsFeed";

const INSTITUTIONS = ["UA", "USACH", "UOH", "UFRO", "UMAG"];

interface Props {
  dict: Dict;
  lang: Lang;
  news: NewsPost[];
}

export default function MissionSection({ dict, lang, news }: Props) {
  const t = dict.mission;

  return (
    <>
      {/* Dark mission strip */}
      <section className="px-6 py-20" style={{ backgroundColor: "#1c1917" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="text-xs tracking-[0.22em] uppercase font-medium mb-6 block"
            style={{ color: "rgba(249,247,242,0.45)" }}
          >
            {t.label}
          </span>
          <p
            className="font-serif text-3xl sm:text-4xl leading-[1.25] tracking-tight"
            style={{ color: "#f9f7f2" }}
          >
            "{t.quote}"
          </p>
          <div
            className="h-px w-16 mx-auto mt-10 mb-10"
            style={{ backgroundColor: "rgba(249,247,242,0.15)" }}
          />
          <p
            className="text-base leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(249,247,242,0.6)" }}
          >
            {t.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {INSTITUTIONS.map((inst) => (
              <span
                key={inst}
                className="text-sm font-semibold tracking-widest"
                style={{ color: "rgba(249,247,242,0.35)" }}
              >
                {inst}
              </span>
            ))}
          </div>
        </div>
      </section>

      <NewsFeed initialNews={news} dict={dict} lang={lang} limit={3} />
    </>
  );
}
