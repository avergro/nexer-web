# NEXER — Notas de infraestructura y dominio

## Sitio (GitHub Pages)

- **URL:** https://avergro.github.io/nexer-web/
- **Repo:** https://github.com/avergro/nexer-web (público)
- **Deploy:** GitHub Actions (`.github/workflows/deploy.yml`) compila y publica en cada push a `main`.
- **basePath:** `/nexer-web` (por estar bajo subruta). Al usar dominio propio pasa a vacío.
- **Admin CMS:** https://avergro.github.io/nexer-web/admin/ (Decap CMS, login con GitHub).
- **Contenido:** noticias en `content/news/*.md` (frontmatter + markdown).

## Autenticación (Decap CMS)

- **OAuth provider:** Cloudflare Worker `nexer-oauth.avergro.workers.dev` (código en `oauth-provider/`).
- **OAuth App (GitHub):** "NEXER CMS" — Client ID `Ov23linYHErvEpcrPTi2`, redirect URI `https://nexer-oauth.avergro.workers.dev/callback`.
- **Alcance:** `public_repo` (solo repos públicos).
- **Orígenes permitidos (worker `ORIGINS`):** `avergro.github.io,nexer.cl,www.nexer.cl`.
- **Secretos:** `OAUTH_CLIENT_SECRET` en el worker (vía `npx wrangler secret put OAUTH_CLIENT_SECRET`).
- Solo quienes tengan push al repo pueden editar (hoy: avergro). Para otros, agregarlos como colaboradores.

## Dominio nexer.cl

- **Registrar:** NIC Chile (https://www.nic.cl).
- **Titular:** Francisco Javier Morales Muñoz (¡no es el usuario!).
- **DNS:** `dnsmisitio.net` (panel "Mi Sitio" de NIC Chile).
- **Vencimiento:** 2028-03-07.
- Hoy apunta a un WordPress (el sitio anterior). Migrar a GitHub Pages reemplaza ese WordPress.

### Pasos para apuntar nexer.cl a GitHub Pages

1. **DNS (NIC Chile "Mi Sitio"):**
   - Apex (`@`): registros A → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `www`: CNAME → `avergro.github.io`.
2. **GitHub:** Settings → Pages → Custom domain → `nexer.cl`.
3. **Código (después de 1 y 2):** quitar `NEXT_PUBLIC_BASE_PATH=/nexer-web` en `deploy.yml`; cambiar `preview_path` en `public/admin/config.yml` a `/es/noticias/{{slug}}`.

## Auditoría de contenido vs nexer.cl (oct 2026)

Estado de migración del contenido del WordPress anterior. **Decisión: NO migrar lo que falta** (por ahora).

**Ya migrado:**
- Noticias: 20 (incluidas 7 de 2020 bajadas de nexer.cl).
- Investigadores: 67 + Comité Directivo (más que los 54 de nexer.cl).
- Proyectos oficiales: 4.
- Agenda: vacía en nexer.cl también.

**Falta (se decidió no migrar):**
- **Miembros por categoría** (~28): Postgrado/Pregrado (11), Técnicos (3), Colaboradores Nacionales (3), Colaboradores Internacionales (11). Nuestro `members.ts` define las categorías pero no tiene datos.
- **Proyectos asociados**: nexer.cl tiene ~40 (2017–2020, por año/universidad: FONDECYT, INACH, FONTAGRO, ECOS/ANID…). Nosotros solo 2.
- **Publicaciones**: ~70 vs "+90" que presume NEXER (no se pudo comparar del todo; servidor bloqueó).

Si se retoma, las fuentes están en: investigadores-y-post-doc, estudiantes-de-doctorado-y-tecnicos, technicians, colaboradores-nacionales, colaboradores-internacionales y nexer-associated-research-projects-2 en nexer.cl.

