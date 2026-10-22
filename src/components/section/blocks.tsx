import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Leaf, Users } from "lucide-react";
import type { IconComponent } from "@/components/icons";

/*
 * Building blocks for the Recycling Green Waste and Greening Urban Spaces
 * pages. Everything here reuses the Who We Are vocabulary — the card shadow
 * and outlined CTA from the pillar cards, the rounded tint panel from "Our
 * Early Experiment", the 0.95rem / 1.45 body copy, and the navy + green rule
 * section titles (SectionTitle) — so the three sections read as one site.
 */

/* ─────────────────────────── tones ─────────────────────────── */

export type SoftTone = "mint" | "lime" | "peach" | "sky" | "rose" | "lilac";
export type SolidTone = "brand" | "rust" | "olive" | "slate" | "amber" | "clay";

const SOFT: Record<SoftTone, string> = {
  mint: "bg-pastel-mint text-brand-600",
  lime: "bg-pastel-lime text-brand-600",
  peach: "bg-pastel-peach text-rust-600",
  sky: "bg-pastel-sky text-ink",
  rose: "bg-pastel-rose text-[#c4374a]",
  lilac: "bg-pastel-lilac text-[#6b3fc0]",
};

const SOLID: Record<SolidTone, string> = {
  brand: "bg-brand-600 text-white",
  rust: "bg-rust-500 text-white",
  olive: "bg-accent-olive text-white",
  slate: "bg-accent-slate text-white",
  amber: "bg-accent-amber text-white",
  clay: "bg-accent-clay text-white",
};

export type BadgeTone = { soft: SoftTone } | { solid: SolidTone };

function toneClass(tone: BadgeTone) {
  return "soft" in tone ? SOFT[tone.soft] : SOLID[tone.solid];
}

/** Round icon badge — soft pastel or solid colour. */
export function IconBadge({
  icon: Icon,
  tone,
  className = "h-[72px] w-[72px]",
  iconClassName = "h-9 w-9",
  ring = false,
}: {
  icon: IconComponent;
  tone: BadgeTone;
  className?: string;
  iconClassName?: string;
  /** White ring, for badges that overlap a photo. */
  ring?: boolean;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full ${toneClass(tone)} ${
        ring ? "border-[5px] border-white shadow-[0_4px_12px_-4px_rgba(12,40,82,0.3)]" : ""
      } ${className}`}
    >
      <Icon className={iconClassName} strokeWidth={1.9} />
    </span>
  );
}

/* ─────────────────────────── layout ─────────────────────────── */

/** The rounded, pale-green inset panel used on the Who We Are sub-pages. */
export function TintPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="container-site">
      <div className={`rounded-xl bg-surface-tint px-5 py-7 sm:px-8 lg:py-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}

/** Body copy at the Who We Are reading size. */
export function Copy({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[64rem] space-y-4 text-[0.95rem] leading-[1.45] text-ink-light ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────── buttons ─────────────────────────── */

const OUTLINE = {
  brand: "border-brand-500 text-brand-600 hover:bg-brand-50",
  rust: "border-rust-500 text-rust-600 hover:bg-rust-50",
};

/** Outlined CTA — identical to the Who We Are pillar-card button. */
export function OutlineButton({
  href,
  children,
  accent = "brand",
  external = false,
  icon,
  compact = false,
}: {
  href: string;
  children: React.ReactNode;
  accent?: "brand" | "rust";
  external?: boolean;
  icon?: React.ReactNode;
  /** Slightly smaller type, for long labels that must stay on one line. */
  compact?: boolean;
}) {
  const className = `group/btn inline-flex w-fit items-center rounded-[4px] border-[1.5px] px-4 py-[7px] font-700 transition-colors ${
    compact ? "gap-3 text-[0.86rem] lg:whitespace-nowrap" : "gap-4 text-[0.95rem]"
  } ${OUTLINE[accent]}`;
  const inner = (
    <>
      {icon}
      {children}
      <ArrowRight
        className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1"
        strokeWidth={2.2}
      />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

/** Solid brand CTA, for the primary action of a panel. */
export function SolidButton({
  href,
  children,
  external = false,
  icon,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  icon?: React.ReactNode;
  className?: string;
}) {
  const cls = `group/btn inline-flex w-fit items-center justify-center gap-3 rounded-[4px] bg-brand-600 px-5 py-2.5 text-[0.95rem] font-700 text-white shadow-sm transition-colors hover:bg-brand-700 ${className}`;
  const inner = (
    <>
      {icon}
      {children}
      <ArrowRight
        className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1"
        strokeWidth={2.2}
      />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* ─────────────────────────── cards ─────────────────────────── */

const CARD =
  "group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(12,40,82,0.06),0_6px_18px_-8px_rgba(12,40,82,0.12)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(12,40,82,0.08),0_16px_32px_-14px_rgba(12,40,82,0.22)]";

const KICKER = { brand: "text-brand-600", rust: "text-rust-600" };

/**
 * Section-landing card: photo, an icon badge overlapping its lower edge, then
 * title, coloured kicker, body and the outlined CTA.
 */
export function FeatureCard({
  image,
  imageAlt,
  icon,
  badge,
  accent = "brand",
  title,
  kicker,
  body,
  chips,
  cta,
  href,
}: {
  image: string;
  imageAlt: string;
  icon: IconComponent;
  badge: BadgeTone;
  accent?: "brand" | "rust";
  title: string;
  kicker?: string;
  body: string;
  chips?: { label: string; accent: "brand" | "rust" }[];
  cta: string;
  href: string;
}) {
  return (
    <article className={CARD}>
      <div className="relative">
        <div className="relative aspect-[530/215] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-right transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <IconBadge
          icon={icon}
          tone={badge}
          ring
          className="absolute -bottom-10 left-6 h-[84px] w-[84px]"
          iconClassName="h-10 w-10"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-14 sm:px-7">
        <h2 className="text-[1.5rem] font-700 leading-[1.18] tracking-[-0.01em] text-ink">
          {title}
        </h2>
        {kicker && (
          <p className={`mt-2.5 text-[1.02rem] font-700 leading-[1.35] ${KICKER[accent]}`}>
            {kicker}
          </p>
        )}
        <p className="mt-3 flex-1 text-[0.92rem] leading-[1.55] text-ink-light">{body}</p>
        {chips && (
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {chips.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5 text-[0.84rem] text-ink">
                <Leaf className={`h-4 w-4 ${KICKER[c.accent]}`} strokeWidth={2.2} />
                {c.label}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <OutlineButton href={href} accent={accent}>
            {cta}
          </OutlineButton>
        </div>
      </div>
    </article>
  );
}

/** Photo card with a title and short description (optionally a badge and kicker). */
export function ImageCard({
  image,
  imageAlt,
  title,
  kicker,
  body,
  badge,
  aspect = "aspect-[230/120]",
  surface = "white",
}: {
  image: string;
  imageAlt: string;
  title: string;
  kicker?: string;
  body: React.ReactNode;
  badge?: { icon: IconComponent; tone: BadgeTone };
  aspect?: string;
  surface?: "white" | "sand" | "none";
}) {
  const shell =
    surface === "none"
      ? "flex flex-col"
      : `${CARD} ${surface === "sand" ? "!bg-pastel-sand" : ""}`;
  // Text clears the badge when there is one.
  const textPad =
    surface === "none"
      ? badge
        ? "pt-10"
        : "pt-3.5"
      : `px-4 pb-5 ${badge ? "pt-10" : "pt-4"}`;
  return (
    <article className={shell}>
      <div className="relative">
        <div
          className={`relative overflow-hidden ${aspect} ${surface === "none" ? "rounded-lg" : ""}`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-right transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        {badge && (
          <IconBadge
            icon={badge.icon}
            tone={badge.tone}
            ring
            className="absolute -bottom-7 left-4 h-[60px] w-[60px]"
            iconClassName="h-7 w-7"
          />
        )}
      </div>
      <div className={`flex flex-1 flex-col ${textPad}`}>
        <h3
          className={`text-[1.05rem] font-700 leading-[1.25] ${
            kicker ? "text-brand-600" : "text-ink"
          }`}
        >
          {title}
        </h3>
        {kicker && (
          <p className="mt-1.5 text-[0.9rem] font-700 leading-[1.3] text-ink">{kicker}</p>
        )}
        <div className="mt-2 text-[0.85rem] leading-[1.45] text-ink-light">{body}</div>
      </div>
    </article>
  );
}

/* ─────────────────────────── icon rows ─────────────────────────── */

/**
 * Four (or five) icon columns separated by hairlines — the same pattern as
 * the Our Why benefits row, left-aligned with a title and short description.
 */
export function IconColumns({
  items,
}: {
  items: { icon: IconComponent; tone: BadgeTone; title: string; body: string }[];
}) {
  return (
    <ul className="grid gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <li
          key={it.title}
          className={`lg:pr-4 ${i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""}`}
        >
          <IconBadge icon={it.icon} tone={it.tone} />
          <h3 className="mt-4 max-w-[13rem] text-[1.08rem] font-700 leading-[1.22] text-brand-600">
            {it.title}
          </h3>
          <p className="mt-2 max-w-[15rem] text-[0.85rem] leading-[1.45] text-ink-light">
            {it.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Centred steps joined by arrows on wide screens. */
export function StepFlow({
  steps,
}: {
  steps: { icon: IconComponent; tone: BadgeTone; title: string; body: string }[];
}) {
  const cols = steps.length > 4 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <ol className={`grid gap-x-6 gap-y-9 ${cols} lg:flex lg:items-start lg:gap-0`}>
      {steps.map((s, i) => (
        <li key={s.title} className="contents">
          <div className="flex flex-col items-center text-center lg:flex-1 lg:px-1">
            <IconBadge
              icon={s.icon}
              tone={s.tone}
              className="h-[84px] w-[84px]"
              iconClassName="h-10 w-10"
            />
            <h3 className="mt-3.5 text-[1.15rem] font-700 text-ink">{s.title}</h3>
            <p className="mt-1.5 max-w-[12.5rem] text-[0.85rem] leading-[1.42] text-ink-light">
              {s.body}
            </p>
          </div>
          {i < steps.length - 1 && (
            <ArrowRight
              aria-hidden="true"
              className="hidden h-6 w-6 shrink-0 text-brand-600 lg:mt-[30px] lg:block"
              strokeWidth={2}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

/* ─────────────────────────── bands ─────────────────────────── */

/**
 * Dark closing band: copy on the left, the photo dissolving in on the right,
 * one white CTA. Sits in the same inset container as the tint panels.
 */
export function CtaBand({
  image,
  imageAlt = "",
  eyebrow,
  icon,
  title,
  body,
  cta,
}: {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  icon?: IconComponent;
  title: string;
  body: string;
  cta: { label: string; href: string; external?: boolean; leading?: React.ReactNode };
}) {
  const Icon = icon;
  const btn =
    "group/btn inline-flex w-fit items-center gap-3 rounded-[4px] bg-white px-5 py-3 text-[0.95rem] font-700 text-brand-700 shadow-sm transition-colors hover:bg-brand-50";
  const inner = (
    <>
      {cta.leading}
      {cta.label}
      <ArrowRight
        className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1"
        strokeWidth={2.2}
      />
    </>
  );
  return (
    <div className="container-site">
      <div className="relative isolate overflow-hidden rounded-xl bg-forest">
        <div className="mask-fade-left absolute inset-0 -z-10 opacity-60 md:left-[38%]">
          <Image src={image} alt={imageAlt} fill sizes="60vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/80 to-forest/10 md:hidden" />
        <div className="flex flex-col gap-6 px-6 py-7 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex items-start gap-5">
            {Icon && (
              <span className="hidden h-[76px] w-[76px] shrink-0 place-items-center rounded-full border-2 border-white/80 text-white sm:grid">
                <Icon className="h-10 w-10" strokeWidth={1.8} />
              </span>
            )}
            <div className="max-w-[31rem]">
              {eyebrow && (
                <p className="text-[0.78rem] font-700 uppercase tracking-[0.04em] text-white/85">
                  {eyebrow}
                </p>
              )}
              <h2 className="mt-1 text-[1.45rem] font-700 leading-[1.2] !text-white sm:text-[1.6rem]">
                {title}
              </h2>
              <p className="mt-2.5 text-[0.88rem] leading-[1.45] text-white/85">{body}</p>
            </div>
          </div>
          {cta.external ? (
            <a href={cta.href} target="_blank" rel="noopener noreferrer" className={`${btn} shrink-0`}>
              {inner}
            </a>
          ) : (
            <Link href={cta.href} className={`${btn} shrink-0`}>
              {inner}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * People · Plants · A Greener Tomorrow — the brand line that closes every page
 * in these two sections.
 */
export function ValuesStrip() {
  const items = [
    { icon: Users, label: "People" },
    { icon: Leaf, label: "Plants" },
    { icon: Globe, label: "A Greener Tomorrow" },
  ];
  return (
    <aside aria-label="EcoMulch values" className="mt-16 border-t border-line bg-surface-crumb">
      <div className="container-site flex flex-col items-center gap-5 py-7 md:flex-row md:justify-between">
        <ul className="flex flex-wrap items-center justify-center gap-y-3">
          {items.map((it, i) => (
            <li
              key={it.label}
              className={`flex items-center gap-2.5 px-4 text-[0.95rem] text-ink sm:px-6 ${
                i === 0 ? "sm:pl-0" : "border-l border-line"
              }`}
            >
              <it.icon className="h-7 w-7 text-brand-600" strokeWidth={1.8} />
              {it.label}
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-4 text-center text-[0.92rem] text-brand-600">
          <span className="hidden h-px w-8 bg-brand-500 md:block" />
          From Organic Resources to Thriving Urban Spaces
        </p>
      </div>
    </aside>
  );
}
