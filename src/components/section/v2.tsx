import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { IconBadge, type BadgeTone } from "@/components/section/blocks";
import type { IconComponent } from "@/components/icons";

/*
 * Layout pieces for the second round of section mockups (Say No to Bare Soil,
 * the revised Greening Urban Spaces pages and the Blog). They keep the site's
 * palette and type family, and follow the new mockups' structure: a light
 * photo-fade hero, two-tone headings, pale rounded panels and solid CTAs.
 */

/** Green half of a two-tone heading. Adapts to light/dark heroes. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="hero-accent text-brand-600">{children}</span>;
}

/* ─────────────────────────── hero ─────────────────────────── */

export type Crumb = { label: string; href?: string };

function Crumbs({ items, dark }: { items: Crumb[]; dark: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.84rem]">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2.5">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className={`transition-colors ${
                    dark ? "text-white/80 hover:text-white" : "text-ink-light hover:text-brand-600"
                  }`}
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className={`font-700 ${dark ? "text-white" : "text-ink"}`}
                >
                  {c.label}
                </span>
              )}
              {!last && (
                <ChevronRight
                  className={`h-3.5 w-3.5 ${dark ? "text-white/70" : "text-ink-light"}`}
                  strokeWidth={2.2}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * The hero used across the new mockups: copy on a pale mint ground on the
 * left, the photograph filling the right and dissolving into it. `tone="dark"`
 * gives the same geometry on a near-black green ground; `layout="cover"`
 * stretches the photo under the whole hero (Blog).
 */
export function FadeHero({
  image,
  imageAlt = "",
  imagePosition = "object-right md:object-center",
  eyebrow,
  title,
  subtitle,
  children,
  crumbs,
  tone = "light",
  layout = "split",
  textWidth = "max-w-[31.5rem]",
  minHeight = "md:min-h-[clamp(440px,40vw,600px)]",
  leafMark = false,
}: {
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Body paragraphs. */
  children?: React.ReactNode;
  crumbs?: Crumb[];
  tone?: "light" | "dark";
  layout?: "split" | "cover";
  textWidth?: string;
  minHeight?: string;
  /** Faint leaf watermark on the right (heroes without a photo). */
  leafMark?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section
      data-tone={tone}
      className={`relative isolate overflow-hidden ${
        dark
          ? "bg-[#020c04]"
          : "bg-gradient-to-br from-[#eaf5ec] via-[#f3f9f3] to-[#fbfdfb]"
      }`}
    >
      {image && layout === "split" && (
        <div className="mask-fade-left-soft relative h-60 w-full sm:h-80 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 62vw"
            className={`object-cover ${imagePosition}`}
          />
        </div>
      )}
      {image && layout === "cover" && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className={`-z-10 object-cover ${imagePosition}`}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/0" />
        </>
      )}
      {leafMark && (
        <svg
          aria-hidden="true"
          viewBox="0 0 200 260"
          className="pointer-events-none absolute -right-6 top-0 hidden h-full w-auto text-brand-600/[0.07] md:block"
          fill="currentColor"
        >
          <path d="M150 8c40 40 46 112 4 156-30 32-74 40-96 34 8-60 34-148 92-190Z" />
          <path d="M70 120c-32 16-56 54-52 96 30 2 60-12 76-40 10-18 4-44-24-56Z" />
          <path d="M120 230c18-60 28-140 30-222" stroke="currentColor" strokeWidth="5" fill="none" />
        </svg>
      )}
      <div
        className={`container-site relative flex flex-col justify-center py-10 md:py-12 ${minHeight}`}
      >
        <div className={textWidth}>
          {crumbs && <Crumbs items={crumbs} dark={dark} />}
          {eyebrow && <Eyebrow2 dark={dark}>{eyebrow}</Eyebrow2>}
          <h1
            className={`mt-4 text-[2.4rem] font-800 leading-[1.04] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.45rem] ${
              dark ? "!text-white" : "text-ink"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`mt-4 text-[1.15rem] font-800 leading-[1.3] sm:text-[1.3rem] ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {subtitle}
            </p>
          )}
          {children && (
            <div
              className={`mt-4 space-y-3.5 text-[1rem] leading-[1.5] sm:text-[1.04rem] ${
                dark ? "text-white/90" : "text-ink-light"
              }`}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Green uppercase kicker with a short rule beneath it. */
export function Eyebrow2({
  children,
  dark = false,
  rule = true,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  rule?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className={`text-[0.92rem] font-700 uppercase tracking-[0.01em] ${
          dark ? "text-[#7cd96f]" : "text-brand-700"
        }`}
      >
        {children}
      </p>
      {rule && (
        <span
          className={`mt-2.5 block h-[3px] w-10 rounded-full ${dark ? "bg-[#7cd96f]" : "bg-brand-600"}`}
        />
      )}
    </div>
  );
}

/* ─────────────────────────── headings ─────────────────────────── */

/**
 * Two-tone section heading. `eyebrow` puts the kicker + rule above it;
 * `rule` alone puts a bare rule above (as on the "Where would you like to
 * explore?" and "Two Paths" headings).
 */
export function SectionHead({
  eyebrow,
  rule = false,
  title,
  lede,
  as: Tag = "h2",
  size = "lg",
  className = "",
}: {
  eyebrow?: string;
  rule?: boolean;
  title: React.ReactNode;
  lede?: React.ReactNode;
  as?: "h2" | "h3";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow2 className="mb-3.5">{eyebrow}</Eyebrow2>}
      {!eyebrow && rule && <span className="mb-4 block h-[3px] w-12 rounded-full bg-brand-600" />}
      <Tag
        className={`font-800 tracking-[-0.015em] text-ink ${
          size === "lg"
            ? "text-[1.85rem] leading-[1.12] sm:text-[2.3rem]"
            : "text-[1.5rem] leading-[1.18] sm:text-[1.8rem]"
        }`}
      >
        {title}
      </Tag>
      {lede && (
        <div className="mt-2.5 max-w-[60rem] space-y-2 text-[1rem] leading-[1.5] text-ink-light sm:text-[1.05rem]">
          {lede}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── surfaces ─────────────────────────── */

const PANEL = {
  mint: "bg-gradient-to-br from-[#edf7ef] to-[#f6fbf6]",
  sky: "bg-gradient-to-br from-[#eaf3fb] to-[#f5f9fd]",
  peach: "bg-gradient-to-br from-[#fdf1e6] to-[#fdf8f2]",
  lilac: "bg-gradient-to-br from-[#f3ecfc] to-[#f9f6fd]",
  white: "bg-white border border-line",
} as const;
export type PanelTone = keyof typeof PANEL;

/** Pale rounded panel, inset to the header margins. */
export function Panel({
  tone = "mint",
  children,
  className = "",
  inner = "",
}: {
  tone?: PanelTone;
  children: React.ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <div className={`container-site ${className}`}>
      <div className={`rounded-xl px-5 py-7 sm:px-7 ${PANEL[tone]} ${inner}`}>{children}</div>
    </div>
  );
}

export function panelClass(tone: PanelTone) {
  return PANEL[tone];
}

/* ─────────────────────────── buttons ─────────────────────────── */

const SOLID = {
  brand: "bg-brand-600 hover:bg-brand-700 text-white",
  rust: "bg-rust-500 hover:bg-rust-600 text-white",
};

/** Solid CTA. `whatsapp` adds the WhatsApp glyph before the label. */
export function Cta({
  href,
  children,
  accent = "brand",
  whatsapp = false,
  external,
  icon = "arrow",
  size = "md",
  block = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  accent?: "brand" | "rust";
  whatsapp?: boolean;
  external?: boolean;
  icon?: "arrow" | "down" | "none";
  size?: "md" | "lg";
  block?: boolean;
  className?: string;
}) {
  const ext = external ?? (whatsapp || /^https?:/.test(href));
  const cls = `group/cta inline-flex items-center justify-center gap-3 rounded-md font-700 shadow-sm transition-colors ${
    SOLID[accent]
  } ${size === "lg" ? "py-4 text-[1.08rem]" : "py-3 text-[0.98rem]"} ${
    block ? "w-full px-4" : size === "lg" ? "w-fit px-7" : "w-fit px-6"
  } ${className}`;
  const inner = (
    <>
      {whatsapp && <WhatsAppIcon className="h-6 w-6 shrink-0" />}
      <span className={block ? "lg:whitespace-nowrap" : ""}>{children}</span>
      {icon === "arrow" && (
        <ArrowRight
          className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover/cta:translate-x-1"
          strokeWidth={2.2}
        />
      )}
      {icon === "down" && (
        <ArrowRight className="h-5 w-5 shrink-0 rotate-90" strokeWidth={2.2} />
      )}
    </>
  );
  return ext ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Pale call-to-action strip: heading + line of copy on the left, one solid button on the right. */
export function CtaStrip({
  title,
  body,
  cta,
  tone = "mint",
  titleTone = "brand",
  className = "",
}: {
  title: React.ReactNode;
  body: React.ReactNode;
  cta: React.ReactNode;
  tone?: PanelTone;
  titleTone?: "brand" | "ink";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-5 rounded-xl px-5 py-6 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-10 ${PANEL[tone]} ${className}`}
    >
      <div className="max-w-[44rem]">
        <h3
          className={`text-[1.45rem] font-800 leading-[1.2] tracking-[-0.01em] sm:text-[1.65rem] ${
            titleTone === "brand" ? "text-brand-700" : "text-ink"
          }`}
        >
          {title}
        </h3>
        <div className="mt-2 text-[0.92rem] leading-[1.5] text-ink-light">{body}</div>
      </div>
      <div className="shrink-0">{cta}</div>
    </div>
  );
}

/* ─────────────────────────── cards ─────────────────────────── */

const CARD_SHADOW =
  "shadow-[0_1px_3px_rgba(12,40,82,0.06),0_6px_18px_-8px_rgba(12,40,82,0.12)]";

/**
 * Photo card with a round badge overlapping the photo's lower edge — left
 * aligned (section landings) or centred (problem / movement cards).
 */
export function BadgeCard({
  image,
  imageAlt,
  icon,
  tone,
  align = "left",
  aspect = "aspect-[467/242]",
  badgeSize = "lg",
  surface = "white",
  insetPhoto = false,
  children,
  className = "",
}: {
  image: string;
  imageAlt: string;
  icon: IconComponent;
  tone: BadgeTone;
  align?: "left" | "center";
  aspect?: string;
  badgeSize?: "sm" | "md" | "lg";
  surface?: "white" | PanelTone;
  /** Photo sits inside the card with a margin and rounded corners. */
  insetPhoto?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const size = {
    sm: { box: "h-[58px] w-[58px] -bottom-7", icon: "h-7 w-7", pad: "pt-10" },
    md: { box: "h-[76px] w-[76px] -bottom-9", icon: "h-9 w-9", pad: "pt-12" },
    lg: { box: "h-[96px] w-[96px] -bottom-11", icon: "h-11 w-11", pad: "pt-14" },
  }[badgeSize];
  const pos = align === "center" ? "left-1/2 -translate-x-1/2" : "left-6";
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl ${
        surface === "white" ? `bg-white ${CARD_SHADOW}` : PANEL[surface]
      } ${className}`}
    >
      <div className="relative">
        <div
          className={`relative overflow-hidden ${aspect} ${
            insetPhoto ? "m-3.5 mb-0 rounded-lg" : ""
          }`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <IconBadge
          icon={icon}
          tone={tone}
          ring
          className={`absolute ${pos} ${size.box}`}
          iconClassName={size.icon}
        />
      </div>
      <div
        className={`flex flex-1 flex-col px-5 pb-6 sm:px-7 ${size.pad} ${
          align === "center" ? "items-center text-center" : ""
        }`}
      >
        {children}
      </div>
    </article>
  );
}

/** A row of icon + title + text items separated by hairlines. */
export function IconRow({
  items,
  cols = 3,
  layout = "side",
  className = "",
}: {
  items: { icon: IconComponent; tone: BadgeTone; title: string; body: React.ReactNode }[];
  cols?: 3 | 4 | 5;
  /** "side" puts the badge left of the text; "stack" centres it above. */
  layout?: "side" | "stack";
  className?: string;
}) {
  const grid = { 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4", 5: "sm:grid-cols-3 lg:grid-cols-5" }[cols];
  return (
    <ul className={`grid gap-y-7 ${grid} ${className}`}>
      {items.map((it, i) => (
        <li
          key={it.title}
          className={`${i > 0 ? "md:border-l md:border-line" : ""} ${
            layout === "side" ? "flex gap-4 md:px-5 md:first:pl-0" : "flex flex-col items-center px-4 text-center"
          }`}
        >
          <IconBadge
            icon={it.icon}
            tone={it.tone}
            className={layout === "side" ? "h-[60px] w-[60px]" : "h-[72px] w-[72px]"}
            iconClassName={layout === "side" ? "h-7 w-7" : "h-9 w-9"}
          />
          <div className={layout === "stack" ? "mt-3" : ""}>
            <h3 className="text-[1.02rem] font-800 leading-[1.25] text-ink">{it.title}</h3>
            <div className="mt-1.5 text-[0.88rem] leading-[1.45] text-ink-light">{it.body}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Numbered disc used on the "How it works" rows and response cards. */
export function NumberDisc({
  n,
  tone = "mint",
  solid = false,
  className = "",
}: {
  n: string;
  tone?: "mint" | "peach" | "sky";
  solid?: boolean;
  className?: string;
}) {
  const soft = {
    mint: "bg-pastel-mint text-brand-700",
    peach: "bg-pastel-peach text-rust-600",
    sky: "bg-pastel-sky text-ink",
  }[tone];
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-800 ${
        solid ? "bg-brand-700 text-white" : soft
      } ${className}`}
    >
      {n}
    </span>
  );
}

/** Location note that closes the flower-bed and mulching pages. */
export function AreaNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-site mt-10 flex items-center gap-4 text-[0.92rem] text-ink-light">
      <span className="hidden h-px flex-1 bg-line md:block" />
      <p className="flex items-center gap-3 text-center">{children}</p>
      <span className="hidden h-px flex-1 bg-line md:block" />
    </div>
  );
}
