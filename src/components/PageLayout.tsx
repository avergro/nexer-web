import type { Dict, Lang } from "@/i18n/dictionaries";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  dict: Dict;
  lang: Lang;
  children: React.ReactNode;
}

export default function PageLayout({ dict, lang, children }: PageLayoutProps) {
  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
