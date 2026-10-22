"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

/*
 * A row of cards with "Learn More" buttons. Opening one highlights the card
 * and reveals a detail panel beneath the row (beneath the card itself on
 * small screens) — the pattern used by the Curated Plants stages and the
 * Flower Beds challenges / approach steps. Icons arrive pre-rendered as
 * elements so this client component never receives functions from the server.
 */

export type ExpandTone = "mint" | "peach" | "sky" | "lilac" | "white";

export type ExpandItem = {
  key: string;
  tone: ExpandTone;
  /** Round icon badge (icon / step variants). */
  badge?: React.ReactNode;
  /** Photo (photo variant). */
  image?: string;
  imageAlt?: string;
  title: React.ReactNode;
  kicker?: React.ReactNode;
  body: React.ReactNode;
  detail: {
    image: string;
    imageAlt: string;
    title: string;
    subtitle: string;
    lead?: string;
    paras: string[];
    points: { badge: React.ReactNode; title: string; body: string }[];
    footer?: string;
  };
};

const SELECTED: Record<ExpandTone, string> = {
  mint: "border-brand-500/60 bg-[#f1f8f2]",
  peach: "border-[#efc39c] bg-[#fdf3ea]",
  sky: "border-[#a6cbe6] bg-[#eef5fb]",
  lilac: "border-[#c7adee] bg-[#f6f0fd]",
  white: "border-brand-600/60 bg-white",
};

const PANEL: Record<ExpandTone, string> = {
  mint: "bg-gradient-to-br from-[#edf7ef] to-[#f6fbf6]",
  peach: "bg-gradient-to-br from-[#fdf1e6] to-[#fdf8f2]",
  sky: "bg-gradient-to-br from-[#eaf3fb] to-[#f5f9fd]",
  lilac: "bg-gradient-to-br from-[#f3ecfc] to-[#f9f6fd]",
  white: "bg-white border border-brand-600/40",
};

export function ExpandGrid({
  items,
  variant,
  openLabel = "Learn More",
  closeLabel = "Close",
  panelClose = false,
  cols = 4,
}: {
  items: ExpandItem[];
  variant: "icon" | "photo" | "step";
  openLabel?: string;
  closeLabel?: string;
  /** Show a "Close ˄" link in the panel's top-right corner. */
  panelClose?: boolean;
  cols?: 4 | 6;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const uid = useId();
  const active = items.find((i) => i.key === open) ?? null;

  const toggle = (key: string) => setOpen((k) => (k === key ? null : key));

  const panel = (it: ExpandItem) => (
    <DetailPanel
      item={it}
      id={`${uid}-${it.key}`}
      onClose={panelClose ? () => setOpen(null) : undefined}
    />
  );

  const grid =
    variant === "step"
      ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:items-stretch lg:gap-0"
      : `grid grid-cols-1 gap-4 sm:grid-cols-2 ${cols === 6 ? "lg:grid-cols-6" : "lg:grid-cols-4"} lg:gap-3.5`;

  return (
    <div>
      <ul className={grid}>
        {items.map((it, i) => {
          const selected = it.key === open;
          return (
            <li key={it.key} className="contents">
              <div
                className={`flex flex-col rounded-lg border transition-colors duration-200 ${
                  selected
                    ? SELECTED[it.tone]
                    : variant === "step"
                      ? "border-line/70 bg-white lg:border-transparent lg:bg-transparent"
                      : "border-line/70 bg-white"
                } ${variant === "step" ? "lg:min-w-0 lg:flex-1" : ""} ${
                  variant === "photo" ? "overflow-hidden" : ""
                }`}
              >
                <Card item={it} variant={variant} />
                <div className={`mt-auto pb-4 pt-3 ${variant === "step" ? "px-2.5 xl:px-4" : "px-4"}`}>
                  <button
                    type="button"
                    onClick={() => toggle(it.key)}
                    aria-expanded={selected}
                    aria-controls={`${uid}-${it.key}`}
                    className={`mx-auto flex w-full max-w-[13rem] items-center justify-center gap-2 whitespace-nowrap rounded-md border py-2.5 font-700 transition-colors xl:gap-3 ${
                      variant === "step" ? "px-2 text-[0.86rem] xl:text-[0.95rem]" : "text-[0.95rem]"
                    } ${
                      selected
                        ? "border-brand-700 bg-brand-700 text-white hover:bg-brand-800"
                        : "border-line bg-white text-ink hover:border-brand-500 hover:text-brand-700"
                    }`}
                  >
                    {selected ? closeLabel : openLabel}
                    {selected ? (
                      <ChevronUp className="h-4 w-4" strokeWidth={2.4} />
                    ) : (
                      <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
                    )}
                  </button>
                </div>
              </div>
              {variant === "step" && i < items.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="hidden h-5 w-5 shrink-0 self-start text-brand-700 lg:mt-[48px] lg:block xl:mx-1 xl:mt-[56px] xl:h-6 xl:w-6"
                  strokeWidth={2}
                />
              )}
              {/* Small screens: the panel opens directly under its card. */}
              {selected && <div className="col-span-full lg:hidden">{panel(it)}</div>}
            </li>
          );
        })}
      </ul>
      {/* Wide screens: the panel opens under the whole row. */}
      {active && <div className="mt-3.5 hidden lg:block">{panel(active)}</div>}
    </div>
  );
}

function Card({ item, variant }: { item: ExpandItem; variant: "icon" | "photo" | "step" }) {
  if (variant === "photo") {
    return (
      <>
        {item.image && (
          <div className="relative m-2.5 mb-0 aspect-[288/144] overflow-hidden rounded-md">
            <Image
              src={item.image}
              alt={item.imageAlt ?? ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="px-5 pt-4">
          <h3 className="text-[1.15rem] font-800 leading-[1.2] text-ink">{item.title}</h3>
          <p className="mt-1.5 text-[0.92rem] leading-[1.45] text-ink-light">{item.body}</p>
        </div>
      </>
    );
  }
  return (
    <div
      className={`flex flex-col items-center pt-5 text-center ${variant === "step" ? "px-2 xl:px-4" : "px-4"}`}
    >
      {item.badge}
      <h3
        className={`mt-3 font-800 leading-[1.2] ${
          variant === "step" ? "text-[1.25rem] text-ink" : "text-[1.3rem] text-ink"
        }`}
      >
        {item.title}
      </h3>
      {item.kicker && (
        <p className="mt-1 max-w-[14rem] text-[0.98rem] font-800 leading-[1.25] text-brand-700">
          {item.kicker}
        </p>
      )}
      <p
        className={`mt-2.5 max-w-[15rem] leading-[1.45] text-ink-light ${
          variant === "step" ? "text-[0.84rem] xl:text-[0.9rem]" : "text-[0.9rem]"
        }`}
      >
        {item.body}
      </p>
    </div>
  );
}

function DetailPanel({
  item,
  id,
  onClose,
}: {
  item: ExpandItem;
  id: string;
  onClose?: () => void;
}) {
  const d = item.detail;
  const n = d.points.length;
  return (
    <section
      id={id}
      aria-label={d.title}
      className={`animate-fade-up rounded-xl px-4 py-5 sm:px-5 ${PANEL[item.tone]}`}
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] md:gap-7">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-auto md:min-h-[300px]">
          <Image
            src={d.image}
            alt={d.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 36vw"
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[1.45rem] font-800 leading-[1.2] tracking-[-0.01em] text-ink sm:text-[1.7rem]">
              {d.title}{" "}
              <span className="text-[1.1rem] font-800 text-brand-700 sm:text-[1.3rem]">
                — {d.subtitle}
              </span>
            </h3>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex shrink-0 items-center gap-1.5 pt-1.5 text-[0.95rem] font-700 text-ink transition-colors hover:text-brand-700"
              >
                Close <ChevronUp className="h-4 w-4" strokeWidth={2.4} />
              </button>
            )}
          </div>
          {d.lead && (
            <p className="mt-2 text-[0.98rem] font-800 leading-[1.35] text-ink">{d.lead}</p>
          )}
          <div className="mt-2 space-y-2.5 text-[0.95rem] leading-[1.48] text-ink-light">
            {d.paras.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul
            className={`mt-5 grid gap-y-5 ${
              n === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-3"
            }`}
          >
            {d.points.map((p, i) => (
              <li
                key={p.title}
                className={`flex gap-3 ${i > 0 ? "sm:border-l sm:border-line sm:pl-4" : ""} pr-3`}
              >
                {p.badge}
                <div>
                  <h4 className="text-[0.9rem] font-800 leading-[1.25] text-ink">{p.title}</h4>
                  <p className="mt-1 text-[0.8rem] leading-[1.42] text-ink-light">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {d.footer && (
        <p className="mt-5 border-t border-line pt-3.5 text-center text-[0.98rem] font-800 leading-[1.4] text-brand-700">
          {d.footer}
        </p>
      )}
    </section>
  );
}
