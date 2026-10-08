import { getDictionary, type Lang } from "@/i18n/dictionaries";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ lang: string }> };

const COURSES = [
  {
    title: "Ecología Microbiana en Ambientes Extremos",
    titleEn: "Microbial Ecology in Extreme Environments",
    instructor: "Dra. Cristina Dorador",
    institution: "Universidad de Antofagasta",
    level: "Postgrado",
    levelEn: "Graduate",
  },
  {
    title: "Carbono en Suelos Volcánicos",
    titleEn: "Carbon in Volcanic Soils",
    instructor: "Dr. Francisco Matus",
    institution: "Universidad de La Frontera",
    level: "Postgrado",
    levelEn: "Graduate",
  },
  {
    title: "Fisiología de Plantas en Ambientes Extremos",
    titleEn: "Plant Physiology in Extreme Environments",
    instructor: "Dr. León Bravo",
    institution: "Universidad de La Frontera",
    level: "Pre y Postgrado",
    levelEn: "Undergraduate & Graduate",
  },
  {
    title: "Ecosistemas Subantárticos y Cambio Climático",
    titleEn: "Subantarctic Ecosystems and Climate Change",
    instructor: "Dr. Juan Carlos Aravena",
    institution: "Universidad de Magallanes",
    level: "Postgrado",
    levelEn: "Graduate",
  },
];

export default async function FormacionPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.training;

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
            {t.pageTitle}
          </h1>
        </div>

        {/* Agenda */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl text-foreground mb-6">{t.agendaTitle}</h2>
          <div className="p-8 border border-border rounded-lg bg-card text-center">
            <p className="text-muted text-sm">{t.noEvents}</p>
          </div>
        </section>

        {/* Courses */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl text-foreground mb-8">{t.coursesTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {COURSES.map((course, i) => (
              <div
                key={i}
                className="p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors"
              >
                <h3 className="font-medium text-foreground text-sm leading-snug mb-2">
                  {lang === "en" ? course.titleEn : course.title}
                </h3>
                <p className="text-xs text-muted">{course.instructor}</p>
                <p className="text-xs text-muted mt-0.5">{course.institution}</p>
                <span className="inline-block mt-3 text-xs text-muted border border-border rounded-full px-2 py-0.5">
                  {lang === "en" ? course.levelEn : course.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
