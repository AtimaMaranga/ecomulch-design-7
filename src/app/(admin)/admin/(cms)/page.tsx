import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  LayoutTemplate,
  Newspaper,
  Pencil,
  Settings,
} from "lucide-react";
import { getSettings, lastEdited, listPages } from "@/lib/content/store";
import { isLiveBackend } from "@/lib/content/repository";
import { GROUPS } from "@/lib/content/site-map";
import { loadArticles } from "@/lib/blog/store";
import { SEED_SETTINGS } from "@/lib/content/seed";

export const dynamic = "force-dynamic";

function when(iso?: string) {
  if (!iso) return "Original content";
  const d = new Date(iso);
  return `Edited ${d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
}

export default async function DashboardPage() {
  const pages = listPages();
  const live = isLiveBackend();
  const [edited, settings, articles] = await Promise.all([
    lastEdited(pages.map((p) => p.slug)),
    getSettings(),
    loadArticles(),
  ]);
  const published = articles.filter((a) => a.status === "published").length;
  const drafts = articles.length - published;

  const checklist = [
    { ok: settings.whatsappNumber !== SEED_SETTINGS.whatsappNumber, label: "Real WhatsApp number" },
    { ok: Boolean(settings.phone?.trim()), label: "Phone number (footer)" },
    { ok: Boolean(settings.email?.trim()), label: "Email address (footer)" },
    {
      ok: Boolean(settings.instagramUrl || settings.linkedinUrl || settings.youtubeUrl || settings.facebookUrl),
      label: "At least one social media link",
    },
    { ok: settings.whatsappCatalogueUrl !== SEED_SETTINGS.whatsappCatalogueUrl, label: "WhatsApp catalogue link" },
    { ok: settings.flowerBedsYoutubeUrl !== SEED_SETTINGS.flowerBedsYoutubeUrl, label: "Flower beds video link" },
    { ok: published >= 1, label: "At least one published blog article" },
  ];
  const todo = checklist.filter((c) => !c.ok).length;

  return (
    <div className="mx-auto max-w-5xl p-8">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-700 text-ink">Welcome back 👋</h1>
        <p className="mt-1 text-ink-light">
          Every page on the EcoMulch website can be edited here. Changes go live as soon as you save.
        </p>
      </header>

      {!live && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Preview mode.</strong> You&apos;re editing against local files (great for testing). To
          make this a live, always-on admin that saves to a database, connect Supabase — see{" "}
          <code>ADMIN_SETUP.md</code>.
        </div>
      )}

      {/* At a glance */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <p className="text-sm text-slate-400">Pages</p>
          <p className="mt-1 font-display text-3xl font-700 text-ink">{pages.length}</p>
          <p className="text-xs text-slate-400">{Object.keys(edited).length} edited in the admin</p>
        </div>
        <Link
          href="/admin/articles"
          className="group rounded-2xl border border-line bg-white p-5 shadow-card transition-colors hover:border-brand-200"
        >
          <p className="flex items-center justify-between text-sm text-slate-400">
            Blog articles <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" />
          </p>
          <p className="mt-1 font-display text-3xl font-700 text-ink">{published}</p>
          <p className="text-xs text-slate-400">
            published · {drafts} draft{drafts === 1 ? "" : "s"}
          </p>
        </Link>
        <Link
          href="/admin/settings"
          className={`group rounded-2xl border p-5 shadow-card transition-colors ${
            todo ? "border-amber-200 bg-amber-50/60 hover:border-amber-300" : "border-line bg-white hover:border-brand-200"
          }`}
        >
          <p className="flex items-center justify-between text-sm text-slate-400">
            Before you launch <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" />
          </p>
          <p className="mt-1 font-display text-3xl font-700 text-ink">
            {checklist.length - todo}/{checklist.length}
          </p>
          <p className="text-xs text-slate-400">{todo ? `${todo} item(s) still to fill in` : "All set"}</p>
        </Link>
      </div>

      {todo > 0 && (
        <section className="mb-8 rounded-2xl border border-line bg-white p-5 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-base font-700 text-ink">
            <AlertTriangle className="h-4 w-4 text-amber-600" /> Launch checklist
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            These still use placeholders or are empty. Most are filled in under Site settings.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-sm">
                {c.ok ? (
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                ) : (
                  <span className="h-4 w-4 rounded-full border-2 border-amber-400" />
                )}
                <span className={c.ok ? "text-slate-400 line-through" : "text-ink"}>{c.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Site map */}
      <section>
        <h2 className="mb-1 flex items-center gap-2 text-sm font-700 uppercase tracking-wider text-slate-400">
          <FileText className="h-4 w-4" /> Pages
        </h2>
        <p className="mb-4 text-sm text-ink-light">
          <LayoutTemplate className="mr-1 inline h-3.5 w-3.5 text-brand-600" />
          <strong className="font-600">Flexible</strong> pages let you add, remove and reorder sections.{" "}
          <Pencil className="ml-2 mr-1 inline h-3.5 w-3.5 text-slate-500" />
          <strong className="font-600">Fixed-design</strong> pages keep their layout, but every text, photo,
          link and list item is editable.
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          {GROUPS.map((group) => {
            const items = pages.filter((p) => p.group === group);
            return (
              <div key={group} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <h3 className="border-b border-line bg-surface-tint px-5 py-3 font-display text-base font-700 text-ink">
                  {group}
                </h3>
                <ul className="divide-y divide-line">
                  {items.map((p) => (
                    <li key={p.slug} className="flex items-center gap-3 px-5 py-3">
                      {p.kind === "blocks" ? (
                        <LayoutTemplate className="h-4 w-4 shrink-0 text-brand-600" aria-label="Flexible page" />
                      ) : (
                        <Pencil className="h-4 w-4 shrink-0 text-slate-500" aria-label="Fixed-design page" />
                      )}
                      <Link href={`/admin/pages/${p.slug}`} className="min-w-0 flex-1 hover:text-brand-700">
                        <span className="block truncate text-sm font-600 text-ink">{p.title}</span>
                        <span className="block text-xs text-slate-400">{when(edited[p.slug])}</span>
                      </Link>
                      <a
                        href={p.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${p.title}`}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-surface hover:text-ink"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                  {group === "Blog" && (
                    <li className="flex items-center gap-3 px-5 py-3">
                      <Newspaper className="h-4 w-4 shrink-0 text-brand-600" />
                      <Link href="/admin/articles" className="min-w-0 flex-1 hover:text-brand-700">
                        <span className="block text-sm font-600 text-ink">Articles</span>
                        <span className="block text-xs text-slate-400">
                          Write, publish and organise blog articles
                        </span>
                      </Link>
                      <ArrowRight className="h-4 w-4 text-brand-600" />
                    </li>
                  )}
                </ul>
              </div>
            );
          })}

          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <h3 className="border-b border-line bg-surface-tint px-5 py-3 font-display text-base font-700 text-ink">
              Whole site
            </h3>
            <ul className="divide-y divide-line">
              <li>
                <Link href="/admin/settings" className="flex items-center gap-3 px-5 py-3 hover:bg-surface-tint">
                  <Settings className="h-4 w-4 text-brand-600" />
                  <span className="flex-1">
                    <span className="block text-sm font-600 text-ink">Site settings</span>
                    <span className="block text-xs text-slate-400">
                      Menu, WhatsApp, footer contacts and social links
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-brand-600" />
                </Link>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 hover:bg-surface-tint">
                  <ExternalLink className="h-4 w-4 text-brand-600" />
                  <span className="flex-1 text-sm font-600 text-ink">View live site</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
