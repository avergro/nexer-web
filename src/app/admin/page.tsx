import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { countAdmins } from "@/lib/db-admins";

export default async function AdminRoot() {
  const adminCount = countAdmins();
  if (adminCount === 0) {
    redirect("/admin/setup");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token) {
    const payload = await verifyAdminToken(token);
    if (payload) redirect("/admin/dashboard");
  }

  redirect("/admin/login");
}
