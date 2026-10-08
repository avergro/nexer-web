import { getDictionary, type Lang } from "@/i18n/dictionaries";
import { MEMBERS } from "@/lib/members";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string }> };

export default async function ComitePage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.about;

  const boardMembers = MEMBERS.filter((m) => m.category === "board");

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight mb-4">
            {t.boardTitle}
          </h1>
          <p className="text-muted">{t.founded}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="p-8 border border-border rounded-lg hover:border-foreground/20 transition-colors"
            >
              {member.scholarUrl ? (
                <a
                  href={member.scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl text-foreground mb-1 block hover:opacity-60 transition-opacity"
                >
                  {member.name}
                </a>
              ) : (
                <p className="font-serif text-xl text-foreground mb-1">{member.name}</p>
              )}
              {member.role && (
                <p className="text-sm font-medium text-muted mb-2">{member.role}</p>
              )}
              <p className="text-xs text-muted">{member.institution}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
