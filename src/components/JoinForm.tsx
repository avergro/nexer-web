"use client";

import { useState } from "react";
import { JOIN_CONFIG } from "@/lib/join";
import { UNIVERSITIES, THEMATIC_AREAS, isValidOrcid, normalizeOrcid } from "@/lib/network";
import type { Dict, Lang } from "@/i18n/dictionaries";

type JoinUsDict = Dict["joinUs"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTHER = "__other__";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  university: "", // id de UNIVERSITIES o OTHER
  otherInstitution: "",
  collabType: "",
  category: "",
  area: "",
  orcid: "",
  gender: "",
  researchLine: "",
  keywords: "",
  projects: "",
  bio: "",
};

type Field = keyof typeof EMPTY;

function Label({ htmlFor, children, req }: { htmlFor: string; children: React.ReactNode; req?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">
      {children}
      {req && <span className="text-red-600" aria-hidden="true"> *</span>}
    </label>
  );
}

export default function JoinForm({ t, lang }: { t: JoinUsDict; lang: Lang }) {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "missing" | "orcid">("idle");
  const [honey, setHoney] = useState("");

  const isCollaborator = values.university === OTHER;
  const isNetworkMember = values.university !== "" && !isCollaborator;
  const areas = THEMATIC_AREAS[lang];

  function update(field: Field, val: string) {
    setValues((v) => ({ ...v, [field]: val }));
    if (status !== "sending") setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honey) return; // honeypot llenado por un bot: se ignora silenciosamente

    const required: Field[] = ["name", "email", "university", "orcid", "gender"];
    if (isNetworkMember) required.push("category", "area");
    if (isCollaborator) required.push("otherInstitution", "collabType");

    if (required.some((f) => !values[f].trim()) || !EMAIL_RE.test(values.email.trim())) {
      setStatus("missing");
      return;
    }
    if (!isValidOrcid(values.orcid)) {
      setStatus("orcid");
      return;
    }

    const uni = UNIVERSITIES.find((u) => u.id === values.university);

    setStatus("sending");
    try {
      const res = await fetch(JOIN_CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          membership: isCollaborator ? "Colaborador(a)" : "Miembro universidad de la red",
          institution: uni ? uni.name : values.otherInstitution,
          category: isCollaborator ? values.collabType : values.category,
          area: isNetworkMember ? values.area : "",
          orcid: normalizeOrcid(values.orcid),
          gender: values.gender,
          researchLine: values.researchLine,
          keywords: values.keywords,
          projects: values.projects,
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
  const hintCls = "text-xs text-muted mt-1.5";

  const textInput = (field: Field, type = "text", req = false, extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      id={field}
      name={field}
      type={type}
      required={req}
      value={values[field]}
      onChange={(e) => update(field, e.target.value)}
      className={inputCls}
      {...extra}
    />
  );

  const select = (field: Field, options: string[], placeholder: string, req = false) => (
    <select
      id={field}
      name={field}
      required={req}
      value={values[field]}
      onChange={(e) => update(field, e.target.value)}
      className={inputCls}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

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

      <p className="text-xs text-muted">{t.requiredNote}</p>

      <div>
        <Label htmlFor="name" req>{t.nameLabel}</Label>
        {textInput("name", "text", true, { autoComplete: "name" })}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="email" req>{t.emailLabel}</Label>
          {textInput("email", "email", true, { autoComplete: "email" })}
        </div>
        <div>
          <Label htmlFor="phone">{t.phoneLabel}</Label>
          {textInput("phone", "tel", false, { autoComplete: "tel" })}
        </div>
      </div>

      <div>
        <Label htmlFor="university" req>{t.institutionLabel}</Label>
        <select
          id="university"
          name="university"
          required
          value={values.university}
          onChange={(e) => update("university", e.target.value)}
          className={inputCls}
        >
          <option value="">{t.institutionPlaceholder}</option>
          {UNIVERSITIES.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
          <option value={OTHER}>{t.otherInstitutionOption}</option>
        </select>
      </div>

      {isNetworkMember && (
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="category" req>{t.categoryLabel}</Label>
            {select("category", t.categoryOptions, t.selectPlaceholder, true)}
          </div>
          <div>
            <Label htmlFor="area" req>{t.areaLabel}</Label>
            {select("area", areas, t.areaPlaceholder, true)}
          </div>
        </div>
      )}

      {isCollaborator && (
        <div className="space-y-5 border-l-2 border-border pl-4">
          <p className="text-sm text-muted">{t.collaboratorNote}</p>
          <div>
            <Label htmlFor="otherInstitution" req>{t.otherInstitutionLabel}</Label>
            {textInput("otherInstitution", "text", true, { autoComplete: "organization" })}
          </div>
          <div>
            <Label htmlFor="collabType" req>{t.collabTypeLabel}</Label>
            {select("collabType", t.collabTypeOptions, t.selectPlaceholder, true)}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="orcid" req>{t.orcidLabel}</Label>
          {textInput("orcid", "text", true, {
            placeholder: "0000-0000-0000-0000",
            inputMode: "text",
            autoComplete: "off",
            spellCheck: false,
            "aria-describedby": "orcid-hint",
          })}
          <p id="orcid-hint" className={hintCls}>
            {t.orcidHint}
          </p>
        </div>
        <div>
          <Label htmlFor="gender" req>{t.genderLabel}</Label>
          {select("gender", t.genderOptions, t.selectPlaceholder, true)}
        </div>
      </div>

      <div>
        <Label htmlFor="researchLine">{t.researchLineLabel}</Label>
        {textInput("researchLine")}
      </div>

      <div>
        <Label htmlFor="keywords">{t.keywordsLabel}</Label>
        {textInput("keywords")}
      </div>

      <div>
        <Label htmlFor="projects">{t.projectsLabel}</Label>
        <textarea
          id="projects"
          name="projects"
          rows={4}
          value={values.projects}
          onChange={(e) => update("projects", e.target.value)}
          aria-describedby="projects-hint"
          className={`${inputCls} resize-none`}
        />
        <p id="projects-hint" className={hintCls}>
          {t.projectsHint}
        </p>
      </div>

      <div>
        <Label htmlFor="bio">{t.bioLabel}</Label>
        <textarea
          id="bio"
          name="bio"
          rows={5}
          value={values.bio}
          onChange={(e) => update("bio", e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </div>

      <div aria-live="polite">
        {status === "missing" && <p className="text-sm text-red-600">{t.missingMessage}</p>}
        {status === "orcid" && <p className="text-sm text-red-600">{t.orcidError}</p>}
        {status === "error" && <p className="text-sm text-red-600">{t.errorMessage}</p>}
        {status === "success" && <p className="text-sm text-green-700">{t.successMessage}</p>}
      </div>

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
