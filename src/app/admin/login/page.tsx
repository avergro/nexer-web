"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error de autenticación");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-neutral-900 mb-2">NEXER Admin</h1>
          <p className="text-sm text-neutral-500">Ingresa para gestionar el sitio</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              autoFocus
              placeholder="admin@nexer.cl"
              className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
              placeholder="••••••••"
              className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
