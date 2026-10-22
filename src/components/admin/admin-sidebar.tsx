"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  Leaf,
  LogOut,
  Newspaper,
  Settings,
} from "lucide-react";
import { GROUPS, type SiteMapEntry } from "@/lib/content/site-map";

export function AdminSidebar({ pages }: { pages: SiteMapEntry[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const activeGroup = pages.find((p) => pathname === `/admin/pages/${p.slug}`)?.group;
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    activeGroup ? { [activeGroup]: true } : pathname.startsWith("/admin/articles") ? { Blog: true } : {},
  );

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const linkCls = (active: boolean) =>
    `flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-600 transition-colors ${
      active ? "bg-brand-600 text-white" : "text-ink-light hover:bg-brand-50 hover:text-brand-700"
    }`;
  const subCls = (active: boolean) =>
    `block truncate rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
      active ? "bg-brand-50 font-700 text-brand-700" : "text-ink-light hover:bg-surface hover:text-ink"
    }`;

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col gap-5 overflow-y-auto border-r border-line bg-white p-5">
      <Link href="/admin" className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
          <Leaf className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <p className="font-display text-base font-700 leading-none text-ink">EcoMulch</p>
          <p className="text-[11px] text-slate-400">Content manager</p>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        <Link href="/admin" className={linkCls(pathname === "/admin")}>
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </Link>
        <Link href="/admin/articles" className={linkCls(pathname.startsWith("/admin/articles"))}>
          <Newspaper className="h-4 w-4" /> Blog articles
        </Link>
        <Link href="/admin/settings" className={linkCls(pathname === "/admin/settings")}>
          <Settings className="h-4 w-4" /> Site settings
        </Link>

        <p className="mt-4 px-3 text-[11px] font-700 uppercase tracking-wider text-slate-400">Pages</p>
        {GROUPS.map((group) => {
          const items = pages.filter((p) => p.group === group);
          const isOpen = open[group] ?? false;
          return (
            <div key={group}>
              <button
                type="button"
                onClick={() => setOpen((o) => ({ ...o, [group]: !isOpen }))}
                aria-expanded={isOpen}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-600 transition-colors hover:bg-surface ${
                  group === activeGroup ? "text-brand-700" : "text-ink"
                }`}
              >
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                )}
                <span className="truncate">{group}</span>
                <span className="ml-auto text-[11px] text-slate-400">{items.length}</span>
              </button>
              {isOpen && (
                <div className="mb-1 ml-5 border-l border-line pl-2">
                  {items.map((p) => {
                    const href = `/admin/pages/${p.slug}`;
                    return (
                      <Link key={p.slug} href={href} className={subCls(pathname === href)}>
                        {p.title}
                      </Link>
                    );
                  })}
                  {group === "Blog" && (
                    <Link href="/admin/articles" className={subCls(pathname.startsWith("/admin/articles"))}>
                      Articles
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-line pt-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-600 text-ink-light transition-colors hover:bg-brand-50 hover:text-brand-700"
        >
          <ExternalLink className="h-4 w-4" /> View live site
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-600 text-rust-600 transition-colors hover:bg-rust-50"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </aside>
  );
}
