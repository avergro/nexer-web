export const dynamic = "force-static";

import { NextRequest, NextResponse } from "next/server";
import { countAdmins, createAdmin } from "@/lib/db-admins";

export async function GET() {
  const count = countAdmins();
  return NextResponse.json({ needsSetup: count === 0 });
}

export async function POST(req: NextRequest) {
  try {
    const count = countAdmins();
    if (count > 0) {
      return NextResponse.json({ error: "Setup already completed" }, { status: 400 });
    }

    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const admin = createAdmin(email, password, name);
    return NextResponse.json({ ok: true, id: admin.id, email: admin.email });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
