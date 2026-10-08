"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface NewsFormData {
  title: string;
  date: string;
  zone: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  status: "draft" | "published";
}

interface Props {
  initialData?: Partial<NewsFormData> & { id?: number };
  mode: "create" | "edit";
}

const ZONES = [
  { value: "general", label: "General" },
  { value: "norte", label: "Norte · UA" },
  { value: "usach", label: "Metropolitana · USACH" },
  { value: "ohiggins", label: "O'Higgins · UOH" },
  { value: "centro", label: "Centro · UFRO" },
  { value: "sur", label: "Sur · UMAG" },
];

const CATEGORIES = ["investigación", "difusión", "formación", "evento", "institucional"];

export default function NewsEditor({ initialData, mode }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<NewsFormData>({
    title: initialData?.title ?? "",
    date: initialData?.date ?? new Date().toISOString().split("T")[0],
    zone: initialData?.zone ?? "general",
    category: initialData?.category ?? "investigación",
    author: initialData?.author ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    image: initialData?.image ?? "",
    status: initialData?.status ?? "draft",
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof NewsFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      update("image", data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(status: "draft" | "published") {
    setSaving(true);
    setError("");

    try {
      const payload = { ...form, status };
      const url =
        mode === "edit" && initialData?.id
          ? `/api/admin/news/${initialData.id}`
          : "/api/admin/news";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-2">
          Título *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Título del artículo"
          className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-lg font-serif text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        />
      </div>

      {/* Meta row */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-2">
            Fecha *
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-2">
            Nodo *
          </label>
          <select
            value={form.zone}
            onChange={(e) => update("zone", e.target.value)}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300 bg-white"
          >
            {ZONES.map((z) => (
              <option key={z.value} value={z.value}>
                {z.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-2">
            Categoría
          </label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300 bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-2">
            Autor
          </label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => update("author", e.target.value)}
            placeholder="Dr. Nombre · Institución"
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-2">
          Extracto
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          placeholder="Descripción breve para la lista de noticias (1-2 oraciones)..."
          rows={2}
          className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-300 resize-none"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-2">
          Imagen de portada
        </label>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              placeholder="/images/news/nombre-imagen.jpg"
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
            <p className="text-xs text-neutral-400 mt-1">URL relativa o sube un archivo</p>
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 transition-colors"
            >
              {uploading ? "Subiendo…" : "Subir imagen"}
            </button>
          </div>
        </div>
        {form.image && (
          <div className="mt-3 relative w-full max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.image}
              alt="Preview"
              className="rounded-lg border border-neutral-200 max-h-40 object-cover w-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide mb-2">
          Contenido (Markdown)
        </label>
        <textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          placeholder="Escribe el contenido del artículo en Markdown...&#10;&#10;## Subtítulo&#10;&#10;Párrafo de texto..."
          rows={18}
          className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm font-mono text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-300 resize-y leading-relaxed"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <button
          type="button"
          onClick={() => router.push("/admin/news")}
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Cancelar
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={saving || !form.title}
            className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 transition-colors"
          >
            Guardar borrador
          </button>
          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={saving || !form.title || !form.date || !form.zone}
            className="px-5 py-2.5 bg-neutral-900 rounded-lg text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-40 transition-colors"
          >
            {saving ? "Guardando…" : "Publicar"}
          </button>
        </div>
      </div>
    </div>
  );
}
