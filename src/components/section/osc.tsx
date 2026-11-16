/**
 * Building blocks for the Organic Soil Cover pages (November 2026 mockups),
 * also used by the one-page Indoor & Patio Plants and Flower Beds rebuilds:
 * numbered panels, product cards, the five-step ordering process, step flows,
 * product information cards, photo grids and the "What next?" bar.
 *
 * Mobile first: grids collapse to single-column rows, the ordering process
 * becomes an accordion and button pairs stack.
 */
import Image from "next/image";
import { ArrowRight, ChevronDown, ShoppingCart } from "lucide-react";
import type { IconComponent } from "@/components/icons";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { IconDisc, SmartLink } from "./explore";

/* ─────────────────────────── text helpers ─────────────────────────── */

export const BODY = "text-[1rem] leading-[1.5] text-pine-deep/85 sm:text-[1.06rem] xl:text-[1.12rem]";
export const H2 =
  "text-[1.65rem] font-800 leading-[1.12] tracking-[-0.02em] text-pine-deep sm:text-[2rem] xl:text-[2.45rem]";
export const H3 = "text-[1.2rem] font-800 leading-[1.2] tracking-[-0.01em] text-pine-deep sm:text-[1.35rem] xl:text-[1.5rem]";

/* ─────────────────────────── buttons ─────────────────────────── */

/** Solid green pill with an optional leading WhatsApp or cart mark. */
export function GoButton({
  href,
  children,
  lead,
  block = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  lead?: "whatsapp" | "cart" | "none";
  /** Full width on phones. */
  block?: boolean;
  className?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-full bg-brand-600 px-6 py-3 text-center text-[1rem] font-800 leading-[1.2] text-white shadow-go transition-colors hover:bg-brand-700 sm:px-7 sm:text-[1.05rem] ${
        block ? "w-full sm:w-auto" : ""
      } ${className}`}
    >
      {lead === "whatsapp" && <WhatsAppIcon className="h-6 w-6 shrink-0" />}
      {lead === "cart" && <ShoppingCart className="h-5 w-5 shrink-0" strokeWidth={2.2} />}
      <span>{children}</span>
      <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
    </SmartLink>
  );
}

/** Outlined menu button listing related pages ("Explore Other Mulches"). */
export function MenuButton({
  label,
  icon: Icon,
  items,
}: {
  label: string;
  icon?: IconComponent;
  items: { label: string; href: string }[];
}) {
  return (
    <details className="group/menu relative">
      <summary className="flex cursor-pointer list-none items-center justify-center gap-3 rounded-full border-2 border-brand-600 bg-white px-5 py-[0.7rem] text-center text-[1rem] font-800 leading-[1.2] text-brand-700 transition-colors hover:bg-wash-mint sm:text-[1.05rem] [&::-webkit-details-marker]:hidden">
        {Icon && <Icon className="hidden h-6 w-6 shrink-0 sm:block" strokeWidth={1.9} />}
        <span>{label}</span>
        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open/menu:rotate-180" strokeWidth={2.4} />
      </summary>
      <ul className="absolute bottom-full left-0 right-0 z-20 mb-2 overflow-hidden rounded-2xl border border-line bg-white py-1 shadow-float sm:bottom-auto sm:top-full sm:mb-0 sm:mt-2">
        {items.map((it) => (
          <li key={it.href}>
            <SmartLink
              href={it.href}
              className="flex items-center justify-between gap-3 px-5 py-3 text-[1rem] font-700 text-pine-deep transition-colors hover:bg-wash-mint hover:text-brand-700"
            >
              {it.label}
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} />
            </SmartLink>
          </li>
        ))}
      </ul>
    </details>
  );
}

/* ─────────────────────────── page heads ─────────────────────────── */

/** Title with the green rule, for pages without a hero photo. */
export function PlainHead({
  eyebrow,
  title,
  rule = true,
  as: Tag = "h1",
  children,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  rule?: boolean;
  as?: "h1" | "h2";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <>
          <p className="text-[0.92rem] font-800 uppercase tracking-[0.02em] text-brand-600 sm:text-[1rem] xl:text-[1.1rem]">
            {eyebrow}
          </p>
          <span aria-hidden="true" className="mb-4 mt-3 block h-1 w-16 rounded-full bg-brand-600 xl:w-[4.5rem]" />
        </>
      )}
      <Tag className="text-[clamp(1.75rem,7.6vw,2.6rem)] font-800 leading-[1.08] tracking-[-0.02em] text-pine-deep lg:text-[3rem] xl:text-[3.3rem]">
        {title}
      </Tag>
      {rule && <span aria-hidden="true" className="mt-3 block h-1.5 w-24 rounded-full bg-brand-600 xl:w-28" />}
      {children && <div className={`mt-4 space-y-3 ${BODY}`}>{children}</div>}
    </div>
  );
}

/** Section heading with a short line under it. */
export function SectionLead({
  title,
  lede,
  className = "",
  green = false,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
  green?: boolean;
}) {
  return (
    <div className={className}>
      <h2 className={`${H2} ${green ? "!text-brand-700" : ""}`}>{title}</h2>
      {lede && <div className={`mt-2 space-y-3 ${BODY}`}>{lede}</div>}
    </div>
  );
}

/* ─────────────────────────── numbered panels ─────────────────────────── */

const NUM: Record<string, string> = {
  mint: "bg-disc-mint text-brand-700",
  cream: "bg-disc-cream text-glyph-amber",
  solid: "bg-brand-700 text-white",
};

/** "01 | Title" header used on the response pages. */
export function NumberedHead({
  num,
  tone = "mint",
  title,
  children,
  size = "lg",
}: {
  num: string;
  tone?: "mint" | "cream" | "solid";
  title: React.ReactNode;
  children?: React.ReactNode;
  size?: "lg" | "md";
}) {
  return (
    <div className="flex gap-4 sm:gap-6">
      <span
        className={`grid shrink-0 place-items-center rounded-full font-800 ${NUM[tone]} ${
          size === "lg"
            ? "h-12 w-12 text-[1.25rem] sm:h-16 sm:w-16 sm:text-[1.7rem]"
            : "h-10 w-10 text-[1.15rem] sm:h-12 sm:w-12 sm:text-[1.4rem]"
        }`}
      >
        {num}
      </span>
      <span aria-hidden="true" className="w-px shrink-0 self-stretch bg-pine-deep/25" />
      <div className="min-w-0 flex-1">
        <h2
          className={`font-800 leading-[1.15] tracking-[-0.015em] text-pine-deep ${
            size === "lg" ? "text-[1.4rem] sm:text-[1.8rem] xl:text-[2.2rem]" : "text-[1.3rem] sm:text-[1.6rem] xl:text-[1.9rem]"
          }`}
        >
          {title}
        </h2>
        {children && <div className={`mt-2 space-y-3 ${BODY}`}>{children}</div>}
      </div>
    </div>
  );
}

/** Icon disc | rule | title + text: the challenge factor cards. */
export function FactorCard({
  icon,
  tone = "mint",
  color = "green",
  title,
  children,
  surface = "mint",
}: {
  icon: IconComponent;
  tone?: string;
  color?: string;
  title: string;
  children: React.ReactNode;
  surface?: "mint" | "cream" | "white";
}) {
  const bg = surface === "cream" ? "bg-wash-cream" : surface === "white" ? "bg-white shadow-hair" : "bg-wash-mint";
  return (
    <article className={`flex items-center gap-4 rounded-2xl p-4 sm:gap-6 sm:p-6 ${bg}`}>
      <IconDisc
        icon={icon}
        tone={tone}
        color={color}
        className="h-16 w-16 sm:h-20 sm:w-20 xl:h-24 xl:w-24"
        iconClassName="h-8 w-8 sm:h-10 sm:w-10 xl:h-11 xl:w-11"
      />
      <span aria-hidden="true" className="w-px shrink-0 self-stretch bg-pine-deep/25" />
      <div>
        <h3 className={H3}>{title}</h3>
        <div className={`mt-1.5 ${BODY}`}>{children}</div>
      </div>
    </article>
  );
}

/* ─────────────────────────── product cards ─────────────────────────── */

export type ProductCardItem = {
  image: string;
  imageAlt: string;
  title: string;
  body: string;
  href?: string;
};

/**
 * Photo cards: phones show a row with a thumbnail; from `md` they become
 * columns with the photo on top. Cards with a link are wholly clickable.
 */
export function ProductCards({ items, cols = 4 }: { items: ProductCardItem[]; cols?: 3 | 4 }) {
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 lg:gap-4 ${cols === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map((it, i) => {
        const inner = (
          <>
            <div className="relative h-24 w-28 shrink-0 self-start overflow-hidden rounded-xl sm:aspect-[16/10] sm:h-auto sm:w-full">
              <Image src={it.image} alt={it.imageAlt} fill sizes="(max-width: 640px) 130px, (max-width: 1280px) 45vw, 22vw" className="object-cover" />
            </div>
            <div className="min-w-0 sm:mt-4 sm:px-1">
              <h3 className="flex items-center gap-2 text-[1.15rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.3rem] xl:text-[1.4rem]">
                {it.title}
                {it.href && (
                  <ArrowRight className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
                )}
              </h3>
              <p className="mt-1 text-[0.95rem] leading-[1.42] text-pine-deep/85 sm:mt-2 sm:text-[1rem] xl:text-[1.04rem]">{it.body}</p>
            </div>
          </>
        );
        const cls =
          "group flex h-full gap-4 rounded-2xl bg-white p-3 shadow-hair transition-shadow sm:flex-col sm:gap-0 sm:p-3.5 sm:pb-5";
        return (
          <li key={i}>
            {it.href ? (
              <SmartLink href={it.href} className={`${cls} hover:shadow-lift`}>
                {inner}
              </SmartLink>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ─────────────────────────── ordering process ─────────────────────────── */

export type ProcessStep = { icon: IconComponent; title: string; body: string };

/**
 * The five-step ordering process. Large screens: columns with dividers.
 * Phones/tablets: an accordion (first step open), as in the mobile mockup.
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <>
      <ol className="hidden rounded-2xl bg-white p-6 shadow-hair lg:grid lg:grid-cols-5 lg:gap-0 xl:p-7">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={i} className={`flex flex-col ${i > 0 ? "border-l border-line pl-5 xl:pl-6" : ""} ${i < steps.length - 1 ? "pr-5 xl:pr-6" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-disc-mint">
                  <Icon className="h-7 w-7 text-brand-700" strokeWidth={1.9} />
                </span>
                <StepNumber n={i + 1} />
              </div>
              <h3 className="mt-4 text-[1.2rem] font-800 leading-[1.2] text-pine-deep xl:text-[1.35rem]">{s.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-[1.45] text-pine-deep/85 xl:text-[1.02rem]">{s.body}</p>
            </li>
          );
        })}
      </ol>
      <ol className="space-y-2.5 lg:hidden">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={i}>
              <details open={i === 0} className="group/step overflow-hidden rounded-2xl bg-white shadow-hair">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-3.5 py-3 group-open/step:bg-wash-mint sm:gap-4 sm:px-4 [&::-webkit-details-marker]:hidden">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-disc-mint">
                    <Icon className="h-6 w-6 text-brand-700" strokeWidth={1.9} />
                  </span>
                  <StepNumber n={i + 1} />
                  <span className="flex-1 text-[1.05rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.15rem]">{s.title}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-pine-deep transition-transform group-open/step:rotate-180" strokeWidth={2.4} />
                </summary>
                <p className="px-4 pb-4 pt-3 text-[0.98rem] leading-[1.5] text-pine-deep/85 sm:px-5">{s.body}</p>
              </details>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-700 text-[1.05rem] font-800 text-white xl:h-10 xl:w-10 xl:text-[1.15rem]">
      {n}
    </span>
  );
}

/* ─────────────────────────── step flow ─────────────────────────── */

export type FlowStep = { icon: IconComponent; tone?: string; color?: string; title: string; body: string };

/**
 * A row of approach steps joined by arrows (six steps). Phones: a list with
 * the icon beside the text; `md`: 3 per row; `xl`: one row with arrows.
 */
export function StepFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="grid gap-2.5 md:grid-cols-3 md:gap-3 xl:flex xl:items-stretch xl:gap-0">
      {steps.map((s, i) => (
        <li key={i} className="flex xl:flex-1 xl:items-center">
          <div className="flex w-full items-center gap-4 rounded-2xl bg-white p-3.5 shadow-hair md:flex-col md:items-center md:gap-0 md:p-4 md:text-center xl:h-full xl:px-3 xl:py-5">
            <IconDisc
              icon={s.icon}
              tone={s.tone}
              color={s.color}
              className="h-14 w-14 sm:h-16 sm:w-16 xl:h-[4.5rem] xl:w-[4.5rem]"
              iconClassName="h-7 w-7 sm:h-8 sm:w-8 xl:h-9 xl:w-9"
            />
            <div className="min-w-0 md:mt-3">
              <h3 className="text-[1.12rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.2rem] xl:text-[1.25rem]">{s.title}</h3>
              <p className="mt-1 text-[0.95rem] leading-[1.4] text-pine-deep/85 xl:text-[0.98rem]">{s.body}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <ArrowRight aria-hidden="true" className="mx-1 hidden h-5 w-5 shrink-0 text-brand-600 xl:block" strokeWidth={2.4} />
          )}
        </li>
      ))}
    </ol>
  );
}

/* ─────────────────────────── strips & panels ─────────────────────────── */

/** Icon | rule | title + text | button: the "Ready to Get Started?" strips. */
export function ActionStrip({
  icon: Icon,
  title,
  children,
  action,
  greenTitle = false,
}: {
  icon?: IconComponent;
  title: React.ReactNode;
  children?: React.ReactNode;
  action: React.ReactNode;
  greenTitle?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-wash-mint-from to-wash-mint-to p-5 sm:p-6 lg:flex lg:items-center lg:gap-8 lg:px-8 xl:px-10">
      <div className="flex items-center gap-4 sm:gap-6 lg:flex-1">
        {Icon && (
          <>
            <Icon className="hidden h-14 w-14 shrink-0 text-brand-700 sm:block xl:h-16 xl:w-16" strokeWidth={1.7} />
            <span aria-hidden="true" className="hidden w-px shrink-0 self-stretch bg-brand-700/40 sm:block" />
          </>
        )}
        <div>
          <h2
            className={`text-[1.35rem] font-800 leading-[1.15] tracking-[-0.015em] sm:text-[1.6rem] xl:text-[2rem] ${
              greenTitle ? "text-brand-700" : "text-pine-deep"
            }`}
          >
            {title}
          </h2>
          {children && <div className={`mt-1.5 ${BODY}`}>{children}</div>}
        </div>
      </div>
      <div className="mt-5 lg:mt-0 lg:shrink-0">{action}</div>
    </div>
  );
}

/** Pale panel wrapper. */
export function Panel({
  tone = "mint",
  className = "",
  children,
  id,
}: {
  tone?: "mint" | "cream" | "white";
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const bg =
    tone === "cream"
      ? "bg-gradient-to-br from-wash-cream-from to-wash-cream-to"
      : tone === "white"
        ? "bg-white shadow-float"
        : "bg-gradient-to-br from-wash-mint-from to-wash-mint-to";
  return (
    <div id={id} className={`rounded-2xl p-3 sm:p-6 xl:p-7 ${bg} ${className}`}>
      {children}
    </div>
  );
}

/** Product information card: icon, green title and text. */
export function InfoCard({
  icon: Icon,
  title,
  children,
  tone = "mint",
}: {
  icon: IconComponent;
  title: string;
  children: React.ReactNode;
  tone?: "mint" | "cream";
}) {
  return (
    <article className={`flex gap-4 rounded-2xl p-4 sm:gap-5 sm:p-5 ${tone === "cream" ? "bg-wash-cream" : "bg-wash-mint"}`}>
      <Icon className="mt-0.5 h-10 w-10 shrink-0 text-brand-600 sm:h-12 sm:w-12" strokeWidth={1.8} />
      <div className="min-w-0">
        <h2 className="text-[1.3rem] font-800 leading-[1.2] text-brand-700 sm:text-[1.5rem]">{title}</h2>
        <div className={`mt-1.5 space-y-2.5 ${BODY}`}>{children}</div>
      </div>
    </article>
  );
}

/** Photo with a title and caption on a pale card. */
export function CaptionPhoto({
  image,
  imageAlt,
  title,
  caption,
  aspect = "aspect-[16/10]",
  sizes = "(max-width: 640px) 50vw, 25vw",
}: {
  image: string;
  imageAlt: string;
  title: string;
  caption?: string;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl bg-wash-mint">
      <div className={`relative ${aspect} overflow-hidden rounded-2xl`}>
        <Image src={image} alt={imageAlt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption className="px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4">
        <span className="block text-[1rem] font-800 leading-[1.22] text-pine-deep sm:text-[1.15rem] xl:text-[1.25rem]">{title}</span>
        {caption && (
          <span className="mt-1 block text-[0.9rem] leading-[1.4] text-pine-deep/85 sm:text-[0.98rem] xl:text-[1.04rem]">{caption}</span>
        )}
      </figcaption>
    </figure>
  );
}

/** "What Would You Like to Do Next?" bar at the foot of product pages. */
export function NextBar({
  icon: Icon,
  title = "What Would You Like to Do Next?",
  menuLabel,
  menuItems,
  orderLabel,
  orderHref,
}: {
  icon: IconComponent;
  title?: string;
  menuLabel: string;
  menuItems: { label: string; href: string }[];
  orderLabel: string;
  orderHref: string;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-wash-mint-from to-wash-mint-to p-4 sm:p-5 lg:flex lg:items-center lg:gap-6 lg:px-8">
      <div className="flex items-center justify-center gap-4 lg:flex-1 lg:justify-start">
        <Icon className="h-10 w-10 shrink-0 text-brand-700 sm:h-14 sm:w-14" strokeWidth={1.7} />
        <h2 className="text-[1.2rem] font-800 leading-[1.2] text-brand-700 sm:text-[1.5rem] xl:text-[1.85rem]">{title}</h2>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:flex lg:shrink-0 lg:gap-4">
        <MenuButton label={menuLabel} icon={Icon} items={menuItems} />
        <GoButton href={orderHref} lead="cart" className="lg:py-[0.85rem]">
          {orderLabel}
        </GoButton>
      </div>
    </div>
  );
}

/** Uppercase "STEP 01 OF 05" kicker. */
export function StepKicker({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.95rem] font-800 uppercase tracking-[0.02em] text-brand-600 sm:text-[1.05rem] xl:text-[1.2rem]">{children}</p>;
}

/** Large tappable choice tile ("Shredded Bark Mulch"). */
export function ChoiceTiles({ items }: { items: { icon: IconComponent; label: string; href: string }[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <li key={it.href}>
            <SmartLink
              href={it.href}
              className="group flex h-full items-center gap-3 rounded-2xl border-2 border-brand-200 bg-white px-3 py-3.5 transition-colors hover:border-brand-500 hover:bg-wash-mint sm:gap-4 sm:px-5 sm:py-5"
            >
              <Icon className="h-9 w-9 shrink-0 text-brand-700 sm:h-12 sm:w-12 xl:h-14 xl:w-14" strokeWidth={1.8} />
              <span className="text-[1.02rem] font-800 leading-[1.15] text-pine-deep sm:text-[1.25rem] xl:text-[1.45rem]">{it.label}</span>
            </SmartLink>
          </li>
        );
      })}
    </ul>
  );
}

/* ─────────────────────────── numbered hub ─────────────────────────── */

export type HubOption = { icon: IconComponent; title: string; body: string; href: string };

/**
 * Organic Soil Cover landing: "01 — Understanding the Challenge" as one wide
 * option, then "02 — Our Response" with its three sub-options.
 */
export function NumberedHub({
  title,
  lede,
  first,
  group,
  options,
}: {
  title: string;
  lede?: string;
  first: HubOption;
  group: HubOption;
  options: HubOption[];
}) {
  const F = first.icon;
  const G = group.icon;
  return (
    <section className="pb-16 pt-6 sm:pt-8 lg:pb-20 lg:pt-11">
      <div className="container-site">
        <h2 className="text-[1.65rem] font-800 leading-[1.15] tracking-[-0.015em] text-pine-deep sm:text-[2rem] lg:text-[2.5rem] xl:text-[2.8rem]">
          {title}
        </h2>
        {lede && <p className={`mt-2 ${BODY}`}>{lede}</p>}

        <SmartLink
          href={first.href}
          className="group mt-5 flex items-center gap-4 rounded-2xl bg-gradient-to-br from-wash-mint-from to-wash-mint-to p-4 transition-shadow hover:shadow-lift sm:gap-6 sm:p-6 lg:px-8"
        >
          <F className="h-12 w-12 shrink-0 text-brand-700 sm:h-16 sm:w-16 xl:h-20 xl:w-20" strokeWidth={1.8} />
          <span aria-hidden="true" className="hidden w-px shrink-0 self-stretch bg-brand-700/40 sm:block" />
          <span className="min-w-0 flex-1">
            <span className="block text-[1.2rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.5rem] xl:text-[1.85rem]">
              {first.title}
            </span>
            <span className={`mt-1 block ${BODY}`}>{first.body}</span>
          </span>
          <GoArrowSm />
        </SmartLink>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-wash-cream-from to-wash-cream-to p-3 sm:p-5 lg:p-6">
          <SmartLink href={group.href} className="group flex items-center gap-4 px-1 pb-3 pt-1 sm:gap-6 sm:px-2 lg:pb-5">
            <G className="h-12 w-12 shrink-0 text-brand-700 sm:h-16 sm:w-16 xl:h-20 xl:w-20" strokeWidth={1.8} />
            <span aria-hidden="true" className="hidden w-px shrink-0 self-stretch bg-brand-700/40 sm:block" />
            <span className="min-w-0 flex-1">
              <span className="block text-[1.2rem] font-800 leading-[1.2] text-pine-deep group-hover:text-brand-700 sm:text-[1.5rem] xl:text-[1.85rem]">
                {group.title}
              </span>
              <span className={`mt-1 block ${BODY}`}>{group.body}</span>
            </span>
          </SmartLink>
          <ul className="grid gap-2.5 lg:grid-cols-3 lg:gap-4">
            {options.map((o, i) => {
              const Icon = o.icon;
              return (
                <li key={i}>
                  <SmartLink
                    href={o.href}
                    className="group flex h-full items-center gap-4 rounded-xl bg-white px-3.5 py-3.5 shadow-hair transition-shadow hover:shadow-lift sm:px-5 lg:flex-col lg:items-stretch lg:gap-0 lg:rounded-2xl lg:p-6"
                  >
                    <span className="flex flex-1 items-center gap-4 lg:flex-none">
                      <Icon className="h-11 w-11 shrink-0 text-brand-700 lg:h-14 lg:w-14" strokeWidth={1.8} />
                      <span className="min-w-0 lg:flex-1">
                        <span className="block text-[1.08rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.2rem] lg:text-[1.4rem] xl:text-[1.6rem]">
                          {o.title}
                        </span>
                        <span className="mt-0.5 block text-[0.92rem] leading-[1.4] text-pine-deep/85 sm:text-[1rem] lg:hidden">{o.body}</span>
                      </span>
                    </span>
                    <span className={`mt-4 hidden lg:block ${BODY}`}>{o.body}</span>
                    <span className="lg:mt-auto lg:flex lg:justify-end lg:pt-4">
                      <GoArrowSm />
                    </span>
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function GoArrowSm() {
  return (
    <span
      aria-hidden="true"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 text-white shadow-go transition-transform duration-200 group-hover:translate-x-1 sm:h-12 sm:w-12"
    >
      <ArrowRight className="h-[55%] w-[55%]" strokeWidth={2.4} />
    </span>
  );
}

/* ─────────────────────────── challenge cards ─────────────────────────── */

export type ChallengeItem = { icon: IconComponent; tone?: string; color?: string; title: string; body: string };

/**
 * "Some of the challenges we commonly encounter include:" panel. Phones: rows
 * with the icon disc beside the text; `xl`: four cards with the disc above.
 */
export function ChallengeCards({
  title,
  lede,
  items,
}: {
  title: string;
  lede?: React.ReactNode;
  items: ChallengeItem[];
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-wash-mint-from to-wash-mint-to p-3 sm:p-5 lg:p-6">
      <h2 className="px-1 text-[1.3rem] font-800 leading-[1.2] tracking-[-0.01em] text-pine-deep sm:text-[1.6rem] xl:text-[2.1rem]">{title}</h2>
      {lede && <div className={`mt-1.5 px-1 ${BODY}`}>{lede}</div>}
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:mt-5 lg:gap-3 xl:grid-cols-4">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-4 rounded-xl bg-white p-3.5 shadow-hair sm:p-4 xl:flex-col xl:items-stretch xl:gap-0 xl:rounded-2xl xl:p-5">
            <div className="flex items-center gap-4">
              <IconDisc
                icon={it.icon}
                tone={it.tone}
                color={it.color}
                className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] xl:h-20 xl:w-20"
                iconClassName="h-9 w-9 sm:h-10 sm:w-10 xl:h-11 xl:w-11"
              />
              <h3 className="hidden text-[1.4rem] font-800 leading-[1.15] text-pine-deep xl:block">{it.title}</h3>
            </div>
            <div className="xl:mt-4">
              <h3 className="text-[1.12rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.25rem] xl:hidden">{it.title}</h3>
              <p className="mt-1 text-[0.96rem] leading-[1.42] text-pine-deep/85 sm:text-[1rem] xl:mt-0 xl:text-[1.06rem]">{it.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Section opener: kicker, large title and text beside a rounded photo. */
export function SectionHero({
  id,
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  aspect = "aspect-[719/242]",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  image: string;
  imageAlt: string;
  aspect?: string;
}) {
  return (
    <div id={id} className="below-crumbs lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.17fr)] lg:items-center lg:gap-8">
      <div>
        {eyebrow && (
          <>
            <p className="text-[0.92rem] font-800 uppercase tracking-[0.02em] text-brand-600 sm:text-[1rem] xl:text-[1.1rem]">{eyebrow}</p>
            <span aria-hidden="true" className="mb-4 mt-3 block h-1 w-16 rounded-full bg-brand-600 xl:w-[4.5rem]" />
          </>
        )}
        <h2 className="text-[clamp(1.75rem,7.6vw,2.6rem)] font-800 leading-[1.08] tracking-[-0.02em] text-pine-deep lg:text-[3rem] xl:text-[3.4rem]">
          {title}
        </h2>
        {children && <div className={`mt-3 space-y-3 lg:mt-4 ${BODY}`}>{children}</div>}
      </div>
      <div className={`relative mt-5 overflow-hidden rounded-2xl shadow-photo sm:mt-6 lg:mt-0 lg:rounded-[1.4rem] ${aspect}`}>
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
      </div>
    </div>
  );
}
