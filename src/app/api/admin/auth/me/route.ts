export const dynamic = "force-static";

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { getAdminByEmail } from "@/lib/db-admins";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const payload = await verifyAdminToken(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const admin = getAdminByEmail(payload.email);
  if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });

  return NextResponse.json({ id: admin.id, email: admin.email, name: admin.name });
}
