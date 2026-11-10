"use client";

/**
 * Breadcrumb strip that stays pinned under the site header, so visitors can
 * always see where they are and step back up a level. Optionally appends the
 * section currently on screen (large screens only), e.g.
 * Greening Urban Spaces > Transforming Urban Flower Beds > Understand the Challenge.
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";

export type SectionCrumb = { label: string; short?: string; href?: string };
export type TrackedSection = { id: string; label: string };

export function SectionCrumbs({
  items,
  sections = [],
  topId,
}: {
  items: SectionCrumb[];
  sections?: TrackedSection[];
  /** Element id the page crumb scrolls back to once a section is showing. */
  topId?: string;
}) {
  const [active, setActive] = useState<TrackedSection | null>(null);

  useEffect(() => {
    if (!sections.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 80;
      const line = header + 140;
      let current: TrackedSection | null = null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s;
      }
      setActive((prev) => (prev?.id === current?.id ? prev : current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  const back = items.find((i) => i.href)?.href ?? "/";
  const last = items.length - 1;

  return (
    <nav
      aria-label="Breadcrumb"
      className="sticky top-[var(--header-h)] z-40 border-b border-brand-100/70 bg-wash-mint/95 backdrop-blur"
    >
      <ol className="container-site flex min-h-[2.75rem] items-center gap-2 py-2 text-[0.92rem] font-800 text-brand-700 sm:gap-3 sm:text-[1rem]">
        <li className="flex">
          <Link
            href={back}
            aria-label={`Back to ${items[0]?.label ?? "previous page"}`}
            className="-ml-1 grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-brand-100"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
          </Link>
        </li>
        {items.map((c, i) => {
          const isPage = i === last;
          const label = (
            <>
              {c.short ? (
                <>
                  <span className="sm:hidden">{c.short}</span>
                  <span className="hidden sm:inline">{c.label}</span>
                </>
              ) : (
                c.label
              )}
            </>
          );
          return (
            <li key={i} className="flex min-w-0 items-center gap-2 sm:gap-3">
              {i > 0 && <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-pine-deep" strokeWidth={2.4} />}
              {isPage ? (
                active && topId ? (
                  <a href={`#${topId}`} className="truncate transition-colors hover:text-brand-500">
                    {label}
                  </a>
                ) : (
                  <span aria-current="page" className="truncate">
                    {label}
                  </span>
                )
              ) : (
                <Link href={c.href ?? "/"} className="truncate transition-colors hover:text-brand-500">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
        {active && (
          <li className="hidden min-w-0 items-center gap-3 lg:flex">
            <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-pine-deep" strokeWidth={2.4} />
            <span aria-current="location" className="truncate">
              {active.label}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
