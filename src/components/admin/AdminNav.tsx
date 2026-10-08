"use client";

import { useRouter, usePathname } from "next/navigation";

export default function AdminNav({ adminName }: { adminName: string }) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/news", label: "Noticias" },
  ];

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-serif text-lg text-neutral-900">NEXER Admin</span>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname.startsWith(item.href)
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-400">{adminName}</span>
          <button
            onClick={logout}
            className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
