import { getDictionary, type Lang } from "@/i18n/dictionaries";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string }> };

export default async function UnetePage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.joinUs;

  const fields = [
    { label: t.nameLabel, name: "name", type: "text" },
    { label: t.emailLabel, name: "email", type: "email" },
    { label: t.phoneLabel, name: "phone", type: "tel" },
    { label: t.researchLineLabel, name: "researchLine", type: "text" },
    { label: t.keywordsLabel, name: "keywords", type: "text" },
  ];

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
        <form
          action={`mailto:coordinacion.nexer@ufrontera.cl`}
          method="GET"
          className="space-y-5"
        >
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-card placeholder:text-muted/60 focus:outline-none focus:border-foreground/40 transition-colors"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="bio"
              className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide"
            >
              {t.bioLabel}
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={5}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-card placeholder:text-muted/60 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full text-sm font-medium text-card bg-foreground hover:opacity-90 transition-opacity active:scale-95"
          >
            {t.submitLabel}
          </button>
        </form>

        {/* Contact info */}
        <p className="text-xs text-muted mt-8 text-center leading-relaxed">{t.contactInfo}</p>
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
