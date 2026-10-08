import bcrypt from 'bcryptjs';
import db from './db';

export interface DbAdmin {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
}

export function countAdmins(): number {
  const row = db.prepare('SELECT COUNT(*) as count FROM admins').get() as { count: number };
  return row.count;
}

export function getAdminByEmail(email: string): DbAdmin | undefined {
  return db
    .prepare('SELECT * FROM admins WHERE email = ?')
    .get(email) as DbAdmin | undefined;
}

export function createAdmin(email: string, password: string, name: string): DbAdmin {
  const password_hash = bcrypt.hashSync(password, 12);

  const result = db
    .prepare('INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)')
    .run(email, password_hash, name);

  return db
    .prepare('SELECT * FROM admins WHERE id = ?')
    .get(result.lastInsertRowid) as DbAdmin;
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
