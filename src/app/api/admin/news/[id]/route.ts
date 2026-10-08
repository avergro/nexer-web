export const dynamic = "force-static";
export function generateStaticParams() { return []; }

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { getNewsById, updateNews, deleteNews } from "@/lib/db-news";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const news = getNewsById(Number(id));
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(news);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const news = getNewsById(Number(id));
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const data = await req.json();
    const updated = updateNews(Number(id), data);
    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const news = getNewsById(Number(id));
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });

  deleteNews(Number(id));
  return NextResponse.json({ ok: true });
}
