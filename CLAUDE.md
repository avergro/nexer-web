# NEXER Web — Contexto del proyecto

> Claude Code carga este archivo automáticamente en cada sesión.
> `@path` importa contenido inline (memoria de trabajo, reglas, infra).

@MEMORY.md
@AGENTS.md
@NOTAS-INFRA.md

---

## Identidad

Sitio web público + CMS de **NEXER** (Red de Ambientes Extremos, Chile), que reemplaza
el WordPress anterior de nexer.cl.

- **Producción:** https://avergro.github.io/nexer-web/
- **Repo:** https://github.com/avergro/nexer-web (público)
- **Admin CMS:** https://avergro.github.io/nexer-web/admin/ (Decap CMS + login GitHub)
- **Dominio propio:** `nexer.cl` (migración pendiente — ver `NOTAS-INFRA.md`)

## Stack

- **Next.js 16.2.4** (App Router) — ⚠️ versión con breaking changes: leer la guía en
  `node_modules/next/dist/docs/` antes de tocar APIs de Next. (ver `AGENTS.md`)
- **React 19.2.4**, **TypeScript 5**, **Tailwind CSS 4** (`@tailwindcss/postcss`)
- **framer-motion** (animaciones), **lucide-react** (iconos)
- **better-sqlite3** → `data/nexer.db` (datos locales: miembros, noticias)
- **jose** (auth del admin), **gray-matter** + **marked** (contenido markdown de noticias)
- **d3-geo** / **d3-path** (proyección del mapa de Chile)

## Comandos

```bash
npm run dev        # desarrollo local (http://localhost:3000)
npm run build      # build estático (output: export)
npm run lint       # eslint
npm run build:export  # build manual con el truco de mover api/admin
```

## Deploy (GitHub Pages, estático)

- `next.config.ts` → `output: "export"`, `trailingSlash: true`,
  `basePath` = `NEXT_PUBLIC_BASE_PATH` (hoy `/nexer-web`).
- `.github/workflows/deploy.yml`: en cada push a `main` hace **static export**, sube `out/`
  a GitHub Pages. Truco clave: antes de buildear **mueve** `src/app/api` → `src/app/_api`
  y `src/app/admin` → `src/app/_admin` (no son estáticos), y los restaura después.
- Al pasar a `nexer.cl`: quitar `NEXT_PUBLIC_BASE_PATH=/nexer-web` en `deploy.yml` y
  ajustar `preview_path` en `public/admin/config.yml`.

## Arquitectura

```
src/app/page.tsx            → redirige / → /es
src/app/[lang]/             → páginas del sitio (i18n por prefijo es/en)
src/app/admin/              → panel de admin (auth jose + SQLite)
src/app/api/                → rutas API (NO se exportan: se excluyen en el build)
src/middleware.ts           → detección de idioma: / → /es, header x-lang
src/i18n/dictionaries.ts    → textos ES/EN (único archivo de traducciones)
src/components/             → Hero, ChileMap, Navbar, Footer, NewsFeed, MembersGrid, etc.
src/lib/                    → datos: members, projects, publications, zones, news, db, auth
content/news/*.md           → noticias (frontmatter + markdown) editables desde Decap CMS
public/designs/             → galería de diseños alternativos del rediseño
data/nexer.db               → base SQLite local
oauth-provider/             → Cloudflare Worker del OAuth de Decap CMS
```

## Convenciones y gotchas

- **Idioma:** sistema i18n propio con `[lang]` (`es` default, `en`). Textos SOLO en
  `src/i18n/dictionaries.ts`. El switch de idioma visible está en la esquina del Hero (blanco);
  no duplicar.
- **Mapa (`ChileMap.tsx`):** NO usar `getScreenCTM` ni `getTotalLength` — rompían la página
  (ver commit `7204019`). Usar d3-geo/d3-path para el contorno y aproximaciones sin esas APIs.
- **basePath:** al enlazar rutas usar el prefijo `/nexer-web` (o `NEXT_PUBLIC_BASE_PATH`)
  o Next lo rompe en producción.
- **Contenido:** noticias = archivos markdown en `content/news/`; edición vía Decap CMS (`/admin/`).

## Dónde está cada cosa

| Tema | Archivo |
|---|---|
| Memoria de trabajo / estado / pendientes | `MEMORY.md` |
| Infraestructura, dominio nexer.cl, OAuth, auditoría de contenido | `NOTAS-INFRA.md` |
| Reglas específicas de Next.js 16 | `AGENTS.md` |
| Datos de miembros | `src/lib/members.ts` |
| Proyectos / publicaciones | `src/lib/projects.ts`, `src/lib/publications.ts` |
| Noticias (markdown) | `content/news/*.md` |
| Traducciones ES/EN | `src/i18n/dictionaries.ts` |
