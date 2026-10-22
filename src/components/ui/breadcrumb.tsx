import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-200/70 bg-white">
      <ol className="container-page flex flex-wrap items-center gap-1.5 py-3.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="text-slate-500 transition-colors hover:text-brand-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? "font-medium text-brand-600" : "text-slate-500"}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 text-slate-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
