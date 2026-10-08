import { getDictionary, type Lang } from "@/i18n/dictionaries";
import { PROJECTS } from "@/lib/projects";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";

type Props = { params: Promise<{ lang: string }> };

export default async function ProyectosPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);
  const t = dict.research;

  const officialProjects    = PROJECTS.filter((p) => p.type === "official");
  const associatedProjects  = PROJECTS.filter((p) => p.type === "associated");

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
            {t.pageTitle}
          </h1>
        </div>

        <ProjectsGrid projects={officialProjects}   title={t.officialTitle}   lang={lang} />
        {associatedProjects.length > 0 && (
          <ProjectsGrid projects={associatedProjects} title={t.associatedTitle} lang={lang} />
        )}
      </div>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
