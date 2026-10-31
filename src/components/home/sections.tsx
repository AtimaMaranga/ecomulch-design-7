import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { LeafMark } from "@/components/logo";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import type { IconComponent } from "@/components/icons";

/*
 * Homepage sections (Homepage Design & Implementation Guide). The four
 * principal sections each fill roughly one viewport below the sticky header,
 * but grow with their content so nothing is ever clipped. Anchors (#about,
 * #our-work, #our-solutions) land below the header via scroll-padding-top.
 */

const SCREEN = "md:min-h-[calc(100svh-var(--header-h))]";

/* ─────────────────────────── shared bits ─────────────────────────── */

function Kicker({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <span className="block h-[3px] w-14 rounded-full bg-pine" />
      {children && (
        <p className="mt-5 text-[0.95rem] font-700 uppercase tracking-[0.03em] text-pine sm:text-[1.05rem]">
          {children}
        </p>
      )}
    </div>
  );
}

/** Section heading: sized as the section's title when there is no small label above it. */
function headingClass(hasEyebrow: boolean) {
  return hasEyebrow
    ? "mt-3 text-[2.1rem] font-800 leading-[1.08] tracking-[-0.02em] text-pine-deep sm:text-[2.7rem] lg:text-[clamp(2.9rem,3.9vw,3.9rem)]"
    : "mt-6 text-[2.6rem] font-800 leading-[1.04] tracking-[-0.025em] text-pine-deep sm:text-[3.4rem] lg:text-[clamp(3.6rem,4.6vw,5rem)]";
}

/** "Continue to …" prompt that guides the reader down to the next section. */
function ContinueLink({ label, target }: { label?: string; target?: string }) {
  if (!label || !target) return null;
  return (
    <div className="container-site flex items-center gap-5 pb-6 pt-2 md:pb-8">
      <span aria-hidden="true" className="h-px flex-1 bg-pine-deep/20" />
      <a
        href={target}
        className="group flex flex-col items-center gap-1.5 rounded-lg px-2 py-1 text-[1.1rem] font-800 text-pine transition-colors hover:text-pine-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/30 lg:text-[1.3rem]"
      >
        <LeafMark className="h-8 w-7 text-pine" />
        {label}
        <ArrowDown className="h-6 w-6 transition-transform group-hover:translate-y-0.5" strokeWidth={2.2} />
      </a>
      <span aria-hidden="true" className="h-px flex-1 bg-pine-deep/20" />
    </div>
  );
}

/** Soft leaf spray used as a watermark in section corners. */
export function LeafSpray({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 360"
      fill="currentColor"
      className={`pointer-events-none absolute ${className}`}
    >
      <path d="M300 20C230 70 190 150 200 250c60-20 110-80 120-150 4-30-4-60-20-80Z" />
      <path d="M190 120c-60-10-120 20-150 70 50 30 120 30 160-10 14-14 10-44-10-60Z" />
      <path d="M210 260c-50 0-100 30-120 80 50 14 110 0 140-40 10-14 0-40-20-40Z" />
      <path d="M100 360C170 250 230 140 300 20" stroke="currentColor" strokeWidth="6" fill="none" />
    </svg>
  );
}

/* ─────────────────────────── 1 · landing ─────────────────────────── */

export type LandingButton = {
  label: string;
  target: string;
  tone: "cream" | "mint" | "blush";
  icon: IconComponent;
};

const PILL = {
  cream: "bg-[#fcf6e5] hover:bg-[#fff9ea] border-[#efe2bd]",
  mint: "bg-[#dff1e0] hover:bg-[#e8f6e9] border-[#bfe0c4]",
  blush: "bg-[#fde5de] hover:bg-[#ffece6] border-[#f2c9bd]",
};

export function HomeLanding({
  image,
  imageAlt,
  title,
  buttons,
  scrollLabel,
}: {
  image: string;
  imageAlt: string;
  title: string;
  buttons: LandingButton[];
  scrollLabel: string;
}) {
  return (
    <section
      aria-label="Welcome"
      className="relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden bg-pine-deep"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[22%_top] md:object-center"
      />
      {/* Darken the centre so the headline reads, keep the edges bright */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_48%,rgba(0,0,0,0.42),rgba(0,0,0,0.12)_70%,rgba(0,0,0,0.05))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="container-site flex flex-1 flex-col items-center justify-center pb-6 pt-12 text-center md:pt-16">
        <h1 className="max-w-[20ch] text-[2.1rem] font-800 leading-[1.08] tracking-[-0.02em] !text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] sm:text-[2.9rem] md:max-w-[18em] lg:text-[clamp(2.9rem,3.75vw,4rem)]">
          {title}
        </h1>
        <span className="mt-6 block h-[3px] w-28 rounded-full bg-pine-mint" />

        <nav aria-label="On this page" className="mt-8 w-full max-w-[60rem]">
          <ul className="flex flex-col gap-3.5 md:flex-row md:gap-3">
            {buttons.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.target} className="md:flex-1">
                  <a
                    href={b.target}
                    className={`group flex items-center gap-4 rounded-full border-2 px-7 py-4 text-[1.15rem] font-800 text-pine-deep shadow-[0_6px_20px_-8px_rgba(0,0,0,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine-mint/60 md:justify-center md:py-[1.35rem] md:text-[1.3rem] ${PILL[b.tone]}`}
                  >
                    {/* Mobile mockup shows an icon and arrow; desktop is label-only. */}
                    <Icon className="h-6 w-6 shrink-0 text-pine md:hidden" strokeWidth={1.9} />
                    <span className="flex-1 text-left md:flex-none md:text-center">{b.label}</span>
                    <ArrowRight className="h-5 w-5 shrink-0 md:hidden" strokeWidth={2.2} />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <a
        href={buttons[0]?.target ?? "#about"}
        className="mx-auto mb-6 flex flex-col items-center gap-2 text-[1rem] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
      >
        <span className="relative h-10 w-6 rounded-full border-2 border-white">
          <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-white motion-safe:animate-bounce" />
        </span>
        {scrollLabel}
        <ChevronDown className="h-5 w-5" strokeWidth={2.2} />
      </a>
    </section>
  );
}

/* ─────────────────────────── 2 · about ─────────────────────────── */

export function HomeAbout({
  id,
  eyebrow,
  heading,
  lead,
  paragraphs,
  buttonLabel,
  buttonHref,
  image,
  imageAlt,
  continueLabel,
  continueTarget,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  lead: string;
  paragraphs: string[];
  buttonLabel: string;
  buttonHref: string;
  image: string;
  imageAlt: string;
  continueLabel?: string;
  continueTarget?: string;
}) {
  return (
    <section id={id} className={`relative isolate flex flex-col overflow-hidden bg-cream ${SCREEN}`}>
      <LeafSpray className="-left-16 bottom-0 -z-10 hidden h-72 w-auto -scale-x-100 text-pine/[0.05] md:block" />
      <LeafSpray className="-right-10 bottom-0 -z-10 hidden h-56 w-auto text-pine/[0.05] md:block" />

      <div className="relative isolate flex flex-1 flex-col">
        {/* Mobile: the photo sits on top and fades into the cream content area. */}
        <div className="relative h-72 w-full sm:h-96 md:absolute md:inset-y-0 md:right-0 md:-z-10 md:h-auto md:w-[58%]">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover object-[60%_center]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-55% to-cream md:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-cream via-cream/60 via-25% to-transparent to-55% md:block" />
        </div>

        <div className="container-site flex flex-1 items-center py-10 md:py-16">
          <div className="max-w-[46rem] md:max-w-[52%]">
            <Kicker>{eyebrow}</Kicker>
            <h2 className={headingClass(Boolean(eyebrow))}>{heading}</h2>
            <p className="mt-5 text-[1.2rem] font-800 leading-[1.3] text-pine-deep sm:text-[1.45rem] lg:text-[1.7rem]">
              {lead}
            </p>
            <div className="mt-5 space-y-4 text-[1.04rem] leading-[1.5] text-ink-light sm:text-[1.15rem] lg:text-[1.28rem]">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <Link
              href={buttonHref}
              className="group mt-8 inline-flex w-full items-center justify-center gap-4 rounded-full bg-pine px-9 py-4 text-[1.1rem] font-800 text-white shadow-md transition-colors hover:bg-pine-dark sm:w-auto lg:px-12 lg:py-5 lg:text-[1.35rem]"
            >
              {buttonLabel}
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
      <ContinueLink label={continueLabel} target={continueTarget} />
    </section>
  );
}

/* ─────────────────────────── 3 & 4 · card sections ─────────────────────────── */

export type HomeCard = {
  image: string;
  imageAlt: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
};

export function HomeCards({
  id,
  eyebrow,
  heading,
  intro,
  cards,
  continueLabel,
  continueTarget,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  cards: HomeCard[];
  continueLabel?: string;
  continueTarget?: string;
}) {
  return (
    <section id={id} className={`relative isolate flex flex-col overflow-hidden border-t border-pine/10 bg-sage ${SCREEN}`}>
      <LeafSpray className="-right-10 -top-6 -z-10 h-[26rem] w-auto text-pine/[0.06]" />
      <div className="container-site flex flex-1 flex-col justify-center py-12 md:py-14">
        <Kicker>{eyebrow}</Kicker>
        <h2 className={`max-w-[22ch] ${headingClass(Boolean(eyebrow))}`}>{heading}</h2>
        <p className="mt-4 max-w-[62rem] text-[1.06rem] leading-[1.45] text-ink-light sm:text-[1.2rem] lg:text-[1.4rem]">
          {intro}
        </p>

        <ul className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((c) => {
            return (
              <li key={c.href + c.title}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[#fcfcfa] shadow-[0_2px_6px_rgba(12,36,27,0.05),0_14px_30px_-18px_rgba(12,36,27,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(12,36,27,0.06),0_24px_40px_-20px_rgba(12,36,27,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/40"
                >
                  <div className="relative aspect-[486/222] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-6 lg:px-8 lg:pt-7">
                    <h3 className="text-[1.4rem] font-800 leading-[1.15] tracking-[-0.01em] text-pine-deep lg:text-[1.75rem]">
                      {c.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[1rem] leading-[1.45] text-ink-light lg:text-[1.2rem]">
                      {c.body}
                    </p>
                    <span className="mt-5 flex items-center gap-3 text-[1.05rem] font-800 text-pine lg:text-[1.3rem]">
                      {c.linkLabel}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 lg:h-6 lg:w-6" strokeWidth={2.2} />
                      <span className="sr-only">about {c.title}</span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <ContinueLink label={continueLabel} target={continueTarget} />
    </section>
  );
}

/* ─────────────────────────── 5 · let's talk ─────────────────────────── */

export function HomeTalk({
  heading,
  body,
  buttonLabel,
  whatsappUrl,
}: {
  heading: string;
  body: string;
  buttonLabel: string;
  whatsappUrl: string;
}) {
  return (
    <section aria-label={heading} className="bg-cream py-12 md:py-20">
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#e7f1e5] px-6 py-8 sm:px-10 md:px-14 md:py-10">
          <LeafSpray className="-left-10 -top-8 -z-10 h-64 w-auto -scale-x-100 text-pine/[0.07]" />
          <LeafSpray className="-bottom-16 -right-6 -z-10 h-64 w-auto text-pine/[0.07]" />
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <div className="flex flex-1 items-center gap-5 md:gap-9">
              <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-pine text-white md:h-[120px] md:w-[120px]">
                <WhatsAppIcon className="h-9 w-9 md:h-16 md:w-16" />
              </span>
              <div>
                <h2 className="text-[1.75rem] font-800 leading-[1.1] tracking-[-0.015em] text-pine-deep md:text-[clamp(2rem,3vw,3rem)]">
                  {heading}
                </h2>
                <p className="mt-2 hidden text-[1.15rem] leading-[1.45] text-ink-light md:block lg:text-[1.3rem]">
                  {body}
                </p>
              </div>
            </div>
            <p className="text-[1.05rem] leading-[1.45] text-ink-light md:hidden">{body}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center justify-center gap-4 rounded-full bg-pine px-9 py-4 text-[1.1rem] font-800 text-white shadow-md transition-colors hover:bg-pine-dark lg:px-11 lg:py-5 lg:text-[1.3rem]"
            >
              {buttonLabel}
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
