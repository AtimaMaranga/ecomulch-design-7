import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { loadArticles } from "@/lib/blog/store";
import { formatDate, inTheme, publishProblems } from "@/lib/blog/articles";
import { getTheme, THEMES } from "@/lib/blog/themes";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const all = await loadArticles();
  const sorted = [...all].sort((a, b) => b.date.localeCompare(a.date));
  const published = all.filter((a) => a.status === "published");

  return (
    <div className="mx-auto max-w-5xl p-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-700 text-ink">Blog articles</h1>
          <p className="mt-1 text-ink-light">
            {published.length} published · {all.length - published.length} draft
            {all.length - published.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-700 text-white shadow-sm hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> New article
        </Link>
      </header>

      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        {sorted.length === 0 ? (
          <p className="p-6 text-sm text-slate-400">No articles yet. Create the first one.</p>
        ) : (
          <ul className="divide-y divide-line">
            {sorted.map((a) => {
              const todo = a.status === "draft" ? publishProblems(a, all).length : 0;
              return (
                <li key={a.slug}>
                  <Link
                    href={`/admin/articles/${a.slug}`}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-tint"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-base font-600 text-ink">{a.title || "Untitled"}</p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {formatDate(a.date)} · {getTheme(a.primaryTheme)?.name ?? "No theme"}
                        {todo > 0 && ` · ${todo} thing(s) to complete before publishing`}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-700 ${
                        a.status === "published" ? "bg-brand-50 text-brand-700" : "bg-amber-50 text-amber-800"
                      }`}
                    >
                      {a.status === "published" ? "Published" : "Draft"}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-700 uppercase tracking-wider text-slate-400">Theme coverage</h2>
        <p className="mt-1 text-sm text-ink-light">
          Published articles per theme. Themes with none stay hidden on the Blog page. The launch
          goal is at least two in each.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {THEMES.map((t) => {
            const n = published.filter((a) => inTheme(a, t.slug)).length;
            return (
              <li key={t.slug} className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3">
                <span className="text-sm font-600 text-ink">{t.name}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-700 ${
                    n >= 2 ? "bg-brand-50 text-brand-700" : n === 1 ? "bg-amber-50 text-amber-800" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {n === 0 ? "Hidden — no articles" : `${n} article${n === 1 ? "" : "s"}`}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
