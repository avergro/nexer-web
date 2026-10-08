import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { getAdminByEmail } from "@/lib/db-admins";
import { getAllNews } from "@/lib/db-news";
import AdminNav from "@/components/admin/AdminNav";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/admin/login");
  const payload = await verifyAdminToken(token);
  if (!payload) redirect("/admin/login");

  const admin = getAdminByEmail(payload.email);
  if (!admin) redirect("/admin/login");

  const news = getAllNews();
  const published = news.filter((n) => n.status === "published").length;
  const drafts = news.filter((n) => n.status === "draft").length;

  return (
    <>
      <AdminNav adminName={admin.name} />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-3xl text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Bienvenido, {admin.name}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium mb-2">
              Total noticias
            </p>
            <p className="font-serif text-4xl text-neutral-900">{news.length}</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium mb-2">
              Publicadas
            </p>
            <p className="font-serif text-4xl text-green-700">{published}</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium mb-2">
              Borradores
            </p>
            <p className="font-serif text-4xl text-neutral-400">{drafts}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-neutral-900">Noticias recientes</h2>
          <a
            href="/admin/news/new"
            className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors"
          >
            + Nueva noticia
          </a>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          {news.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-neutral-400 text-sm">No hay noticias aún.</p>
              <a
                href="/admin/news/new"
                className="inline-block mt-4 text-sm text-neutral-900 underline underline-offset-2"
              >
                Crea la primera noticia
              </a>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    Título
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide hidden sm:table-cell">
                    Fecha
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide hidden md:table-cell">
                    Nodo
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    Estado
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {news.slice(0, 10).map((item) => (
                  <tr key={item.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-neutral-800 max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="px-4 py-4 text-neutral-500 hidden sm:table-cell">{item.date}</td>
                    <td className="px-4 py-4 text-neutral-500 capitalize hidden md:table-cell">
                      {item.zone}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          item.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {item.status === "published" ? "Publicada" : "Borrador"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`/admin/news/${item.id}`}
                        className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-2 transition-colors"
                      >
                        Editar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {news.length > 10 && (
          <div className="mt-4 text-right">
            <a
              href="/admin/news"
              className="text-sm text-neutral-500 hover:text-neutral-900 underline underline-offset-2"
            >
              Ver todas las noticias →
            </a>
          </div>
        )}
      </main>
    </>
  );
}
