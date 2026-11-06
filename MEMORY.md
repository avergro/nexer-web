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
- `29b6d5c`…`bc2228b` (2026-11-06) — Comité Científico dentro de Acerca de, logos oficiales a color, formulario Únete ampliado (ORCID, género, área temática, colaboradores/as), footer ordenado de norte a sur. Detalle en el log.
- `d1a63d3` — Auditoría de contenido vs nexer.cl → **decidido NO migrar** lo que falta (miembros por categoría, proyectos asociados ~40, publicaciones ~70).
- `7204019` — Mapa arreglado: se quitaron APIs frágiles (`getScreenCTM` / `getTotalLength`) que rompían la página.
- `43c6c05` — Se eliminó el switch de idioma duplicado (queda el de la esquina del Hero, en blanco).
- Serie de commits sobre `ChileMap.tsx`: hover por proximidad, halo, draw-in del contorno, pulso radar, spring, tilt 3D.
- Galería de diseños alternativos en `public/designs/` (propuestas: Vast, Estación de Campo, Extremo Inmersivo, Mineral, Aurora→"Optimizada", Expedición, Editorial).

**Pendientes conocidos:**
- Migrar dominio `nexer.cl` a GitHub Pages (pasos exactos en `NOTAS-INFRA.md`; titular del dominio es Francisco Javier Morales Muñoz, NO el usuario).
- Migrar contenido faltante si se decide retomar (fuentes listadas en `NOTAS-INFRA.md`).
- Formulario Únete: `RECIPIENTS` del Apps Script sigue siendo solo `vergara.alexander@gmail.com` (pruebas). Cambiar a coordinación cuando se decida.
- Borrar las 2 filas de prueba ("PRUEBA Claude (borrar)", "PRUEBA 2…") de la hoja "Solicitudes NEXER".
- Pedido sin resolver: "cambiar la red de colores para que se parezca a la versión previa al skill martin-rosvall". Probablemente se refiere a la figura de red del informe NEXER 2030 (`../../INFORME_NEXER/`, la versión `_rosvall` dejó la red en gris), no a la web. Falta confirmar con el usuario.

---

## Log de sesiones

### 2026-11-06 — Comité Científico, logos oficiales y nuevo formulario Únete
- "Comité Directivo" pasa a ser **Comité Científico** (los mismos 9 nombres del informe NEXER 2030). Ahora vive **dentro de** `/nosotros` (ancla `#comite-cientifico`). Se eliminó la página `/nosotros/comite` y su link del menú. En `members.ts` la categoría `board` pasó a llamarse `committee`.
- Menú "Acerca de" en este orden: Acerca de NEXER → Misión y Objetivos → Miembros → Únete.
- "Colaboradores" → "Colaboradores(as)".
- Logos de "Acerca de": ahora son los **oficiales a color** de las 5 universidades, ordenados de norte a sur (UA, USACH, UOH, UFRO, UMAG). Se quitó BIOREN. Datos en `src/lib/network.ts`. Logos: `public/images/logos/{ua,ufro,umag}-original.webp`, `usach-escudo.svg`, `uoh-horizontal-original.svg`.
- Formulario Únete: dropdown con las 5 universidades + "Otra institución (colaborador/a)". Los miembros de la red eligen categoría y **área temática** (las 5 áreas del informe NEXER 2030). Los colaboradores indican su institución y si son nacionales o internacionales. **ORCID obligatorio** (se valida el dígito verificador), **género** (Femenino / Masculino / Prefiero no declarar) y "Proyectos de investigación" opcional.
- `scripts/join-form/Code.gs` actualizado: agrega 6 columnas **al final** de la hoja. Ya redesplegado (06-nov) y probado: los campos nuevos llegan a la hoja y al correo. ⚠️ Ojo: en *Manage deployments* hay 2 implementaciones activas. La que usa la web es **"Untitled"** (URL terminada en `...4I9A0g/exec`). "nexer Form" no se usa. Al redesplegar, editar siempre "Untitled" → New version.
- Footer (logos grises + links de texto): orden **UA → USACH → UOH → UFRO → UMAG** (norte a sur), igual que en Acerca de.
- Formulario Únete: en **español** la categoría es **"Profesional"** (antes "Técnico(a)"); en **inglés se mantiene "Technician"** (el usuario lo pidió así). El filtro "Técnicos" de la página Miembros no se tocó.
- GitHub Pages a veces deja el deploy en `deployment_queued` hasta que se agota el tiempo ("Deployment failed, try again later"), aunque el build esté bien. Se arregla con `gh run rerun <id>` tras esperar unos ~10 min. El sitio se verifica con el header `last-modified`.

### 2026-10-11 — Formulario "Únete a NEXER" operativo
- El formulario `Únete` ahora envía a un **Google Apps Script** (antes FormSubmit, abandonado por su pantalla de activación que daba error 500).
- El script guarda cada solicitud en la Google Sheet "Solicitudes NEXER" (`SHEET_ID=1ld5wHGSAiF8_NT-nc40wiJIRPfVgaee_woRKb9YzF20`) y envía el correo a `RECIPIENTS` desde una **cuenta de Gmail dedicada** (no expone el Gmail personal): **`solicitudes.nexer@gmail.com`** (dueña del Apps Script; hay que entrar con ella para editar o redesplegar).
- **Para cambiar el email destino:** editar `RECIPIENTS` en el script (cuenta dedicada) y hacer *Deploy → Manage deployments → Edit → New version → Deploy*. La URL no cambia. Procedimiento completo en `scripts/join-form/README.md`.
- Mensaje de éxito del formulario acortado a "Solicitud enviada." y se eliminó la caja "Categorías disponibles".
- `src/lib/join.ts` solo exporta `endpoint` (la URL `/exec` del web app).

### 2026-10-09 — Sistema de memoria + mapa del prototipo "Extremo Inmersivo"
- Se creó el sistema de memoria: `CLAUDE.md` (contexto estable, auto-cargado por Claude Code) + `MEMORY.md` (memoria de trabajo) + puntero en `AGENTS.md`.
- Se portó la interactividad del mapa actual (`src/components/InteractiveMap.tsx`) al prototipo **Extremo Inmersivo** (`public/designs/vast/index.html`): hover por proximidad, halo, pulso, tilt 3D y entrada rotada (en JS/CSS vanilla, sin React).
- **Quedó pendiente:** commit + push para publicar el mapa actualizado en GitHub Pages.

