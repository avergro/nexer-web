"use client";

import { useState } from "react";
import { JOIN_CONFIG } from "@/lib/join";
import type { Dict } from "@/i18n/dictionaries";

type JoinUsDict = Dict["joinUs"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  category: "",
  researchLine: "",
  keywords: "",
  bio: "",
};

export default function JoinForm({ t, lang }: { t: JoinUsDict; lang: string }) {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [honey, setHoney] = useState("");

  function update(field: keyof typeof EMPTY, val: string) {
    setValues((v) => ({ ...v, [field]: val }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honey) return; // honeypot llenado por un bot: se ignora silenciosamente

    if (!values.name.trim() || !EMAIL_RE.test(values.email.trim())) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(JOIN_CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: JOIN_CONFIG.subject,
          _template: "table",
          _captcha: "false",
          _honey: honey,
          name: values.name,
          email: values.email,
          phone: values.phone,
          category: values.category,
          researchLine: values.researchLine,
          keywords: values.keywords,
          bio: values.bio,
          lang,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setValues(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-card placeholder:text-muted/60 focus:outline-none focus:border-foreground/40 transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* honeypot anti-bot (oculto) */}
      <input
        type="text"
        name="_honey"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
      />

      <div>
        <label htmlFor="name" className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">
          {t.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">
          {t.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">
          {t.phoneLabel}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">
          {t.categoryLabel}
        </label>
        <select
          id="category"
          name="category"
          value={values.category}
          onChange={(e) => update("category", e.target.value)}
          className={inputCls}
        >
          <option value="">{t.categoryLabel}…</option>
          {t.categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="researchLine" className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">
          {t.researchLineLabel}
        </label>
        <input
          id="researchLine"
          name="researchLine"
          type="text"
          value={values.researchLine}
          onChange={(e) => update("researchLine", e.target.value)}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="keywords" className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">
          {t.keywordsLabel}
        </label>
        <input
          id="keywords"
          name="keywords"
          type="text"
          value={values.keywords}
          onChange={(e) => update("keywords", e.target.value)}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">
          {t.bioLabel}
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={5}
          value={values.bio}
          onChange={(e) => update("bio", e.target.value)}
          className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-card placeholder:text-muted/60 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{t.errorMessage}</p>
      )}

      {status === "success" && (
        <p className="text-sm text-green-700">{t.successMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 rounded-full text-sm font-medium text-card bg-foreground hover:opacity-90 transition-opacity active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t.sendingLabel : t.submitLabel}
      </button>
    </form>
  );
}
