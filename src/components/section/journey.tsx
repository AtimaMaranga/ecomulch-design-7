import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, Quote } from "lucide-react";
import { CrumbBar, SectionTitle } from "@/components/who/sub-parts";
import { ImageCard, ValuesStrip } from "@/components/section/blocks";
import { Paras } from "@/lib/content/rich";
import type { JourneyStepContent } from "@/lib/content/defaults/journey";

/*
 * The three "Our Recycling Green Waste Journey" pages share one frame: a page
 * header, a selector across the three waste streams, then the stream's story
 * told as numbered steps inside the standard tint panel.
 */

export const STREAM_SLUGS = {
  sugarcane: "sugarcane-peels",
  coconut: "green-coconut-husks",
  pine: "pine-bark",
} as const;
export type StreamKey = keyof typeof STREAM_SLUGS;
export type StreamSlug = (typeof STREAM_SLUGS)[StreamKey];

export const journeyHref = (slug: StreamSlug) => `/recycling-green-waste/our-journey/${slug}`;

type StreamCard = { name: string; line: string; image: string; imageAlt: string };
export type JourneyShared = {
  header: { title: string; intro: string; prompt: string };
  streams: Record<StreamKey, StreamCard>;
  seriesBox: { title: string; ctaHref: string };
};

export function JourneyFrame({
  active,
  shared,
  headline,
  children,
  series,
}: {
  active: StreamKey;
  shared: JourneyShared;
  headline: string;
  children: React.ReactNode;
  series: { body: string; cta: string };
}) {
  const keys = Object.keys(STREAM_SLUGS) as StreamKey[];
  const current = shared.streams[active];

  return (
    <>
      <CrumbBar
        wide
        items={[
          { label: "Home", href: "/" },
          { label: "Recycling Green Waste", href: "/recycling-green-waste" },
          { label: "Our Journey", href: journeyHref("sugarcane-peels") },
          { label: current.name },
        ]}
      />

      {/* Header + stream selector */}
      <section className="pb-6 pt-9">
        <div className="container-site">
          <SectionTitle as="h1" size="xl">
            {shared.header.title}
          </SectionTitle>
          <p className="mt-5 max-w-[54rem] text-[1.02rem] leading-[1.5] text-ink-light">
            {shared.header.intro}
          </p>
          <p className="mt-4 text-[0.98rem] font-700 text-ink">{shared.header.prompt}</p>

          <nav aria-label="Waste streams" className="mt-5">
            <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
              {keys.map((key) => {
                const s = shared.streams[key];
                const on = key === active;
                return (
                  <li key={key}>
                    <Link
                      href={journeyHref(STREAM_SLUGS[key])}
                      scroll={false}
                      aria-current={on ? "page" : undefined}
                      className={`group flex h-full flex-col overflow-hidden rounded-lg border-2 bg-white transition-all duration-300 ${
                        on
                          ? "border-brand-500 shadow-[0_0_0_3px_rgba(31,154,75,0.14)]"
                          : "border-transparent shadow-[0_1px_3px_rgba(12,40,82,0.06),0_6px_18px_-8px_rgba(12,40,82,0.12)] hover:border-brand-200"
                      }`}
                    >
                      <div className="relative aspect-[293/96] overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="flex flex-1 items-end justify-between gap-3 px-4 pb-4 pt-3.5">
                        <div>
                          <p className="text-[1.08rem] font-700 text-ink">{s.name}</p>
                          <p className="mt-1 text-[0.84rem] leading-[1.4] text-ink-light">{s.line}</p>
                        </div>
                        <ChevronDown
                          aria-hidden="true"
                          className={`mb-1 h-6 w-6 shrink-0 text-brand-600 transition-transform duration-300 ${
                            on ? "" : "-rotate-90 group-hover:rotate-0"
                          }`}
                          strokeWidth={2.4}
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      {/* The stream's story */}
      <section className="py-4">
        <div className="container-site">
          <div className="rounded-xl bg-surface-tint px-5 py-8 sm:px-8">
            <SectionTitle size="xl">{headline}</SectionTitle>
            <div className="mt-8 divide-y divide-line">{children}</div>
          </div>
        </div>
      </section>

      {/* Blog series */}
      <section className="pt-6">
        <div className="container-site">
          <div className="flex flex-col gap-5 rounded-xl border border-line bg-white px-6 py-6 sm:flex-row sm:items-center sm:gap-7 sm:px-8">
            <BookOpen className="h-14 w-14 shrink-0 text-brand-600" strokeWidth={1.5} />
            <div className="flex-1">
              <h2 className="text-[1.25rem] font-700 text-ink">{shared.seriesBox.title}</h2>
              <p className="mt-1.5 max-w-[34rem] text-[0.88rem] leading-[1.45] text-ink-light">
                {series.body}
              </p>
            </div>
            <Link
              href={shared.seriesBox.ctaHref || "/blog"}
              className="group/btn inline-flex w-fit shrink-0 items-center gap-3 rounded-[4px] bg-brand-600 px-5 py-3 text-[0.92rem] font-700 text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              {series.cta}
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover/btn:translate-x-1"
                strokeWidth={2.2}
              />
            </Link>
          </div>
        </div>
      </section>

      <ValuesStrip />
    </>
  );
}

/** A numbered chapter of a stream's story. */
export function JourneyStep({
  n,
  title,
  children,
  aside,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
  /** Photo or note shown beside the copy on wide screens. */
  aside?: React.ReactNode;
}) {
  return (
    <div className="grid gap-7 py-7 first:pt-0 last:pb-0 lg:grid-cols-[55fr_42fr] lg:gap-9">
      <div className={aside ? "" : "lg:col-span-2"}>
        <div className="flex items-start gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 text-[1.05rem] font-800 text-white">
            {n}
          </span>
          <h3 className="pt-1 text-[1.35rem] font-700 leading-[1.25] text-ink">{title}</h3>
        </div>
        {/* Paragraphs keep a readable measure; grids inside a step (the coco
            materials) still span the full column. */}
        <div className="mt-3 space-y-3 text-[0.93rem] leading-[1.48] text-ink-light sm:pl-14 [&>p]:max-w-[60rem]">
          {children}
        </div>
      </div>
      {aside && <div>{aside}</div>}
    </div>
  );
}

/** Green pull-quote — the question each experiment began with. */
export function JourneyQuote({ children }: { children: React.ReactNode }) {
  return (
    <figure className="!mt-5 flex items-start gap-4 rounded-lg bg-brand-50 px-5 py-4">
      <Quote className="mt-0.5 h-7 w-7 shrink-0 fill-brand-600 text-brand-600" strokeWidth={0} />
      <blockquote className="text-[1rem] font-700 italic leading-[1.4] text-brand-700">
        {children}
      </blockquote>
    </figure>
  );
}

/** Side note that hands the reader on to the next stream. */
export function JourneyNext({
  title,
  children,
  to,
  label,
}: {
  title: string;
  children: React.ReactNode;
  to: string;
  label: string;
}) {
  return (
    <div className="rounded-lg bg-brand-50/80 px-6 py-6">
      <span className="rule" />
      <p className="mt-4 text-[1.1rem] font-700 text-brand-700">{title}</p>
      <div className="mt-2 space-y-3 text-[0.9rem] leading-[1.48] text-ink-light">{children}</div>
      <Link href={to} scroll={false} className="link-underline mt-4">
        {label}
        <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
      </Link>
    </div>
  );
}

/** Rounded photo for a journey step. */
export function JourneyPhoto({
  src,
  alt,
  aspect,
}: {
  src: string;
  alt: string;
  aspect: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${aspect}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
    </div>
  );
}

/** Renders one journey's steps from its content record. */
export function JourneySteps({ steps }: { steps: JourneyStepContent[] }) {
  return (
    <>
      {steps.map((st, i) => {
        const hasNext = Boolean(st.next?.title || st.next?.paras?.some(Boolean));
        const aside = st.image ? (
          <JourneyPhoto src={st.image} alt={st.imageAlt} aspect={st._aspect || "aspect-[16/10]"} />
        ) : hasNext ? (
          <JourneyNext title={st.next.title} to={st.next.href || "/recycling-green-waste"} label={st.next.label}>
            <Paras items={st.next.paras} />
          </JourneyNext>
        ) : undefined;
        return (
          <JourneyStep key={i} n={i + 1} title={st.title} aside={aside}>
            <Paras items={st.paras} />
            {st.quote && <JourneyQuote>{st.quote}</JourneyQuote>}
            {st.cards?.length > 0 && (
              <div className="!mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {st.cards.map((m, j) => (
                  <ImageCard key={j} image={m.image} imageAlt={m.imageAlt} title={m.title} body={m.body} aspect="aspect-[193/78]" />
                ))}
              </div>
            )}
            {st.highlight && (
              <p className="!mt-6 rounded-lg bg-brand-50 px-5 py-4 text-center text-[1rem] font-700 italic leading-[1.4] text-brand-700">
                {st.highlight}
              </p>
            )}
          </JourneyStep>
        );
      })}
    </>
  );
}
