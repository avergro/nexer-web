import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { getAdminByEmail } from "@/lib/db-admins";
import AdminNav from "@/components/admin/AdminNav";
import NewsEditor from "@/components/admin/NewsEditor";

export default async function NewNewsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  const payload = await verifyAdminToken(token);
  if (!payload) redirect("/admin/login");

  const admin = getAdminByEmail(payload.email);
  if (!admin) redirect("/admin/login");

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
          <h1 className="font-serif text-3xl text-neutral-900 mt-3">Nueva noticia</h1>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-8">
          <NewsEditor mode="create" />
        </div>
      </main>
    </>
  );
}
