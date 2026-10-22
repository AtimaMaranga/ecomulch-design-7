"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  Loader2,
  Plus,
  Save,
  Send,
  Trash2,
  Undo2,
} from "lucide-react";
import { FieldInput } from "./field-inputs";
import { THEMES, type ThemeSlug } from "@/lib/blog/themes";
import {
  publishProblems,
  slugify,
  type Article,
  type ArticleBlock,
} from "@/lib/blog/articles";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

function Card({ title, help, children }: { title: string; help?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <h2 className="font-display text-base font-700 text-ink">{title}</h2>
      {help && <p className="mt-0.5 text-xs text-slate-400">{help}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Text({
  label,
  value,
  onChange,
  help,
  area,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
  area?: boolean;
  max?: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label className="text-sm font-600 text-ink">{label}</label>
        {max && (
          <span className={`text-xs ${value.length > max ? "text-rust-600" : "text-slate-400"}`}>
            {value.length}/{max}
          </span>
        )}
      </div>
      {help && <p className="-mt-1 mb-1.5 text-xs text-slate-400">{help}</p>}
      {area ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={`${inputCls} resize-y`} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      )}
    </div>
  );
}

const BLOCK_LABEL: Record<ArticleBlock["type"], string> = {
  p: "Paragraph",
  h2: "Section heading",
  h3: "Sub-heading",
  figure: "Photo",
  callout: "Highlighted statement",
};

function newBlock(type: ArticleBlock["type"]): ArticleBlock {
  if (type === "figure") return { type, image: "", alt: "", caption: "", align: "right" };
  return { type, text: "" } as ArticleBlock;
}


export function ArticleEditor({
  initial,
  originalSlug,
  others,
}: {
  initial: Article;
  /** "new" when creating. */
  originalSlug: string;
  /** The other articles, for cross-links and uniqueness. */
  others: { slug: string; title: string; status: string }[];
}) {
  const router = useRouter();
  const [a, setA] = useState<Article>(initial);
  const [slugTouched, setSlugTouched] = useState(originalSlug !== "new");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState<"" | "save" | "publish" | "delete">("");
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string; list?: string[] } | null>(null);

  const set = <K extends keyof Article>(k: K, v: Article[K]) => {
    setA((prev) => {
      const next = { ...prev, [k]: v };
      if (k === "title" && !slugTouched) next.slug = slugify(String(v));
      return next;
    });
    setDirty(true);
    setMsg(null);
  };

  const problems = useMemo(
    () => publishProblems(a, [...others.map((o) => ({ slug: o.slug }) as Article), a]),
    [a, others],
  );
  const published = a.status === "published";

  async function persist(next: Article, kind: "save" | "publish") {
    next = { ...next, keywords: next.keywords.map((k) => k.trim()).filter(Boolean) };
    setBusy(kind);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/articles/${encodeURIComponent(originalSlug)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ kind: "err", text: data.error || "Could not save", list: data.problems });
        return false;
      }
      setA(next);
      setDirty(false);
      setMsg({ kind: "ok", text: next.status === "published" ? "Published — the article is live." : "Draft saved." });
      if (originalSlug !== next.slug) router.replace(`/admin/articles/${next.slug}`);
      router.refresh();
      return true;
    } catch {
      setMsg({ kind: "err", text: "Could not save. Check your connection." });
      return false;
    } finally {
      setBusy("");
    }
  }

  async function remove() {
    if (!confirm(`Delete “${a.title || "this article"}”? This cannot be undone.`)) return;
    setBusy("delete");
    const res = await fetch(`/api/admin/articles/${encodeURIComponent(originalSlug)}`, { method: "DELETE" });
    setBusy("");
    if (res.ok) {
      router.replace("/admin/articles");
      router.refresh();
    } else setMsg({ kind: "err", text: "Could not delete the article." });
  }

  /* body blocks */
  const setBlock = (i: number, b: ArticleBlock) => set("body", a.body.map((x, j) => (j === i ? b : x)));
  const moveBlock = (i: number, d: -1 | 1) => {
    const to = i + d;
    if (to < 0 || to >= a.body.length) return;
    const next = [...a.body];
    [next[i], next[to]] = [next[to], next[i]];
    set("body", next);
  };

  const cont = a.continueExploring;
  const linkable = others.filter((o) => o.slug !== a.slug);

  return (
    <div className="mx-auto max-w-3xl p-8 pb-32">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-700 uppercase tracking-wider text-slate-400">Blog article</p>
          <h1 className="font-display text-3xl font-700 text-ink">{a.title || "New article"}</h1>
          <p className="mt-1 flex items-center gap-2 text-sm">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-700 ${
                published ? "bg-brand-50 text-brand-700" : "bg-amber-50 text-amber-800"
              }`}
            >
              {published ? "Published" : "Draft"}
            </span>
            {a.slug && <span className="text-slate-400">/blog/{a.slug}</span>}
          </p>
        </div>
        {originalSlug !== "new" && (
          <a
            href={`/blog/${originalSlug}${published ? "" : "?preview=1"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-600 text-ink-light hover:bg-surface"
          >
            {published ? <ExternalLink className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {published ? "View article" : "Preview"}
          </a>
        )}
      </header>

      <div className="space-y-4">
        <Card title="Basics">
          <Text label="Title" value={a.title} onChange={(v) => set("title", v)} />
          <Text
            label="Web address (slug)"
            help="Lowercase words joined by hyphens. Filled in from the title until you change it."
            value={a.slug}
            onChange={(v) => {
              setSlugTouched(true);
              set("slug", slugify(v));
            }}
          />
          <Text
            label="Summary (excerpt)"
            help="Shown on article cards and when the article is shared."
            value={a.excerpt}
            onChange={(v) => set("excerpt", v)}
            area
            max={220}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Text label="Author" value={a.author} onChange={(v) => set("author", v)} />
            <div>
              <label className="mb-1.5 block text-sm font-600 text-ink">Publication date</label>
              <input type="date" value={a.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
            </div>
          </div>
        </Card>

        <Card title="Featured image" help="Shown wide (16:9) at the top of the article and on article cards.">
          <FieldInput
            def={{ key: "img", label: "Photo", type: "image" }}
            value={a.featuredImage}
            onChange={(v) => set("featuredImage", String(v))}
          />
          <Text label="Photo description (alt text)" value={a.featuredAlt} onChange={(v) => set("featuredAlt", v)} />
          <Text
            label="Caption (optional)"
            value={a.featuredCaption ?? ""}
            onChange={(v) => set("featuredCaption", v || undefined)}
          />
        </Card>

        <Card title="Themes" help="Exactly one primary theme, plus up to two more if the article substantially covers them.">
          <div>
            <label className="mb-1.5 block text-sm font-600 text-ink">Primary theme</label>
            <select
              value={a.primaryTheme}
              onChange={(e) => {
                const t = e.target.value as ThemeSlug;
                set("primaryTheme", t);
                if (a.secondaryThemes.includes(t)) set("secondaryThemes", a.secondaryThemes.filter((x) => x !== t));
              }}
              className={inputCls}
            >
              {THEMES.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-1.5 text-sm font-600 text-ink">Secondary themes (up to two)</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {THEMES.filter((t) => t.slug !== a.primaryTheme).map((t) => {
                const on = a.secondaryThemes.includes(t.slug);
                const full = !on && a.secondaryThemes.length >= 2;
                return (
                  <label
                    key={t.slug}
                    className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm ${
                      on ? "border-brand-400 bg-brand-50" : "border-line"
                    } ${full ? "opacity-50" : "cursor-pointer"}`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      disabled={full}
                      onChange={() =>
                        set(
                          "secondaryThemes",
                          on ? a.secondaryThemes.filter((x) => x !== t.slug) : [...a.secondaryThemes, t.slug],
                        )
                      }
                      className="accent-brand-600"
                    />
                    {t.name}
                  </label>
                );
              })}
            </div>
          </div>
          <Text
            label="Keywords"
            help="Comma-separated. For editorial use only — not shown to visitors."
            value={a.keywords.join(", ")}
            onChange={(v) =>
              set(
                "keywords",
                v.split(",").map((k) => k.trimStart()).filter((k, i, arr) => k || i === arr.length - 1),
              )
            }
          />
          <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
            <Text
              label="Series (optional)"
              help="e.g. The Madafu Journey"
              value={a.series?.name ?? ""}
              onChange={(v) => set("series", v ? { name: v, order: a.series?.order ?? 1 } : undefined)}
            />
            <div>
              <label className="mb-1.5 block text-sm font-600 text-ink">Part no.</label>
              <input
                type="number"
                min={1}
                disabled={!a.series}
                value={a.series?.order ?? ""}
                onChange={(e) => a.series && set("series", { ...a.series, order: Number(e.target.value) || 1 })}
                className={inputCls}
              />
            </div>
          </div>
        </Card>

        <Card
          title="Article"
          help="Section headings automatically build the “In this article” list. In text, write **words** for bold and [words](/page) for a link."
        >
          {a.body.map((b, i) => (
            <div key={i} className="rounded-xl border border-line bg-surface-tint p-3.5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <select
                  value={b.type}
                  onChange={(e) => {
                    const t = e.target.value as ArticleBlock["type"];
                    const keep = "text" in b ? b.text : "";
                    setBlock(i, t === "figure" ? newBlock("figure") : ({ type: t, text: keep } as ArticleBlock));
                  }}
                  className="rounded-lg border border-line bg-white px-2 py-1 text-xs font-700 uppercase tracking-wider text-slate-500"
                >
                  {Object.entries(BLOCK_LABEL).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
                <div className="flex items-center">
                  <button type="button" onClick={() => moveBlock(i, -1)} disabled={i === 0} className="rounded-md p-1 text-slate-400 hover:bg-white disabled:opacity-30" aria-label="Move up">
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => moveBlock(i, 1)} disabled={i === a.body.length - 1} className="rounded-md p-1 text-slate-400 hover:bg-white disabled:opacity-30" aria-label="Move down">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => set("body", a.body.filter((_, j) => j !== i))} className="rounded-md p-1 text-rust-500 hover:bg-rust-50" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {b.type === "figure" ? (
                <div className="space-y-3">
                  <FieldInput
                    def={{ key: "img", label: "Photo (shown at 4:3)", type: "image" }}
                    value={b.image}
                    onChange={(v) => setBlock(i, { ...b, image: String(v) })}
                  />
                  <Text label="Photo description (alt text)" value={b.alt} onChange={(v) => setBlock(i, { ...b, alt: v })} />
                  <Text label="Caption (optional)" value={b.caption ?? ""} onChange={(v) => setBlock(i, { ...b, caption: v })} />
                  <div>
                    <label className="mb-1.5 block text-sm font-600 text-ink">Placement</label>
                    <select
                      value={b.align}
                      onChange={(e) => setBlock(i, { ...b, align: e.target.value as "left" | "right" | "full" })}
                      className={inputCls}
                    >
                      <option value="right">Beside the text, on the right</option>
                      <option value="left">Beside the text, on the left</option>
                      <option value="full">Full width</option>
                    </select>
                  </div>
                </div>
              ) : b.type === "h2" || b.type === "h3" ? (
                <input value={b.text} onChange={(e) => setBlock(i, { ...b, text: e.target.value })} className={`${inputCls} font-700`} />
              ) : (
                <textarea
                  value={b.text}
                  onChange={(e) => setBlock(i, { ...b, text: e.target.value })}
                  rows={b.type === "p" ? 4 : 2}
                  className={`${inputCls} resize-y`}
                />
              )}
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(BLOCK_LABEL) as ArticleBlock["type"][]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("body", [...a.body, newBlock(t)])}
                className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-brand-300 px-3 py-1.5 text-xs font-600 text-brand-700 hover:bg-brand-50"
              >
                <Plus className="h-3.5 w-3.5" /> {BLOCK_LABEL[t]}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Sidebar: Explore EcoMulch’s work" help="One relevant EcoMulch page for readers of this article (avoid a hard sales pitch).">
          <label className="flex items-center gap-2.5 text-sm font-600 text-ink">
            <input
              type="checkbox"
              checked={Boolean(a.explore)}
              onChange={(e) =>
                set("explore", e.target.checked ? { heading: "", body: "", cta: "Learn more", href: "" } : null)
              }
              className="accent-brand-600"
            />
            Show this box
          </label>
          {a.explore && (
            <>
              <Text label="Heading" value={a.explore.heading} onChange={(v) => set("explore", { ...a.explore!, heading: v })} />
              <Text label="Short explanation" area value={a.explore.body} onChange={(v) => set("explore", { ...a.explore!, body: v })} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Text label="Button text" value={a.explore.cta} onChange={(v) => set("explore", { ...a.explore!, cta: v })} />
                <Text
                  label="Button link"
                  help="e.g. /say-no-to-bare-soil/our-response"
                  value={a.explore.href}
                  onChange={(v) => set("explore", { ...a.explore!, href: v })}
                />
              </div>
            </>
          )}
        </Card>

        <Card
          title="Sidebar: Continue exploring"
          help="Choose one: the next part of a series, or up to three related articles. Links to unpublished articles stay hidden until they’re published."
        >
          <div className="flex flex-wrap gap-2">
            {[
              { v: "none", l: "Don’t show" },
              { v: "series", l: "Next in series" },
              { v: "related", l: "Related articles" },
            ].map((o) => {
              const on = (cont?.mode ?? "none") === o.v;
              return (
                <button
                  key={o.v}
                  type="button"
                  onClick={() =>
                    set(
                      "continueExploring",
                      o.v === "none" ? null : o.v === "series" ? { mode: "series", next: "" } : { mode: "related", slugs: [] },
                    )
                  }
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-600 ${
                    on ? "border-brand-600 bg-brand-600 text-white" : "border-line text-ink-light hover:bg-surface"
                  }`}
                >
                  {o.l}
                </button>
              );
            })}
          </div>
          {cont?.mode === "series" && (
            <select
              value={cont.next}
              onChange={(e) => set("continueExploring", { mode: "series", next: e.target.value })}
              className={inputCls}
            >
              <option value="">Choose the next article…</option>
              {linkable.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.title}
                  {o.status !== "published" ? " (draft)" : ""}
                </option>
              ))}
            </select>
          )}
          {cont?.mode === "related" && (
            <div className="space-y-2">
              {linkable.length === 0 && <p className="text-sm text-slate-400">No other articles yet.</p>}
              {linkable.map((o) => {
                const on = cont.slugs.includes(o.slug);
                const full = !on && cont.slugs.length >= 3;
                return (
                  <label key={o.slug} className={`flex items-center gap-2.5 text-sm ${full ? "opacity-50" : ""}`}>
                    <input
                      type="checkbox"
                      checked={on}
                      disabled={full}
                      onChange={() =>
                        set("continueExploring", {
                          mode: "related",
                          slugs: on ? cont.slugs.filter((s) => s !== o.slug) : [...cont.slugs, o.slug],
                        })
                      }
                      className="accent-brand-600"
                    />
                    {o.title}
                    {o.status !== "published" && <span className="text-xs text-amber-700">(draft)</span>}
                  </label>
                );
              })}
            </div>
          )}
        </Card>

        <Card title="Search & sharing">
          <Text label="SEO title" value={a.seoTitle} onChange={(v) => set("seoTitle", v)} max={60} />
          <Text label="Meta description" area value={a.metaDescription} onChange={(v) => set("metaDescription", v)} max={160} />
          {(!a.seoTitle || !a.metaDescription) && (
            <button
              type="button"
              onClick={() => {
                if (!a.seoTitle) set("seoTitle", a.title);
                if (!a.metaDescription) set("metaDescription", a.excerpt.slice(0, 160));
              }}
              className="text-sm font-600 text-brand-700 hover:underline"
            >
              Fill in from the title and summary
            </button>
          )}
        </Card>

        {originalSlug !== "new" && (
          <button
            type="button"
            onClick={remove}
            disabled={busy !== ""}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-600 text-rust-600 hover:bg-rust-50"
          >
            <Trash2 className="h-4 w-4" /> Delete article
          </button>
        )}
      </div>

      <div className="fixed bottom-0 left-64 right-0 border-t border-line bg-white/95 px-8 py-3 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          {msg && (
            <div className={`mb-2 text-sm ${msg.kind === "ok" ? "text-brand-700" : "text-rust-600"}`}>
              <p className="flex items-center gap-1.5 font-600">
                {msg.kind === "ok" ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                {msg.text}
              </p>
              {msg.list && (
                <ul className="ml-6 mt-1 list-disc text-xs">
                  {msg.list.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
              {dirty ? (
                <span className="text-amber-700">You have unsaved changes</span>
              ) : problems.length && !published ? (
                <span className="text-slate-400">{problems.length} thing(s) to complete before publishing</span>
              ) : (
                <span className="text-slate-400">All changes saved</span>
              )}
            </p>
            <div className="flex gap-2">
              {published ? (
                <button
                  type="button"
                  onClick={() => persist({ ...a, status: "draft" }, "save")}
                  disabled={busy !== ""}
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-700 text-ink-light hover:bg-surface disabled:opacity-50"
                >
                  <Undo2 className="h-4 w-4" /> Unpublish
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => persist({ ...a, status: "draft" }, "save")}
                  disabled={busy !== "" || !a.title.trim()}
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-700 text-ink hover:bg-surface disabled:opacity-50"
                >
                  {busy === "save" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save draft
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (problems.length) {
                    setMsg({ kind: "err", text: "This article isn’t ready to publish yet.", list: problems });
                    return;
                  }
                  persist({ ...a, status: "published" }, "publish");
                }}
                disabled={busy !== "" || (published && !dirty)}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-700 text-white shadow-sm hover:bg-brand-700 disabled:opacity-50"
              >
                {busy === "publish" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {published ? "Update live article" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
