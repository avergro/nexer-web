import type { Metadata } from "next";
import type { Lang } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/dictionaries";
import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn
      ? "NEXER — Extreme Environments Network"
      : "NEXER — Red de Ambientes Extremos",
    description: isEn
      ? "Understanding the limits of life in a changing world. Research network on extreme environments in Chile."
      : "Comprendiendo los límites de la vida en un mundo cambiante. Red de investigación en ambientes extremos de Chile.",
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }] satisfies { lang: Lang }[];
}

export default async function LangLayout({ children, params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "es";
  const dict = getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      {children}
    </>
  );
}
