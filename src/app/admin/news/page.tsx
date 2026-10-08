import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { getAdminByEmail } from "@/lib/db-admins";
import { getAllNews } from "@/lib/db-news";
import AdminNav from "@/components/admin/AdminNav";
import NewsActions from "./NewsActions";

export default async function AdminNewsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  const payload = await verifyAdminToken(token);
  if (!payload) redirect("/admin/login");

  const admin = getAdminByEmail(payload.email);
  if (!admin) redirect("/admin/login");

  const news = getAllNews();

  return (
    <>
      <AdminNav adminName={admin.name} />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-neutral-900">Noticias</h1>
            <p className="text-sm text-neutral-500 mt-1">{news.length} artículos en total</p>
          </div>
          <a
            href="/admin/news/new"
            className="px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-700 transition-colors"
          >
            + Nueva noticia
          </a>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          {news.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-neutral-400 text-sm mb-4">No hay noticias creadas aún.</p>
              <a
                href="/admin/news/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors"
              >
                Crear primera noticia
              </a>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    Título
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide hidden sm:table-cell">
                    Fecha
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide hidden lg:table-cell">
                    Nodo
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <a
                        href={`/admin/news/${item.id}`}
                        className="font-medium text-neutral-800 hover:text-neutral-600 transition-colors line-clamp-2"
                      >
                        {item.title}
                      </a>
                      {item.excerpt && (
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{item.excerpt}</p>
                      )}
                    </td>
                    <td className="px-4 py-4 text-neutral-500 hidden sm:table-cell whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-4 py-4 text-neutral-500 capitalize hidden lg:table-cell">
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
                      <NewsActions id={item.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}
