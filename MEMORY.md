# MEMORY.md — Memoria viva del proyecto (se actualiza en cada sesión)

> Este archivo es la **memoria de trabajo**: estado actual, decisiones recientes,
> pendientes y el log de sesiones. Se edita mientras se avanza.
> El contexto estable (stack, arquitectura, comandos, convenciones) vive en `CLAUDE.md`,
> que Claude Code carga automáticamente en cada sesión y que importa este archivo.

---

## Qué es NEXER

Red de investigación chilena sobre **ambientes extremos (poliextremos)**, con cinco nodos
a lo largo de Chile. La web es su sitio público + CMS para noticias.

- **URL producción:** https://avergro.github.io/nexer-web/
- **Repo:** https://github.com/avergro/nexer-web (público, deploy automático a GitHub Pages en cada push a `main`)
- **Admin (CMS):** https://avergro.github.io/nexer-web/admin/ (Decap CMS, login con GitHub)
- **Dominio propio:** `nexer.cl` (aún apunta al WordPress viejo — migración pendiente, ver `NOTAS-INFRA.md`)

---

## Estado actual (última sesión)

**Últimos trabajos completados (commits recientes):**
- `d1a63d3` — Auditoría de contenido vs nexer.cl → **decidido NO migrar** lo que falta (miembros por categoría, proyectos asociados ~40, publicaciones ~70).
- `7204019` — Mapa arreglado: se quitaron APIs frágiles (`getScreenCTM` / `getTotalLength`) que rompían la página.
- `43c6c05` — Se eliminó el switch de idioma duplicado (queda el de la esquina del Hero, en blanco).
- Serie de commits sobre `ChileMap.tsx`: hover por proximidad, halo, draw-in del contorno, pulso radar, spring, tilt 3D.
- Galería de diseños alternativos en `public/designs/` (propuestas: Vast, Estación de Campo, Extremo Inmersivo, Mineral, Aurora→"Optimizada", Expedición, Editorial).

**Pendientes conocidos:**
- Migrar dominio `nexer.cl` a GitHub Pages (pasos exactos en `NOTAS-INFRA.md`; titular del dominio es Francisco Javier Morales Muñoz, NO el usuario).
- Migrar contenido faltante si se decide retomar (fuentes listadas en `NOTAS-INFRA.md`).

---

## Log de sesiones

### 2026-10-09 — Sistema de memoria + mapa del prototipo "Extremo Inmersivo"
- Se creó el sistema de memoria: `CLAUDE.md` (contexto estable, auto-cargado por Claude Code) + `MEMORY.md` (memoria de trabajo) + puntero en `AGENTS.md`.
- Se portó la interactividad del mapa actual (`src/components/InteractiveMap.tsx`) al prototipo **Extremo Inmersivo** (`public/designs/vast/index.html`): hover por proximidad, halo, pulso, tilt 3D y entrada rotada (en JS/CSS vanilla, sin React).
- **Quedó pendiente:** commit + push para publicar el mapa actualizado en GitHub Pages.

