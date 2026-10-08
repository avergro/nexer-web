import { SignJWT, jwtVerify } from 'jose';

function getSecret(): Uint8Array {
  const envSecret = process.env.ADMIN_JWT_SECRET;
  if (envSecret) return new TextEncoder().encode(envSecret);
  return new TextEncoder().encode('nexer-dev-secret-change-in-production');
}

export async function signAdminToken(payload: { id: number; email: string }): Promise<string> {
  return new SignJWT({ id: payload.id, email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecret());
}

export async function verifyAdminToken(token: string): Promise<{ id: number; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.id !== 'number' || typeof payload.email !== 'string') {
      return null;
    }
    return { id: payload.id, email: payload.email };
  } catch {
    return null;
  }
}
