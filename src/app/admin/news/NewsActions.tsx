"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewsActions({ id }: { id: number }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("¿Eliminar esta noticia? Esta acción no se puede deshacer.")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-3 justify-end">
      <a
        href={`/admin/news/${id}`}
        className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-2 transition-colors"
      >
        Editar
      </a>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-xs text-red-400 hover:text-red-600 disabled:opacity-40 transition-colors"
      >
        {deleting ? "…" : "Eliminar"}
      </button>
    </div>
  );
}
