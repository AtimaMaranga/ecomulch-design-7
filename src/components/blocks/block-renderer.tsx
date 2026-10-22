/**
 * Renders a page's blocks to the exact same markup the pages used when the
 * content was hardcoded, now fed from CMS data. Add a `case` here whenever you
 * add a block type to `blocks-schema.ts`.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { SubHero } from "@/components/who/sub-hero";
import { SectionTitle } from "@/components/who/sub-parts";
import {
  FeatureCard,
  OutlineButton,
  ValuesStrip,
  type BadgeTone,
} from "@/components/section/blocks";
import {
  Accent,
  BadgeCard,
  Cta,
  Eyebrow2,
  FadeHero,
  SectionHead,
} from "@/components/section/v2";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { IntroSection } from "@/components/ui/intro-section";
import { resolveIcon } from "@/lib/content/icon-registry";
import { HomeAbout, HomeCards, HomeLanding, HomeTalk } from "@/components/home/sections";
import type { IconComponent } from "@/components/icons";
import type { Block } from "@/lib/content/types";

type Tone = "brand" | "rust";
function tone(v: unknown): Tone {
  return v === "rust" ? "rust" : "brand";
}

export type RenderContext = { whatsappUrl: string };

type Btn = { label?: string; href?: string; variant?: string };

function s(v: unknown): string {
  return typeof v === "string" ? v : "";
}
function list<T = Record<string, unknown>>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function WhatsAppButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-sm transition-all hover:bg-brand-50 hover:shadow-md"
    >
      <WhatsAppIcon className="h-5 w-5" />
      {label}
    </a>
  );
}

export function BlockRenderer({
  blocks,
  ctx,
  endSpacer = true,
}: {
  blocks: Block[];
  ctx: RenderContext;
  /** Add breathing room before the footer (off when the page continues below). */
  endSpacer?: boolean;
}) {
  return (
    <>
      {blocks.map((block) => (
        <BlockView key={block.id} block={block} ctx={ctx} />
      ))}
      {/* Breathing room before the footer when the page doesn't end on the values strip. */}
      {endSpacer && blocks.length > 0 && !["values-strip", "home-talk"].includes(blocks[blocks.length - 1].type) && (
        <div aria-hidden="true" className="h-16" />
      )}
    </>
  );
}

function BlockView({ block, ctx }: { block: Block; ctx: RenderContext }) {
  const d = block.data;

  switch (block.type) {
    case "hero": {
      const Icon = resolveIcon(s(d.icon));
      return (
        <section className="relative isolate overflow-hidden">
          <Image
            src={s(d.image) || "/images/home-hero.jpg"}
            alt={s(d.imageAlt)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="container-page relative flex min-h-[520px] flex-col justify-center py-20 md:min-h-[600px]">
            <div className="max-w-2xl">
              <Eyebrow tone="light" icon={Icon} className="mb-4">
                {s(d.eyebrow)}
              </Eyebrow>
              <h1 className="font-display text-4xl font-700 leading-[1.1] text-white drop-shadow-sm sm:text-5xl md:text-[3.25rem]">
                {s(d.heading)}
              </h1>
              {s(d.body) && (
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
                  {s(d.body)}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                {s(d.primaryLabel) && (
                  <ButtonLink href={s(d.primaryHref) || "/"} size="lg" withArrow>
                    {s(d.primaryLabel)}
                  </ButtonLink>
                )}
                {s(d.showWhatsapp) !== "no" && (
                  <WhatsAppButton
                    href={ctx.whatsappUrl}
                    label={s(d.whatsappLabel) || "Chat with us on WhatsApp"}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case "mission-strip": {
      const Icon = resolveIcon(s(d.icon));
      return (
        <section className="border-b border-slate-200/70 bg-surface py-14 md:py-16">
          <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Eyebrow icon={Icon}>{s(d.eyebrow)}</Eyebrow>
            <p className="font-display text-xl font-500 leading-relaxed text-ink sm:text-2xl">
              {s(d.body)}
            </p>
          </div>
        </section>
      );
    }

    case "services-grid": {
      const Icon = resolveIcon(s(d.icon));
      const items = list<{ icon?: string; title?: string; href?: string; body?: string }>(
        d.items,
      );
      const learnMore = s(d.learnMoreLabel) || "Learn more";
      return (
        <section className="py-16 md:py-24">
          <div className="container-page">
            <div className="max-w-2xl">
              <Eyebrow icon={Icon}>{s(d.eyebrow)}</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-600 leading-tight text-ink sm:text-4xl">
                {s(d.heading)}
              </h2>
              <span className="rule-accent mt-4 block" />
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {items.map((item, i) => {
                const CardIcon = resolveIcon(item.icon);
                return (
                  <Link
                    key={i}
                    href={item.href || "/"}
                    className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <CardIcon className="h-7 w-7" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-600 text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-slate-500">
                      {item.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-600 text-brand-600">
                      {learnMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    case "split-feature": {
      const Icon = resolveIcon(s(d.icon));
      const buttons = list<Btn>(d.buttons);
      const imageOnLeft = s(d.imageSide) !== "right";
      const photo = (
        <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-card">
          <Image
            src={s(d.image) || "/images/misc-forest.jpg"}
            alt={s(d.imageAlt)}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        </div>
      );
      const text = (
        <div>
          <Eyebrow icon={Icon}>{s(d.eyebrow)}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-600 leading-tight text-ink sm:text-4xl">
            {s(d.heading)}
          </h2>
          <span className="rule-accent mt-4 block" />
          <p className="prose-eco mt-6 max-w-xl">{s(d.body)}</p>
          {buttons.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {buttons.map((b, i) => (
                <ButtonLink
                  key={i}
                  href={b.href || "/"}
                  variant={(b.variant as "solid" | "outline" | "ghost") || "solid"}
                  withArrow={b.variant !== "outline"}
                >
                  {b.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </div>
      );
      return (
        <section className="bg-surface py-16 md:py-24">
          <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {imageOnLeft ? (
              <>
                {photo}
                {text}
              </>
            ) : (
              <>
                {text}
                {photo}
              </>
            )}
          </div>
        </section>
      );
    }

    case "cta-band": {
      return (
        <section className="bg-brand-700">
          <div className="container-page flex flex-col items-center gap-6 py-16 text-center md:py-20">
            <h2 className="max-w-2xl font-display text-3xl font-700 leading-tight text-white sm:text-4xl">
              {s(d.heading)}
            </h2>
            {s(d.body) && <p className="max-w-xl text-brand-100">{s(d.body)}</p>}
            <WhatsAppButton
              href={ctx.whatsappUrl}
              label={s(d.whatsappLabel) || "Chat with us on WhatsApp"}
            />
          </div>
        </section>
      );
    }

    case "prose-section": {
      const Icon = resolveIcon(s(d.icon));
      const paragraphs = list<{ text?: string }>(d.paragraphs);
      return (
        <section className="py-16 md:py-24">
          <div className="container-page max-w-3xl">
            {s(d.eyebrow) && <Eyebrow icon={Icon}>{s(d.eyebrow)}</Eyebrow>}
            <h2 className="mt-3 font-display text-3xl font-600 leading-tight text-ink sm:text-4xl">
              {s(d.heading)}
            </h2>
            <span className="rule-accent mt-4 block" />
            <div className="prose-eco mt-6">
              {paragraphs.map((p, i) => (
                <p key={i}>{p.text}</p>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "team-hero": {
      return (
        <section className="relative isolate overflow-hidden bg-[#1d2413]">
          <Image
            src={s(d.image) || "/images/who-hero.jpg"}
            alt={s(d.imageAlt)}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="hero-team-overlay absolute inset-0" />
          <div className="container-page relative flex h-[clamp(400px,28.5vw,560px)] flex-col items-center justify-end pb-[clamp(2rem,2.2vw,3rem)] text-center">
            <h1 className="text-shadow-hero max-w-[52rem] text-[1.9rem] font-700 leading-[1.18] tracking-[-0.015em] !text-white sm:text-[2.6rem] lg:text-[clamp(2.6rem,3.15vw,3.5rem)]">
              {s(d.heading)}
            </h1>
            {s(d.ctaLabel) && (
              <Link
                href={s(d.ctaHref) || "#explore"}
                className="group mt-4 inline-flex flex-col items-center text-[1.35rem] font-700 text-[#7cd96f] transition-colors hover:text-[#a5ec9f] sm:text-[1.65rem]"
              >
                <span className="text-shadow-hero">{s(d.ctaLabel)}</span>
                <span className="mt-3 h-[3px] w-20 bg-brand-500 transition-all duration-300 group-hover:w-28" />
              </Link>
            )}
          </div>
        </section>
      );
    }

    case "pillar-cards": {
      const items = list<{
        image?: string;
        imageAlt?: string;
        icon?: string;
        eyebrow?: string;
        title?: string;
        body?: string;
        cta?: string;
        href?: string;
      }>(d.items);
      return (
        <section id="explore" className="scroll-mt-24 bg-surface pb-24 pt-8">
          <div className="container-page grid gap-6 xl:grid-cols-3 xl:gap-[22px]">
            {items.map((p, i) => {
              const Icon = resolveIcon(p.icon);
              return (
                <article
                  key={i}
                  className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(12,40,82,0.06),0_6px_18px_-8px_rgba(12,40,82,0.12)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(12,40,82,0.08),0_16px_32px_-14px_rgba(12,40,82,0.22)] sm:flex-row"
                >
                  <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[42%]">
                    <Image
                      src={p.image || "/images/card-origin.jpg"}
                      alt={p.imageAlt || ""}
                      fill
                      sizes="(max-width: 640px) 100vw, 240px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-3 pt-5 sm:min-h-[337px]">
                    <p className="flex items-center gap-2.5 text-[0.8rem] font-700 uppercase tracking-[0.01em] text-brand-600">
                      <Icon className="h-[26px] w-[26px]" strokeWidth={2.4} />
                      {p.eyebrow}
                    </p>
                    <h2 className="mt-2.5 text-[1.5rem] font-700 leading-[1.18] tracking-[-0.01em] text-ink">
                      {p.title}
                    </h2>
                    <p className="mt-3.5 flex-1 text-[0.85rem] leading-[1.62] text-ink-light">
                      {p.body}
                    </p>
                    <Link
                      href={p.href || "/"}
                      className="mb-3 mt-4 inline-flex w-fit items-center gap-4 whitespace-nowrap rounded-[4px] border-[1.5px] border-brand-500 px-4 py-[7px] text-[0.95rem] font-700 text-brand-600 transition-colors hover:bg-brand-50"
                    >
                      {p.cta}
                      <ArrowRight
                        className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                        strokeWidth={2.2}
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      );
    }

    case "sub-hero": {
      const Icon = resolveIcon(s(d.icon)) as unknown as IconComponent;
      const accent = s(d.titleAccent);
      const title = accent ? (
        <>
          {s(d.title)} <span className="hero-accent">{accent}</span>
        </>
      ) : (
        s(d.title)
      );
      return (
        <SubHero
          wide
          layout="split"
          size="lg"
          tone="dark"
          image={s(d.image) || undefined}
          imageAlt={s(d.imageAlt)}
          eyebrow={s(d.eyebrow) || undefined}
          eyebrowIcon={Icon}
          title={title}
          subtitle={s(d.subtitle) || undefined}
          body={s(d.body) ? <p>{s(d.body)}</p> : undefined}
        />
      );
    }

    case "explore-section": {
      const items = list<{
        image?: string;
        imageAlt?: string;
        icon?: string;
        badgeTone?: string;
        accent?: string;
        title?: string;
        kicker?: string;
        body?: string;
        chips?: { label?: string; accent?: string }[];
        cta?: string;
        href?: string;
      }>(d.items);
      return (
        <section id="explore" className="scroll-mt-24 pb-4 pt-10">
          <div className="container-site">
            <SectionTitle lede={s(d.lede) || undefined}>
              {s(d.heading)}
            </SectionTitle>
            <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-[22px]">
              {items.map((c, i) => {
                const chips =
                  Array.isArray(c.chips) && c.chips.length > 0
                    ? c.chips.map((ch) => ({
                        label: ch.label || "",
                        accent: tone(ch.accent),
                      }))
                    : undefined;
                return (
                  <FeatureCard
                    key={i}
                    image={c.image || ""}
                    imageAlt={c.imageAlt || ""}
                    icon={resolveIcon(c.icon) as unknown as IconComponent}
                    badge={{ solid: tone(c.badgeTone) }}
                    accent={tone(c.accent)}
                    title={c.title || ""}
                    kicker={c.kicker || undefined}
                    body={c.body || ""}
                    chips={chips}
                    cta={c.cta || ""}
                    href={c.href || "/"}
                  />
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    case "fade-hero": {
      const accent = s(d.titleAccent);
      const paragraphs = list<{ text?: string }>(d.paragraphs).filter((p) => p.text);
      return (
        <FadeHero
          tone={s(d.tone) === "dark" ? "dark" : "light"}
          layout={s(d.layout) === "cover" ? "cover" : "split"}
          image={s(d.image) || undefined}
          imageAlt={s(d.imageAlt)}
          eyebrow={s(d.eyebrow) || undefined}
          title={
            <>
              {s(d.title)}
              {accent && s(d.accentBreak) !== "inline" && <br className="hidden sm:block" />}
              {accent && " "}
              {accent && <Accent>{accent}</Accent>}
              {s(d.titleEnd) && (
                <>
                  <br className="hidden sm:block" /> {s(d.titleEnd)}
                </>
              )}
            </>
          }
          subtitle={s(d.subtitle) || undefined}
        >
          {paragraphs.length > 0
            ? paragraphs.map((p, i) => <p key={i}>{p.text}</p>)
            : undefined}
        </FadeHero>
      );
    }

    case "split-cta": {
      const accent = s(d.titleAccent);
      return (
        <section className="pt-8">
          <div className="container-site">
            <div className="grid items-center gap-7 rounded-xl bg-gradient-to-br from-[#edf7ef] to-[#f7fbf7] px-5 py-6 sm:px-7 md:grid-cols-[1.25fr_1fr]">
              <div>
                {s(d.eyebrow) && <Eyebrow2 className="mb-3.5">{s(d.eyebrow)}</Eyebrow2>}
                <h2 className="text-[1.85rem] font-800 leading-[1.12] tracking-[-0.015em] text-ink sm:text-[2.2rem]">
                  {s(d.title)}
                  {accent && (
                    <>
                      <br className="hidden sm:block" /> <Accent>{accent}</Accent>
                    </>
                  )}
                </h2>
                {s(d.body) && (
                  <p className="mt-3 max-w-[34rem] text-[1rem] leading-[1.5] text-ink-light">{s(d.body)}</p>
                )}
                {s(d.buttonLabel) && (
                  <div className="mt-6">
                    <OutlineButton href={s(d.buttonHref) || "/"} accent={tone(d.buttonAccent)}>
                      {s(d.buttonLabel)}
                    </OutlineButton>
                  </div>
                )}
              </div>
              {s(d.image) && (
                <div className="relative aspect-[407/259] overflow-hidden rounded-lg shadow-[0_6px_18px_-8px_rgba(12,40,82,0.25)]">
                  <Image src={s(d.image)} alt={s(d.imageAlt)} fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    case "explore-cards": {
      const items = list<{
        image?: string;
        imageAlt?: string;
        icon?: string;
        badge?: string;
        accent?: string;
        title?: string;
        kicker?: string;
        body?: string;
        cta?: string;
        href?: string;
      }>(d.items);
      const solid = s(d.buttonStyle) !== "outline";
      const tinted = s(d.surface) === "tinted";
      const large = s(d.titleSize) !== "regular";
      const badgeTone = (b?: string): BadgeTone =>
        b === "mint" || b === "peach" ? { soft: b } : { solid: b === "rust" ? "rust" : "brand" };
      const accent = s(d.headingAccent);
      return (
        <section className="pb-4 pt-10">
          <div className="container-site">
            <SectionHead
              eyebrow={s(d.eyebrow) || undefined}
              rule={!s(d.eyebrow)}
              title={
                <>
                  {s(d.heading)} {accent && <Accent>{accent}</Accent>}
                </>
              }
              lede={s(d.lede) || undefined}
            />
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {items.map((c, i) => {
                const t = tone(c.accent);
                const title = c.title || "";
                const dot = title.endsWith(".");
                return (
                  <BadgeCard
                    key={i}
                    image={c.image || ""}
                    imageAlt={c.imageAlt || ""}
                    icon={resolveIcon(c.icon) as unknown as IconComponent}
                    tone={badgeTone(c.badge)}
                    surface={tinted ? (t === "rust" ? "peach" : "mint") : "white"}
                    badgeSize="lg"
                  >
                    <h2
                      className={`font-800 leading-[1.1] tracking-[-0.015em] text-ink ${
                        large ? "text-[1.75rem] sm:text-[2rem]" : "text-[1.4rem] sm:text-[1.5rem]"
                      }`}
                    >
                      {dot ? title.slice(0, -1) : title}
                      {dot && <span className={t === "rust" ? "text-rust-500" : "text-brand-600"}>.</span>}
                    </h2>
                    {c.kicker && (
                      <p
                        className={`mt-2 font-800 leading-[1.3] ${large ? "text-[1.15rem]" : "text-[1rem]"} ${
                          t === "rust" ? "text-rust-600" : "text-brand-700"
                        }`}
                      >
                        {c.kicker}
                      </p>
                    )}
                    <p
                      className={`mt-3 flex-1 leading-[1.55] text-ink-light ${
                        large ? "text-[1rem]" : "text-[0.93rem]"
                      }`}
                    >
                      {c.body}
                    </p>
                    <div className="mt-6">
                      {solid ? (
                        <Cta href={c.href || "/"} accent={t} block size="lg">
                          {c.cta}
                        </Cta>
                      ) : (
                        <OutlineButton href={c.href || "/"} accent={t}>
                          {c.cta}
                        </OutlineButton>
                      )}
                    </div>
                  </BadgeCard>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    case "home-landing": {
      const buttons = list<{ label?: string; target?: string; tone?: string; icon?: string }>(d.buttons).map((b) => ({
        label: b.label || "",
        target: b.target || "#about",
        tone: (b.tone === "mint" || b.tone === "blush" ? b.tone : "cream") as "cream" | "mint" | "blush",
        icon: resolveIcon(b.icon) as unknown as IconComponent,
      }));
      return (
        <HomeLanding
          image={s(d.image) || "/images/home-hero.jpg"}
          imageAlt={s(d.imageAlt)}
          title={s(d.title)}
          buttons={buttons}
          scrollLabel={s(d.scrollLabel) || "Scroll down to explore"}
        />
      );
    }

    case "home-about":
      return (
        <HomeAbout
          id={s(d.anchor) || "about"}
          eyebrow={s(d.eyebrow)}
          heading={s(d.heading)}
          lead={s(d.lead)}
          paragraphs={list<{ text?: string }>(d.paragraphs).map((p) => p.text || "").filter(Boolean)}
          buttonLabel={s(d.buttonLabel)}
          buttonHref={s(d.buttonHref) || "/who-we-are"}
          image={s(d.image) || "/images/home-about.jpg"}
          imageAlt={s(d.imageAlt)}
        />
      );

    case "home-cards":
      return (
        <HomeCards
          id={s(d.anchor) || "our-work"}
          eyebrow={s(d.eyebrow)}
          heading={s(d.heading)}
          intro={s(d.intro)}
          cards={list<Record<string, string>>(d.cards).map((c) => ({
            image: c.image || "/images/home-work-soil.jpg",
            imageAlt: c.imageAlt || "",
            icon: resolveIcon(c.icon) as unknown as IconComponent,
            title: c.title || "",
            body: c.body || "",
            linkLabel: c.linkLabel || "Learn more",
            href: c.href || "/",
          }))}
        />
      );

    case "home-talk":
      return (
        <HomeTalk
          heading={s(d.heading)}
          body={s(d.body)}
          buttonLabel={s(d.buttonLabel) || "Start a conversation"}
          whatsappUrl={ctx.whatsappUrl}
        />
      );

    case "values-strip":
      return <ValuesStrip />;

    case "page-hero": {
      const Icon = resolveIcon(s(d.icon)) as unknown as LucideIcon;
      return (
        <PageHero
          priority
          image={s(d.image) || "/images/misc-forest.jpg"}
          imageAlt={s(d.imageAlt)}
          eyebrow={s(d.eyebrow) || undefined}
          eyebrowIcon={Icon}
          title={s(d.title)}
          subtitle={s(d.subtitle) || undefined}
        />
      );
    }

    case "breadcrumb": {
      const items = list<{ label?: string; href?: string }>(d.items).map(
        (it) => ({ label: it.label || "", href: it.href || undefined }),
      );
      return <Breadcrumb items={items} />;
    }

    case "intro-section": {
      const paragraphs = list<{ text?: string }>(d.paragraphs).map(
        (p) => p.text || "",
      );
      return <IntroSection lead={s(d.lead)} paragraphs={paragraphs} />;
    }

    default:
      return null;
  }
}
