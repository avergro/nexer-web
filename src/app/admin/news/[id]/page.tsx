import { redirect, notFound } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { getAdminByEmail } from "@/lib/db-admins";
import { getNewsById } from "@/lib/db-news";
import AdminNav from "@/components/admin/AdminNav";
import NewsEditor from "@/components/admin/NewsEditor";

type Props = { params: Promise<{ id: string }> };

export default async function EditNewsPage({ params }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  const payload = await verifyAdminToken(token);
  if (!payload) redirect("/admin/login");

  const admin = getAdminByEmail(payload.email);
  if (!admin) redirect("/admin/login");

  const { id } = await params;
  const news = getNewsById(Number(id));
  if (!news) notFound();

  return (
    <>
      <AdminNav adminName={admin.name} />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <a
            href="/admin/news"
            className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            ← Noticias
          </a>
          <h1 className="font-serif text-3xl text-neutral-900 mt-3">Editar noticia</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Actualizado: {new Date(news.updated_at).toLocaleString("es-CL")}
          </p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-8">
          <NewsEditor
            mode="edit"
            initialData={{
              id: news.id,
              title: news.title,
              date: news.date,
              zone: news.zone,
              category: news.category ?? undefined,
              author: news.author ?? undefined,
              excerpt: news.excerpt ?? undefined,
              content: news.content,
              image: news.image ?? undefined,
              status: news.status,
            }}
          />
        </div>
      </main>
    </>
  );
}
