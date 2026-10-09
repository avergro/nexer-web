"use client";

import { asset } from "@/lib/assets";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Dict, Lang } from "@/i18n/dictionaries";
import LangSwitcher from "./LangSwitcher";

interface NavbarProps {
  dict: Dict;
  lang: Lang;
}

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

function DropdownMenu({ items, isOpen }: { items: DropdownItem[]; isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 mt-1 min-w-[200px] bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-foreground hover:bg-background transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavItemDesktop({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (item.dropdown) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors duration-150 py-1"
        >
          {item.label}
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <DropdownMenu items={item.dropdown} isOpen={open} />
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      className="text-sm text-muted hover:text-foreground transition-colors duration-150 py-1"
    >
      {item.label}
    </Link>
  );
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const t = dict.nav;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: t.home, href: `/${lang}` },
    {
      label: t.about,
      dropdown: [
        { label: t.aboutNexer, href: `/${lang}/nosotros` },
        { label: t.board, href: `/${lang}/nosotros/comite` },
        { label: t.members, href: `/${lang}/nosotros/miembros` },
        { label: t.mision, href: `/${lang}/nosotros/mision` },
        { label: t.joinUs, href: `/${lang}/nosotros/unete` },
      ],
    },
    {
      label: t.research,
      dropdown: [
        { label: t.projects, href: `/${lang}/investigacion/proyectos` },
        { label: t.publications, href: `/${lang}/investigacion/publicaciones` },
      ],
    },
    { label: t.news, href: `/${lang}/noticias` },
    { label: t.training, href: `/${lang}/formacion` },
    { label: t.outreach, href: `/${lang}/difusion` },
    { label: t.gallery, href: `/${lang}/galeria` },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-40 h-14 flex items-center px-6 bg-background border-b border-border"
        style={{ backgroundColor: "#f9f7f2" }}
      >
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="shrink-0 hover:opacity-80 transition-opacity flex items-center"
            aria-label="NEXER inicio"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/logos/nexer-logo.jpg")}
              alt="Red NEXER"
              style={{ height: "32px", width: "auto", mixBlendMode: "multiply" }}
              draggable={false}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item) => (
              <NavItemDesktop key={item.label} item={item} />
            ))}
          </nav>

          {/* Right: hamburger (lang switcher vive en el Hero / Footer) */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-muted hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ backgroundColor: "#f9f7f2" }}
          >
            {/* Mobile header */}
            <div className="h-14 flex items-center justify-between px-6 border-b border-border">
              <Link
                href={`/${lang}`}
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/images/logos/nexer-logo.jpg")}
                  alt="Red NEXER"
                  style={{ height: "30px", width: "auto", mixBlendMode: "multiply" }}
                  draggable={false}
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-muted hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2">
              <Link
                href={`/${lang}`}
                className="text-lg text-foreground py-3 border-b border-border"
                onClick={() => setMobileOpen(false)}
              >
                {t.home}
              </Link>

              {/* About dropdown */}
              <div className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between text-lg text-foreground py-3"
                  onClick={() => setMobileAboutOpen((v) => !v)}
                >
                  {t.about}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4 pb-2 flex flex-col gap-1"
                    >
                      {[
                        { label: t.aboutNexer, href: `/${lang}/nosotros` },
                        { label: t.board, href: `/${lang}/nosotros/comite` },
                        { label: t.members, href: `/${lang}/nosotros/miembros` },
                        { label: t.mision, href: `/${lang}/nosotros/mision` },
                        { label: t.joinUs, href: `/${lang}/nosotros/unete` },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-base text-muted hover:text-foreground py-2"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Research dropdown */}
              <div className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between text-lg text-foreground py-3"
                  onClick={() => setMobileResearchOpen((v) => !v)}
                >
                  {t.research}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileResearchOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileResearchOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4 pb-2 flex flex-col gap-1"
                    >
                      {[
                        { label: t.projects, href: `/${lang}/investigacion/proyectos` },
                        { label: t.publications, href: `/${lang}/investigacion/publicaciones` },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-base text-muted hover:text-foreground py-2"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[
                { label: t.news, href: `/${lang}/noticias` },
                { label: t.training, href: `/${lang}/formacion` },
                { label: t.outreach, href: `/${lang}/difusion` },
                { label: t.gallery, href: `/${lang}/galeria` },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg text-foreground py-3 border-b border-border"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-6">
                <LangSwitcher lang={lang} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
