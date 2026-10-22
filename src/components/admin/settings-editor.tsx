"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Save,
  Loader2,
  Check,
} from "lucide-react";
import type { LinkValue, SiteSettings } from "@/lib/content/types";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

function Field({
  label,
  help,
  value,
  onChange,
  textarea,
}: {
  label: string;
  help?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-600 text-ink">{label}</label>
      {help && <p className="mb-1.5 -mt-1 text-xs text-slate-400">{help}</p>}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className={`${inputCls} resize-y`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  );
}

export function SettingsEditor({ settings }: { settings: SiteSettings }) {
  const [s, setS] = useState<SiteSettings>(settings);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setSaved(false);
  }

  function setNav(nav: LinkValue[]) {
    set("nav", nav);
  }
  function updateNav(idx: number, key: keyof LinkValue, v: string) {
    setNav(s.nav.map((n, i) => (i === idx ? { ...n, [key]: v } : n)));
  }
  function moveNav(idx: number, dir: -1 | 1) {
    const to = idx + dir;
    if (to < 0 || to >= s.nav.length) return;
    const next = [...s.nav];
    [next[idx], next[to]] = [next[to], next[idx]];
    setNav(next);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      if (res.ok) {
        setDirty(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Could not save");
      }
    } catch {
      setError("Could not save. Check your connection.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-8 pb-32">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-700 text-ink">Site settings</h1>
        <p className="text-sm text-slate-400">
          Settings that apply across every page.
        </p>
      </header>

      <div className="space-y-4">
        <Card title="Contact & WhatsApp">
          <Field
            label="WhatsApp number"
            help="Digits only, with country code — e.g. 254712345678."
            value={s.whatsappNumber}
            onChange={(v) => set("whatsappNumber", v)}
          />
          <Field
            label="Default WhatsApp message"
            help="Pre-filled when a visitor taps a WhatsApp button."
            value={s.whatsappMessage}
            onChange={(v) => set("whatsappMessage", v)}
            textarea
          />
          <Field
            label="WhatsApp catalogue link"
            value={s.whatsappCatalogueUrl}
            onChange={(v) => set("whatsappCatalogueUrl", v)}
          />
          <Field
            label="Flower beds video link"
            value={s.flowerBedsYoutubeUrl}
            onChange={(v) => set("flowerBedsYoutubeUrl", v)}
          />
        </Card>

        <Card title="Footer & social links">
          <Field
            label="Footer description"
            value={s.footerTagline}
            onChange={(v) => set("footerTagline", v)}
            textarea
          />
          <Field label="Location" value={s.location ?? ""} onChange={(v) => set("location", v)} />
          <Field
            label="Phone number"
            help="As it should appear, e.g. +254 712 345 678. Leave blank to hide."
            value={s.phone ?? ""}
            onChange={(v) => set("phone", v)}
          />
          <Field
            label="Email address"
            help="Leave blank to hide."
            value={s.email ?? ""}
            onChange={(v) => set("email", v)}
          />
          {(
            [
              ["instagramUrl", "Instagram link"],
              ["linkedinUrl", "LinkedIn link"],
              ["youtubeUrl", "YouTube link"],
              ["facebookUrl", "Facebook link"],
            ] as const
          ).map(([key, label]) => (
            <Field
              key={key}
              label={label}
              help="Full https:// link. The icon only shows once this is filled in."
              value={s[key] ?? ""}
              onChange={(v) => set(key, v)}
            />
          ))}
        </Card>

        <Card title="Navigation menu">
          <div className="space-y-3">
            {s.nav.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-line bg-surface-tint p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-700 uppercase tracking-wider text-slate-400">
                    Menu item {idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveNav(idx, -1)}
                      disabled={idx === 0}
                      className="rounded p-1 text-slate-400 hover:bg-white hover:text-ink disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveNav(idx, 1)}
                      disabled={idx === s.nav.length - 1}
                      className="rounded p-1 text-slate-400 hover:bg-white hover:text-ink disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNav(s.nav.filter((_, i) => i !== idx))
                      }
                      className="rounded p-1 text-rust-500 hover:bg-rust-50"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    className={inputCls}
                    placeholder="Label"
                    value={item.label}
                    onChange={(e) => updateNav(idx, "label", e.target.value)}
                  />
                  <input
                    className={inputCls}
                    placeholder="/link"
                    value={item.href}
                    onChange={(e) => updateNav(idx, "href", e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setNav([...s.nav, { label: "New item", href: "/" }])}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-brand-300 px-3 py-2 text-sm font-600 text-brand-700 transition-colors hover:bg-brand-50"
            >
              <Plus className="h-4 w-4" /> Add menu item
            </button>
          </div>
        </Card>

      </div>

      <div className="fixed bottom-0 left-64 right-0 border-t border-line bg-white/90 px-8 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <p className="text-sm">
            {error ? (
              <span className="text-rust-600">{error}</span>
            ) : saved ? (
              <span className="inline-flex items-center gap-1.5 text-brand-600">
                <Check className="h-4 w-4" /> Saved — your changes are live.
              </span>
            ) : dirty ? (
              <span className="text-slate-500">You have unsaved changes.</span>
            ) : (
              <span className="text-slate-400">All changes saved.</span>
            )}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-600 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <h2 className="mb-4 font-display text-lg font-600 text-ink">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
