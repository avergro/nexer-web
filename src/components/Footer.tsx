"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/assets";
import type { Dict, Lang } from "@/i18n/dictionaries";
import LangSwitcher from "./LangSwitcher";

const INSTITUTION_LINKS = [
  { label: "Coordinación", href: "mailto:coordinacion.nexer@ufrontera.cl" },
  { label: "UA", href: "https://www.uantof.cl" },
  { label: "UOH", href: "https://www.uoh.cl" },
  { label: "USACH", href: "https://www.usach.cl" },
  { label: "UFRO", href: "https://www.ufro.cl" },
  { label: "UMAG", href: "https://www.umag.cl" },
];

const UNIVERSITY_LOGOS = [
  { label: "UA",    href: "https://www.uantof.cl", logo: asset("/images/logos/ua-logo-new.webp"),         h: 36, filter: "brightness(0)" },
  { label: "UOH",  href: "https://www.uoh.cl",    logo: asset("/images/logos/uoh-horizontal-negro.svg"), h: 26, filter: "brightness(0)" },
  { label: "USACH",href: "https://www.usach.cl",  logo: asset("/images/logos/usach-logo-black.webp"),     h: 32, filter: "brightness(0)" },
  { label: "UFRO", href: "https://www.ufro.cl",   logo: asset("/images/logos/ufro-logo-blanco.webp"),     h: 32, filter: "brightness(0)" },
  { label: "UMAG", href: "https://www.umag.cl",   logo: asset("/images/logos/mag-logo.webp"),             h: 54, filter: "none" },
];

export default function Footer({ dict, lang }: { dict: Dict; lang: Lang }) {
  const t = dict.footer;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-32 pb-12 px-6 border-t border-border"
    >
      <div className="max-w-5xl mx-auto pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-1">
          <span className="font-serif text-xl text-foreground">NEXER</span>
          <span className="text-xs text-muted">{t.tagline}</span>
        </div>

        {/* Institution links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {INSTITUTION_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-muted hover:text-foreground transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Instagram + lang switcher */}
        <div className="flex flex-col items-end gap-3">
          <a
            href="https://www.instagram.com/nexerchile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-foreground transition-colors duration-150"
          >
            Instagram · @nexerchile
          </a>
          <LangSwitcher lang={lang} />
        </div>
      </div>

      {/* University logos strip */}
      <div className="max-w-5xl mx-auto mt-12 pt-10 border-t border-border">
        <div className="flex flex-wrap items-end justify-center gap-10 sm:gap-14">
          {UNIVERSITY_LOGOS.map((u) => (
            <a
              key={u.label}
              href={u.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 opacity-50 hover:opacity-80 transition-opacity duration-200"
            >
              {u.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={u.logo}
                  alt={u.label}
                  style={{
                    height: `${u.h}px`,
                    width: "auto",
                    filter: u.filter,
                  }}
                  draggable={false}
                />
              ) : (
                <span className="font-serif text-xl text-foreground">{u.label}</span>
              )}
              <span className="text-[10px] tracking-[0.18em] uppercase text-muted font-medium">
                {u.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="max-w-5xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {t.rights}
        </p>
        <div className="flex items-center gap-4">
          <p className="text-xs text-muted">{t.contact}</p>
          <a
            href={`${asset("")}/admin/`}
            className="text-xs text-muted/70 hover:text-foreground transition-colors underline underline-offset-2"
          >
            {t.admin}
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
