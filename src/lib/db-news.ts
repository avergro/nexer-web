import db from './db';

export interface DbNews {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  date: string;
  author: string | null;
  image: string | null;
  zone: string;
  category: string | null;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface CreateNewsInput {
  slug?: string;
  title: string;
  content?: string;
  excerpt?: string;
  date: string;
  author?: string;
  image?: string;
  zone: string;
  category?: string;
  status?: 'draft' | 'published';
}

export interface UpdateNewsInput {
  slug?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  date?: string;
  author?: string;
  image?: string;
  zone?: string;
  category?: string;
  status?: 'draft' | 'published';
}

export function slugify(title: string, date: string): string {
  const normalized = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove diacritics
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `${date}-${normalized}`;
}

export function ensureUniqueSlug(base: string): string {
  const exists = db.prepare('SELECT id FROM news WHERE slug = ?').get(base);
  if (!exists) return base;

  let counter = 2;
  while (true) {
    const candidate = `${base}-${counter}`;
    const taken = db.prepare('SELECT id FROM news WHERE slug = ?').get(candidate);
    if (!taken) return candidate;
    counter++;
  }
}

export function getAllNews(): DbNews[] {
  return db
    .prepare('SELECT * FROM news ORDER BY date DESC')
    .all() as DbNews[];
}

export function getPublishedNews(): DbNews[] {
  return db
    .prepare("SELECT * FROM news WHERE status = 'published' ORDER BY date DESC")
    .all() as DbNews[];
}

export function getNewsById(id: number): DbNews | undefined {
  return db
    .prepare('SELECT * FROM news WHERE id = ?')
    .get(id) as DbNews | undefined;
}

export function getNewsBySlug(slug: string): DbNews | undefined {
  return db
    .prepare('SELECT * FROM news WHERE slug = ?')
    .get(slug) as DbNews | undefined;
}

export function createNews(data: CreateNewsInput): DbNews {
  const baseSlug = data.slug ?? slugify(data.title, data.date);
  const slug = ensureUniqueSlug(baseSlug);

  const stmt = db.prepare(`
    INSERT INTO news (slug, title, content, excerpt, date, author, image, zone, category, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    slug,
    data.title,
    data.content ?? '',
    data.excerpt ?? null,
    data.date,
    data.author ?? null,
    data.image ?? null,
    data.zone,
    data.category ?? null,
    data.status ?? 'draft',
  );

  return getNewsById(result.lastInsertRowid as number)!;
}

export function updateNews(id: number, data: UpdateNewsInput): DbNews {
  const current = getNewsById(id);
  if (!current) throw new Error(`News with id ${id} not found`);

  const updated = {
    slug: data.slug !== undefined ? data.slug : current.slug,
    title: data.title !== undefined ? data.title : current.title,
    content: data.content !== undefined ? data.content : current.content,
    excerpt: data.excerpt !== undefined ? data.excerpt : current.excerpt,
    date: data.date !== undefined ? data.date : current.date,
    author: data.author !== undefined ? data.author : current.author,
    image: data.image !== undefined ? data.image : current.image,
    zone: data.zone !== undefined ? data.zone : current.zone,
    category: data.category !== undefined ? data.category : current.category,
    status: data.status !== undefined ? data.status : current.status,
  };

  db.prepare(`
    UPDATE news
    SET slug = ?, title = ?, content = ?, excerpt = ?, date = ?, author = ?, image = ?,
        zone = ?, category = ?, status = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(
    updated.slug,
    updated.title,
    updated.content,
    updated.excerpt,
    updated.date,
    updated.author,
    updated.image,
    updated.zone,
    updated.category,
    updated.status,
    id,
  );

  return getNewsById(id)!;
}

export function deleteNews(id: number): void {
  db.prepare('DELETE FROM news WHERE id = ?').run(id);
}
