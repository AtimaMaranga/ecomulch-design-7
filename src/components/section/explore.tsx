/**
 * Orientation pieces from the November 2026 Greening Urban Spaces revisions.
 * a plain-title intro hero, "Explore" option lists that jump to a page's
 * sections (or to other pages), numbered situation cards and statement strips.
 *
 * Mobile first: every explore list is a single column of tappable rows on
 * phones and only spreads into cards/columns from `lg` up.
 */
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import type { IconComponent } from "@/components/icons";

/* ─────────────────────────── tones ─────────────────────────── */

export type TintTone = "mint" | "cream" | "peach" | "sky" | "lilac" | "white";

/** Soft card grounds. */
export const TINT: Record<TintTone, string> = {
  mint: "bg-wash-mint",
  cream: "bg-wash-cream",
  peach: "bg-wash-peach",
  sky: "bg-wash-sky",
  lilac: "bg-wash-lilac",
  white: "bg-white",
};

/** Pastel circles behind line icons. */
export const DISC: Record<string, string> = {
  mint: "bg-disc-mint",
  peach: "bg-disc-peach",
  sky: "bg-disc-sky",
  lilac: "bg-disc-lilac",
  lime: "bg-disc-lime",
  cream: "bg-disc-cream",
};

/** Icon colours that sit on those circles. */
export const INK: Record<string, string> = {
  green: "text-brand-600",
  navy: "text-glyph-navy",
  purple: "text-glyph-purple",
  brown: "text-glyph-brown",
};

const tint = (t: string | undefined) => TINT[(t as TintTone) || "mint"] ?? TINT.mint;
const disc = (t: string | undefined) => DISC[t || "mint"] ?? DISC.mint;
const ink = (t: string | undefined) => INK[t || "green"] ?? INK.green;

/* ─────────────────────────── small parts ─────────────────────────── */

/** "Text\nmore" → a line break on large screens only. */
export function deskLines(text: string): React.ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <Fragment key={i}>
      {p}
      {i < parts.length - 1 && (
        <>
          {" "}
          <br className="hidden lg:block" />
        </>
      )}
    </Fragment>
  ));
}

/** Internal page link, in-page anchor or external link, all from one href. */
export function SmartLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/** Solid green circle with an arrow: the "go" mark on every explore option. */
export function GoArrow({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-brand-700 text-white shadow-go transition-transform duration-200 group-hover:translate-x-1 ${className}`}
    >
      <ArrowRight className="h-[55%] w-[55%]" strokeWidth={2.4} />
    </span>
  );
}

/** Uppercase green label with the short bar under it. */
export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[0.92rem] font-800 uppercase tracking-[0.02em] text-brand-600 sm:text-[1rem] xl:text-[1.1rem]">
        {children}
      </p>
      <span aria-hidden="true" className="mt-3 block h-[4px] w-16 rounded-full bg-brand-600 xl:w-[4.5rem]" />
    </div>
  );
}

/** Green rule under a section title. */
export function TitleRule({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`block h-[4px] w-[4.5rem] rounded-full bg-brand-600 xl:w-24 ${className}`} />;
}

/** Large deep-green section heading. */
export function BigTitle({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={`text-[1.85rem] font-800 leading-[1.1] tracking-[-0.02em] text-pine-deep sm:text-[2.25rem] xl:text-[2.75rem] ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────── hero ─────────────────────────── */

/**
 * Plain-title page intro: optional kicker, deep-green title, paragraphs and a
 * photo. On phones the photo follows the text as a rounded frame; from `lg`
 * it fills the right half ("fade" softens its left edge, "edge" keeps it
 * crisp) or sits as a rounded frame beside the text ("framed").
 */
export function IntroHero({
  id,
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  mobileImage,
  photo = "fade",
  mobileAspect = "aspect-[744/287]",
  framedAspect = "aspect-[793/384]",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  image: string;
  imageAlt: string;
  /** Unfaded crop for the phone frame (defaults to `image`). */
  mobileImage?: string;
  photo?: "fade" | "edge" | "framed";
  mobileAspect?: string;
  framedAspect?: string;
}) {
  const bleed = photo !== "framed";
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${
        bleed
          ? "bg-gradient-to-br from-wash-mint-from via-wash-mint-mid to-wash-mint-to"
          : "bg-gradient-to-b from-wash-mint-to to-white"
      }`}
    >
      <LeafWash />
      {bleed && (
        <div
          className={`absolute inset-y-0 right-0 hidden lg:block ${photo === "fade" ? "mask-fade-left-short w-[52%]" : "w-[50%]"}`}
        >
          <Image src={image} alt={imageAlt} fill priority sizes="50vw" className="object-cover" />
        </div>
      )}
      <div
        className={`container-site relative pb-6 pt-6 sm:pb-8 sm:pt-8 lg:py-12 ${
          bleed
            ? "lg:flex lg:min-h-[clamp(430px,33vw,560px)] lg:items-center"
            : "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.17fr)] lg:items-center lg:gap-8"
        }`}
      >
        <div className={bleed ? "lg:w-[47%] lg:pr-4" : ""}>
          {eyebrow && <Kicker className="mb-4 lg:mb-5">{eyebrow}</Kicker>}
          <h1 className="text-[clamp(1.7rem,7.6vw,2.6rem)] font-800 leading-[1.08] tracking-[-0.02em] text-pine-deep lg:text-[3rem] xl:text-[3.45rem]">
            {title}
          </h1>
          <div className="mt-3 space-y-2.5 text-[0.98rem] leading-[1.45] text-pine-deep/85 sm:space-y-3 sm:text-[1.1rem] sm:leading-[1.5] lg:mt-5 lg:space-y-4 xl:text-[1.2rem]">
            {children}
          </div>
        </div>
        {/* Phone/tablet frame */}
        <div
          className={`relative mt-5 overflow-hidden rounded-2xl shadow-photo sm:mt-6 lg:hidden ${mobileAspect}`}
        >
          <Image src={mobileImage || image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        </div>
        {!bleed && (
          <div
            className={`relative hidden overflow-hidden rounded-[1.4rem] shadow-photo lg:block ${framedAspect}`}
          >
            <Image src={image} alt={imageAlt} fill priority sizes="55vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}

/** Faint leaf in the top-right corner of pale grounds. */
function LeafWash() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 260"
      className="pointer-events-none absolute -right-8 -top-4 h-56 w-auto text-brand-600/[0.06] lg:h-80"
      fill="currentColor"
    >
      <path d="M150 8c40 40 46 112 4 156-30 32-74 40-96 34 8-60 34-148 92-190Z" />
      <path d="M70 120c-32 16-56 54-52 96 30 2 60-12 76-40 10-18 4-44-24-56Z" />
    </svg>
  );
}

/* ─────────────────────────── explore lists ─────────────────────────── */

export type ExploreOption = {
  icon: IconComponent;
  title: string;
  body?: string;
  href: string;
  /** Card ground (strip layout) or icon circle (columns layout). */
  tone?: string;
};

/**
 * "Explore the Challenge". Phones: a white card of rows; `lg`: centred
 * heading over a row of tinted cards (icon | rule | title | arrow).
 */
export function ExploreStrip({
  title,
  lede,
  options,
}: {
  title: string;
  lede?: string;
  options: ExploreOption[];
}) {
  return (
    <section className="pb-2 pt-1 lg:pb-6 lg:pt-12">
      <div className="container-site">
        <nav
          aria-label={title}
          className="rounded-2xl bg-white px-5 pb-2 pt-5 shadow-float sm:px-7 lg:bg-transparent lg:p-0 lg:shadow-none"
        >
          <h2 className="text-[1.6rem] font-800 leading-[1.15] tracking-[-0.015em] text-pine-deep sm:text-[2rem] lg:text-center lg:text-[2.6rem] xl:text-[2.9rem]">
            {title}
          </h2>
          {lede && (
            <p className="mt-2 text-[1.02rem] leading-[1.45] text-pine-deep/85 sm:text-[1.1rem] lg:mx-auto lg:mt-3 lg:max-w-[62rem] lg:text-center xl:text-[1.2rem]">
              {lede}
            </p>
          )}
          <ul className="mt-4 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-4">
            {options.map((o, i) => {
              const Icon = o.icon;
              return (
                <li key={i} className="border-t border-line lg:border-0">
                  <SmartLink
                    href={o.href}
                    className={`group flex items-center gap-4 py-3.5 lg:h-full lg:gap-0 lg:rounded-2xl lg:px-5 lg:py-7 xl:px-10 xl:py-8 ${stripTone(o.tone)}`}
                  >
                    <Icon className="h-10 w-10 shrink-0 text-brand-700 lg:h-12 lg:w-12 xl:h-[4.25rem] xl:w-[4.25rem]" strokeWidth={1.9} />
                    <span aria-hidden="true" className="mx-4 hidden h-14 w-px shrink-0 bg-pine-deep/20 lg:block xl:mx-6 xl:h-[4.5rem]" />
                    <span className="flex-1 text-[1.1rem] font-800 leading-[1.25] text-pine-deep sm:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.55rem]">
                      {o.title}
                    </span>
                    <GoArrow className="h-11 w-11 lg:ml-3 xl:h-[3.25rem] xl:w-[3.25rem]" />
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}

/** Tinted card grounds only from `lg` (phones show plain rows). */
function stripTone(t: string | undefined): string {
  switch (t) {
    case "cream":
      return "lg:bg-wash-cream lg:hover:bg-wash-cream-deep";
    case "peach":
      return "lg:bg-wash-peach lg:hover:bg-wash-peach-deep";
    default:
      return "lg:bg-wash-mint lg:hover:bg-wash-mint-deep";
  }
}

/** Circle ground for icons, applied only from `lg`. */
function discLg(t: string | undefined): string {
  switch (t) {
    case "peach":
      return "lg:bg-disc-peach";
    case "sky":
      return "lg:bg-disc-sky";
    case "lilac":
      return "lg:bg-disc-lilac";
    default:
      return "lg:bg-disc-mint";
  }
}

/** Rules between explore columns: 2 per row at `lg`, all in one row at `xl`. */
function columnCell(i: number, n: number): string {
  const lg = `${i % 2 ? "lg:border-l" : ""} ${i >= 2 ? "lg:mt-5 lg:border-t lg:pt-5" : "lg:border-t-0"}`;
  const xl = `${i > 0 ? "xl:border-l" : "xl:border-l-0"} xl:mt-0 xl:border-t-0 xl:pt-0`;
  return n > 2 ? `${lg} ${xl}` : `${i > 0 ? "lg:border-l" : ""} lg:border-t-0`;
}

function columnPad(i: number, n: number): string {
  const lg = i % 2 ? "lg:pl-6 lg:pr-0" : "lg:pl-0 lg:pr-6";
  const xl = i === 0 ? "xl:pl-0 xl:pr-5" : i === n - 1 ? "xl:pl-6 xl:pr-0" : "xl:px-6";
  return `${lg} ${xl}`;
}

/**
 * "Explore, Learn & Discover". Phones: a white card of rows (icon, title,
 * arrow); `lg`: a tinted panel of columns with icon circles, a short
 * description and the arrow in the corner.
 */
export function ExploreColumns({
  title,
  lede,
  options,
}: {
  title: string;
  lede?: string;
  options: ExploreOption[];
}) {
  return (
    <section className="pb-2 pt-1 lg:pb-4 lg:pt-2">
      <div className="container-site">
        <nav
          aria-label={title}
          className="rounded-2xl bg-white px-5 pb-2 pt-5 shadow-float sm:px-7 lg:bg-gradient-to-br lg:from-wash-mint-from lg:to-wash-mint-to lg:px-8 lg:pb-7 lg:pt-7 lg:shadow-none"
        >
          <h2 className="text-[1.6rem] font-800 leading-[1.15] tracking-[-0.015em] text-pine-deep sm:text-[2rem] lg:text-[2.4rem] xl:text-[2.7rem]">
            {title}
          </h2>
          {lede && (
            <p className="mt-2 text-[1.02rem] leading-[1.45] text-pine-deep/85 sm:text-[1.1rem] xl:text-[1.15rem]">{lede}</p>
          )}
          <ul className="mt-4 lg:mt-6 lg:grid lg:grid-cols-2 lg:border-t lg:border-pine-deep/10 lg:pt-5 xl:grid-cols-4">
            {options.map((o, i) => {
              const Icon = o.icon;
              return (
                <li key={i} className={`border-t border-line lg:border-pine-deep/15 ${columnCell(i, options.length)}`}>
                  <SmartLink
                    href={o.href}
                    className={`group flex items-center gap-4 py-3 lg:h-full lg:flex-col lg:items-stretch lg:gap-0 lg:py-1 ${columnPad(i, options.length)}`}
                  >
                    <span className="flex flex-1 items-center gap-4 lg:flex-none">
                      <span
                        className={`grid shrink-0 place-items-center rounded-full lg:h-[4.5rem] lg:w-[4.5rem] xl:h-20 xl:w-20 ${discLg(o.tone)}`}
                      >
                        <Icon className="h-9 w-9 text-brand-700 lg:h-10 lg:w-10" strokeWidth={1.9} />
                      </span>
                      <span className="flex-1 text-[1.08rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.2rem] lg:text-[1.35rem] xl:text-[1.55rem]">
                        {deskLines(o.title)}
                      </span>
                    </span>
                    {o.body && (
                      <span className="mt-4 hidden text-[1rem] leading-[1.4] text-pine-deep/85 lg:block xl:text-[1.08rem]">
                        {o.body}
                      </span>
                    )}
                    <span className="lg:mt-auto lg:flex lg:justify-end lg:pt-3">
                      <GoArrow className="h-11 w-11 lg:h-12 lg:w-12" />
                    </span>
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}

/**
 * The Greening Urban Spaces landing options: "Understanding the Challenge"
 * on its own, then the "Our Solutions" group with its sub-options.
 */
export function ExploreHub({
  title,
  lede,
  primary,
  group,
}: {
  title: string;
  lede?: string;
  primary: ExploreOption;
  group: { icon: IconComponent; title: string; body?: string; options: ExploreOption[] };
}) {
  const P = primary.icon;
  const G = group.icon;
  return (
    <section className="pb-4 pt-5 sm:pt-7 lg:pb-8 lg:pt-11">
      <div className="container-site">
        <h2 className="text-[1.65rem] font-800 leading-[1.15] tracking-[-0.015em] text-pine-deep sm:text-[2rem] lg:text-[2.5rem] xl:text-[2.8rem]">
          {title}
        </h2>
        {lede && (
          <p className="mt-2 text-[1.02rem] leading-[1.45] text-pine-deep/85 sm:text-[1.1rem] xl:text-[1.2rem]">{lede}</p>
        )}
        <div className="mt-4 grid gap-3 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.98fr)] lg:gap-4">
          <SmartLink
            href={primary.href}
            className="group relative flex items-center gap-3.5 overflow-hidden rounded-2xl bg-gradient-to-br from-wash-mint-from to-wash-mint-to px-3.5 py-4 transition-shadow hover:shadow-lift sm:p-5 lg:flex-col lg:items-start lg:gap-0 lg:p-8 xl:p-9"
          >
            <P className="h-12 w-12 shrink-0 text-brand-700 sm:h-14 sm:w-14 lg:h-[4.5rem] lg:w-[4.5rem]" strokeWidth={1.8} />
            <span className="flex flex-1 items-center gap-4 lg:mt-5 lg:w-full lg:flex-col lg:items-stretch lg:gap-0">
              <span className="flex-1">
                <span className="block text-[1.12rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.3rem] lg:text-[1.55rem] xl:text-[1.7rem]">
                  {primary.title}
                </span>
                {primary.body && (
                  <span className="mt-1 block text-[0.92rem] leading-[1.38] text-pine-deep/85 sm:text-[1.02rem] lg:mt-2 lg:max-w-[17rem] xl:text-[1.12rem]">
                    {primary.body}
                  </span>
                )}
              </span>
              <span className="lg:-mt-12 lg:flex lg:justify-end">
                <GoArrow className="h-11 w-11 lg:h-[3.25rem] lg:w-[3.25rem]" />
              </span>
            </span>
          </SmartLink>

          <div className="rounded-2xl bg-gradient-to-br from-wash-cream-from to-wash-cream-to p-2.5 sm:p-4 lg:px-4 lg:pb-4 lg:pt-5">
            <div className="flex items-center gap-3.5 px-1 pb-2.5 pt-1.5 sm:gap-4 sm:px-3 lg:px-3 lg:pb-4">
              <G className="h-12 w-12 shrink-0 text-brand-700 sm:h-14 sm:w-14 lg:h-[4.5rem] lg:w-[4.5rem]" strokeWidth={1.8} />
              <div>
                <h3 className="text-[1.12rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.3rem] lg:text-[1.55rem] xl:text-[1.7rem]">
                  {group.title}
                </h3>
                {group.body && (
                  <p className="mt-1 text-[0.92rem] leading-[1.38] text-pine-deep/85 sm:text-[1.02rem] xl:text-[1.12rem]">
                    {group.body}
                  </p>
                )}
              </div>
            </div>
            <ul className="grid gap-2.5 lg:grid-cols-2 lg:gap-3">
              {group.options.map((o, i) => {
                const Icon = o.icon;
                return (
                  <li key={i}>
                    <SmartLink
                      href={o.href}
                      className="group flex h-full items-center gap-3.5 rounded-xl bg-white/90 px-3 py-3 shadow-hair transition-shadow hover:shadow-lift sm:px-5 lg:px-5 lg:py-5"
                    >
                      <Icon className="h-11 w-11 shrink-0 text-brand-700 lg:h-14 lg:w-14" strokeWidth={1.8} />
                      <span className="flex-1">
                        <span className="block text-[1.02rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.15rem] xl:text-[1.22rem]">
                          {o.title}
                        </span>
                        {o.body && (
                          <span className="mt-0.5 block text-[0.88rem] leading-[1.36] text-pine-deep/85 sm:text-[0.98rem] xl:text-[1.02rem]">
                            {o.body}
                          </span>
                        )}
                      </span>
                      <GoArrow className="h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12" />
                    </SmartLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── section parts ─────────────────────────── */

/**
 * Section title on the left, its explanation on the right (stacked on
 * phones), separated by a thin vertical rule from `lg`.
 */
export function SplitHead({
  title,
  children,
  titleWidth = "lg:w-[44%]",
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
  titleWidth?: string;
}) {
  return (
    <div className="lg:flex lg:items-stretch lg:gap-10">
      <div className={`shrink-0 ${titleWidth}`}>
        <BigTitle>{title}</BigTitle>
        <TitleRule className="mt-4" />
      </div>
      {children && (
        <>
          <span aria-hidden="true" className="hidden w-px shrink-0 bg-pine-deep/25 lg:block" />
          <div className="mt-4 flex items-center text-[1.02rem] leading-[1.5] text-pine-deep/85 sm:text-[1.1rem] lg:mt-0 xl:text-[1.18rem]">
            <div className="space-y-3">{children}</div>
          </div>
        </>
      )}
    </div>
  );
}

/** Pale green strip: leaf icon, a thin rule and a bold green statement. */
export function StatementStrip({ icon: Icon, children }: { icon: IconComponent; children: React.ReactNode }) {
  return (
    <div className="mt-5 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-wash-mint-from to-wash-mint px-4 py-4 sm:gap-6 sm:px-7 lg:px-10">
      <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-full bg-white/60 sm:grid xl:h-[4.5rem] xl:w-[4.5rem]">
        <Icon className="h-9 w-9 text-brand-700 xl:h-10 xl:w-10" strokeWidth={1.8} />
      </span>
      <span aria-hidden="true" className="hidden h-12 w-px shrink-0 bg-brand-700/40 sm:block" />
      <p className="text-[1.02rem] font-800 leading-[1.4] text-brand-800 sm:text-[1.1rem] xl:text-[1.22rem]">{children}</p>
    </div>
  );
}

/** Pastel disc with a coloured line icon. */
export function IconDisc({
  icon: Icon,
  tone,
  color,
  className = "h-16 w-16",
  iconClassName = "h-8 w-8",
}: {
  icon: IconComponent;
  tone?: string;
  color?: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full ${disc(tone)} ${className}`}>
      <Icon className={`${ink(color)} ${iconClassName}`} strokeWidth={1.8} />
    </span>
  );
}

export { tint as tintClass };
