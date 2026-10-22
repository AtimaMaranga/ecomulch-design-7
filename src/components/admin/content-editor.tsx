"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Info,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import { FieldInput } from "./field-inputs";
import type { FieldDef } from "@/lib/content/types";

/*
 * Editor for fixed-layout pages. The form is generated from the shape of the
 * page's content: text becomes text boxes, photos get the upload picker, icons
 * the icon picker, and lists (cards, steps, paragraphs) can be added to,
 * removed and reordered. Keys starting with "_" are layout settings and stay
 * hidden; "_label" names a section.
 */

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

const LABELS: Record<string, string> = {
  title: "Title",
  titleAccent: "Title (green part)",
  titleEnd: "Title (line after the green part)",
  eyebrow: "Small label above the title",
  subtitle: "Bold line under the title",
  lede: "Introduction",
  intro: "Introduction",
  body: "Text",
  paras: "Paragraphs",
  paragraphs: "Paragraphs",
  kicker: "Bold line",
  image: "Photo",
  imageAlt: "Photo description (for screen readers)",
  alt: "Photo description (for screen readers)",
  href: "Link",
  cta: "Button text",
  ctaHref: "Button link",
  label: "Label",
  icon: "Icon",
  items: "Items",
  points: "Points",
  footer: "Closing line",
  lead: "Opening line",
  caption: "Caption",
  note: "Note",
  quote: "Highlighted quote",
  heading: "Heading",
  name: "Name",
  line: "Short description",
};

function humanize(key: string): string {
  if (LABELS[key]) return LABELS[key];
  const s = key.replace(/([a-z])([A-Z0-9])/g, "$1 $2").replace(/[-_]/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function inferType(key: string, value: string): FieldDef["type"] {
  const k = key.toLowerCase();
  if (k === "icon" || k.endsWith("icon")) return "icon";
  if (k === "image" || k === "src" || k.endsWith("image") || /\.(jpe?g|png|webp|svg)$/i.test(value))
    return "image";
  if (k === "href" || k.endsWith("href") || k.endsWith("url")) return "url";
  if (
    value.length > 70 ||
    /^(body|lede|intro|text|subtitle|lead|footer|note|quote|kicker|caption)$/.test(key)
  )
    return "textarea";
  return "text";
}

const HELP: Record<string, string> = {
  url: "A page path like /blog, a full https:// link, or a shortcut: {whatsapp}, {catalogue}, {youtube}, {flowerBedsVideo}.",
  textarea: "Use **double asterisks** for bold and [text](/page) for a link.",
};

/** A sensible label for a list item, taken from its first meaningful text. */
function itemSummary(item: unknown, fallback: string): string {
  if (typeof item === "string") return item.slice(0, 70) || fallback;
  if (!isObj(item)) return fallback;
  for (const k of ["title", "label", "name", "heading", "caption", "body"]) {
    const v = item[k];
    if (typeof v === "string" && v.trim()) return v.replace(/\*\*/g, "").slice(0, 70);
  }
  return fallback;
}

/** A blank copy of a template item: text emptied, icons and layout kept. */
function blankFrom(template: unknown): unknown {
  if (typeof template === "string") return "";
  if (Array.isArray(template)) return [];
  if (!isObj(template)) return template;
  const out: Obj = {};
  for (const [k, v] of Object.entries(template)) {
    if (k.startsWith("_") || k === "icon" || k.endsWith("Icon")) out[k] = v;
    else if (Array.isArray(v)) out[k] = v.length && typeof v[0] === "string" ? [""] : [];
    else if (isObj(v)) out[k] = blankFrom(v);
    else out[k] = typeof v === "string" ? "" : v;
  }
  return out;
}

/** Shapes for new items when a list is empty and has no example to copy. */
const LIST_TEMPLATES: Record<string, unknown> = {
  paras: "",
  paragraphs: "",
  cards: { image: "", imageAlt: "", title: "", body: "" },
  points: { _tone: "mint", icon: "leaf", title: "", body: "" },
};

const listBtn =
  "rounded-md p-1 text-slate-400 hover:bg-white hover:text-ink disabled:opacity-30";

function ListEditor({
  name,
  value,
  template,
  onChange,
  depth,
}: {
  name: string;
  value: unknown[];
  template: unknown;
  onChange: (v: unknown[]) => void;
  depth: number;
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  template = template ?? LIST_TEMPLATES[name];
  const strings = typeof template === "string" || typeof value[0] === "string";
  const itemNoun = strings ? "paragraph" : humanize(name).replace(/s$/, "").toLowerCase();

  const set = (i: number, v: unknown) => onChange(value.map((x, j) => (j === i ? v : x)));
  const move = (i: number, d: -1 | 1) => {
    const to = i + d;
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    [next[i], next[to]] = [next[to], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-2.5">
      {value.map((item, i) => (
        <div key={i} className="rounded-xl border border-line bg-surface-tint">
          <div className="flex items-center gap-2 px-3 py-2">
            {strings ? (
              <span className="text-xs font-700 uppercase tracking-wider text-slate-400">
                {itemNoun} {i + 1}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
                className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm font-600 text-ink"
              >
                {open[i] ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                )}
                <span className="truncate">{itemSummary(item, `${itemNoun} ${i + 1}`)}</span>
              </button>
            )}
            <div className="ml-auto flex shrink-0 items-center">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className={listBtn} aria-label="Move up">
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === value.length - 1}
                className={listBtn}
                aria-label="Move down"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remove this ${itemNoun}?`)) onChange(value.filter((_, j) => j !== i));
                }}
                className="rounded-md p-1 text-rust-500 hover:bg-rust-50"
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          {(strings || open[i]) && (
            <div className="border-t border-line px-3 pb-3 pt-3">
              {strings ? (
                <FieldInput
                  def={{ key: "p", label: "", type: "textarea", help: HELP.textarea }}
                  value={item}
                  onChange={(v) => set(i, v)}
                />
              ) : (
                <Node value={item} onChange={(v) => set(i, v)} depth={depth + 1} />
              )}
            </div>
          )}
        </div>
      ))}
      {template !== undefined || value.length > 0 ? (
      <button
        type="button"
        onClick={() => {
          onChange([...value, blankFrom(template ?? value[0])]);
          if (!strings) setOpen((o) => ({ ...o, [value.length]: true }));
        }}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-brand-300 px-3 py-2 text-sm font-600 text-brand-700 transition-colors hover:bg-brand-50"
      >
        <Plus className="h-4 w-4" /> Add {itemNoun}
      </button>
      ) : null}
    </div>
  );
}

/** Renders the fields of one object (recursively). */
function Node({
  value,
  onChange,
  depth,
  templates,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  depth: number;
  templates?: Obj;
}) {
  if (!isObj(value)) return null;
  const set = (k: string, v: unknown) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-4">
      {Object.entries(value).map(([k, v]) => {
        if (k.startsWith("_")) return null;
        if (typeof v === "string") {
          const type = inferType(k, v);
          return (
            <FieldInput
              key={k}
              def={{ key: k, label: humanize(k), type, help: HELP[type] }}
              value={v}
              onChange={(nv) => set(k, nv)}
            />
          );
        }
        if (Array.isArray(v)) {
          const tpl = templates && Array.isArray(templates[k]) ? (templates[k] as unknown[])[0] : v[0];
          return (
            <div key={k}>
              <p className="mb-1.5 text-sm font-600 text-ink">{humanize(k)}</p>
              <ListEditor name={k} value={v} template={tpl} onChange={(nv) => set(k, nv)} depth={depth} />
            </div>
          );
        }
        if (isObj(v)) {
          return (
            <fieldset key={k} className="rounded-xl border border-line p-3.5">
              <legend className="px-1.5 text-xs font-700 uppercase tracking-wider text-slate-500">
                {typeof v._label === "string" ? v._label : humanize(k)}
              </legend>
              <Node
                value={v}
                onChange={(nv) => set(k, nv)}
                depth={depth + 1}
                templates={templates && isObj(templates[k]) ? (templates[k] as Obj) : undefined}
              />
            </fieldset>
          );
        }
        return null;
      })}
    </div>
  );
}

export function ContentEditor({
  slug,
  title,
  path,
  group,
  content,
  defaults,
}: {
  slug: string;
  title: string;
  path: string;
  group: string;
  content: Obj;
  defaults: Obj;
}) {
  const [data, setData] = useState<Obj>(content);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const update = (next: Obj) => {
    setData(next);
    setDirty(true);
    setSaved(false);
  };

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data }),
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

  const sections = Object.entries(data).filter(([k]) => !k.startsWith("_"));

  return (
    <div className="mx-auto max-w-3xl p-8 pb-32">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-700 uppercase tracking-wider text-slate-400">{group}</p>
          <h1 className="font-display text-3xl font-700 text-ink">{title}</h1>
          <p className="text-sm text-slate-400">{path}</p>
        </div>
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-600 text-ink-light hover:bg-surface"
        >
          <ExternalLink className="h-4 w-4" /> View page
        </a>
      </header>

      <p className="mb-5 flex items-start gap-2.5 rounded-xl bg-brand-50 px-4 py-3 text-sm text-ink-light">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        <span>
          This page has a fixed design. Every text, photo, link and list item on it can
          be edited here. In longer text, write <code className="font-600">**words**</code> for
          bold and <code className="font-600">[words](/page)</code> for a link.
        </span>
      </p>

      <div className="space-y-3">
        {sections.map(([key, value]) => {
          const label =
            isObj(value) && typeof value._label === "string" ? value._label : humanize(key);
          const isOpen = open[key] ?? false;
          const def = defaults[key];
          return (
            <section key={key} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              <div className="flex items-center gap-3 px-5 py-3.5">
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [key]: !isOpen }))}
                  className="flex flex-1 items-center gap-2.5 text-left"
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                  <span className="font-display text-base font-700 text-ink">{label}</span>
                </button>
                {def !== undefined && JSON.stringify(def) !== JSON.stringify(value) && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Restore “${label}” to its original content?`))
                        update({ ...data, [key]: JSON.parse(JSON.stringify(def)) });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-600 text-slate-500 hover:bg-surface hover:text-ink"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Restore original
                  </button>
                )}
              </div>
              {isOpen && (
                <div className="border-t border-line px-5 py-5">
                  {isObj(value) ? (
                    <Node
                      value={value}
                      onChange={(v) => update({ ...data, [key]: v })}
                      depth={0}
                      templates={isObj(def) ? def : undefined}
                    />
                  ) : Array.isArray(value) ? (
                    <ListEditor
                      name={key}
                      value={value}
                      template={Array.isArray(def) ? def[0] : value[0]}
                      onChange={(v) => update({ ...data, [key]: v })}
                      depth={0}
                    />
                  ) : (
                    <Node
                      value={{ [key]: value }}
                      onChange={(v) => update({ ...data, [key]: (v as Obj)[key] })}
                      depth={0}
                    />
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-64 right-0 border-t border-line bg-white/90 px-8 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <p className="text-sm">
            {error ? (
              <span className="text-rust-600">{error}</span>
            ) : saved ? (
              <span className="inline-flex items-center gap-1.5 text-brand-700">
                <Check className="h-4 w-4" /> Saved — the page is updated
              </span>
            ) : dirty ? (
              <span className="text-amber-700">You have unsaved changes</span>
            ) : (
              <span className="text-slate-400">All changes saved</span>
            )}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-700 text-white shadow-sm transition-colors hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
