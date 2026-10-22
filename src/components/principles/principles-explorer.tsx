"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { resolveIcon } from "@/lib/content/icon-registry";
import type { IconComponent } from "@/components/icons";

export type PrincipleItem = {
  label: string;
  subtitle: string;
  icon: string;
  title: string;
  body: string;
};

export function PrinciplesExplorer({ items }: { items: PrincipleItem[] }) {
  const principles = items.map((p, i) => ({
    ...p,
    n: String(i + 1).padStart(2, "0"),
    icon: resolveIcon(p.icon) as unknown as IconComponent,
  }));
  const [active, setActive] = useState(0);
  if (principles.length === 0) return null;
  const current = principles[Math.min(active, principles.length - 1)];
  const ActiveIcon = current.icon;
  const last = principles.length - 1;

  const go = (dir: -1 | 1) =>
    setActive((i) => Math.min(last, Math.max(0, i + dir)));

  return (
    <div>
      {/* 12 tiles */}
      <div
        role="tablist"
        aria-label="Sustainable Urban Greening Principles"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 md:gap-[14px]"
      >
        {principles.map((p, i) => {
          const selected = i === active;
          const Icon = p.icon;
          return (
            <button
              key={p.n}
              type="button"
              role="tab"
              id={`principle-tab-${p.n}`}
              aria-selected={selected}
              aria-controls="principle-panel"
              onClick={() => setActive(i)}
              className={`group relative flex min-h-[158px] flex-col items-center rounded-md border px-3 pb-4 pt-3 text-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                selected
                  ? "border-brand-500 bg-brand-50 [--icon-bg:#eef6ef]"
                  : "border-line bg-white hover:border-brand-300 hover:bg-brand-50/50"
              }`}
            >
              <span className="absolute left-4 top-3.5 text-[1.1rem] font-700 text-brand-600">
                {p.n}
              </span>
              <Icon
                className="mt-0.5 h-[54px] w-[54px] text-brand-600 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
              <span className="mt-2 text-[1.06rem] font-700 leading-tight text-ink">
                {p.label}
              </span>
              <span className="mt-1.5 max-w-[9.6rem] text-[0.84rem] leading-[1.3] text-ink-light">
                {p.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        id="principle-panel"
        role="tabpanel"
        aria-labelledby={`principle-tab-${current.n}`}
        className="mt-3.5 rounded-md border border-line bg-surface-tint px-5 py-5 sm:px-8 sm:py-5"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-0">
          <div className="flex shrink-0 items-center justify-center sm:w-[160px] sm:border-r sm:border-line sm:pr-6">
            <span className="grid h-[108px] w-[108px] place-items-center rounded-full border border-line bg-white">
              <ActiveIcon
                key={current.n}
                className="h-[70px] w-[70px] animate-fade-up text-brand-600"
                strokeWidth={1.7}
              />
            </span>
          </div>

          <div className="flex-1 sm:pl-6">
            <div key={current.n} className="animate-fade-up">
              <h3 className="text-[1.3rem] font-700 leading-snug text-ink">
                <span className="mr-1.5">{current.n}.</span> {current.title}
              </h3>
              <p className="mt-2.5 max-w-[40rem] text-[0.98rem] leading-[1.42] text-ink-light">
                {current.body}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 items-center border-t border-line pt-3">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={active === 0}
                className="inline-flex items-center gap-3 justify-self-start text-[0.95rem] text-ink-light transition-colors hover:text-brand-600 disabled:cursor-default disabled:opacity-60 disabled:hover:text-ink-light"
              >
                <ArrowLeft className="h-5 w-5 text-brand-600" strokeWidth={2} />
                Previous
              </button>
              <span className="justify-self-center text-[0.95rem] tabular-nums text-ink">
                {current.n} of {principles.length}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={active === last}
                className="inline-flex items-center gap-3 justify-self-end text-[0.95rem] font-600 text-brand-600 transition-colors hover:text-brand-700 disabled:cursor-default disabled:font-400 disabled:text-slate-400"
              >
                Next
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
