import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, Play } from "lucide-react";
import { IconBadge } from "@/components/section/blocks";
import { ExpandGrid, type ExpandItem, type ExpandTone } from "@/components/section/expand-grid";
import { AreaNote, Cta, FadeHero, SectionHead } from "@/components/section/v2";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { FLOWER_BEDS } from "@/lib/content/defaults/flower-beds";
import { badge, ic, linkFor, twoTone } from "@/lib/content/page-helpers";
import { Paras, rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transforming Urban Flower Beds",
  description:
    "Creating healthier, more attractive flower beds that can thrive over time — the challenges we commonly encounter and our step-by-step approach to transforming them.",
};

type Point = { _tone: string; icon: string; title: string; body: string };
type Panel = {
  _tone: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
  title: string;
  body: string;
  detail: { image: string; imageAlt: string; title: string; subtitle: string; paras: string[]; points: Point[]; footer?: string };
};

const smallBadge = (p: Point) => (
  <IconBadge icon={ic(p.icon)} tone={badge(p._tone)} className="h-[52px] w-[52px]" iconClassName="h-6 w-6" />
);

function toItems(list: Panel[], step: boolean): ExpandItem[] {
  return list.map((it, i) => ({
    key: `${step ? "step" : "ch"}-${i}`,
    tone: (step ? "white" : "mint") as ExpandTone,
    image: it.image,
    imageAlt: it.imageAlt,
    badge: step ? (
      <IconBadge
        icon={ic(it.icon)}
        tone={badge(it._tone)}
        className="h-[78px] w-[78px] xl:h-[96px] xl:w-[96px]"
        iconClassName="h-9 w-9 xl:h-12 xl:w-12"
      />
    ) : undefined,
    title: it.title,
    body: rich(it.body),
    detail: { ...it.detail, points: it.detail.points.map((p) => ({ ...p, badge: smallBadge(p) })) },
  }));
}

function MiniColumns({ items }: { items: Point[] }) {
  return (
    <ul className="mt-6 grid gap-y-6 sm:grid-cols-3">
      {items.map((it, i) => (
        <li key={i} className={`flex flex-col items-center px-3 text-center ${i > 0 ? "sm:border-l sm:border-line" : ""}`}>
          <IconBadge icon={ic(it.icon)} tone={badge(it._tone)} className="h-[64px] w-[64px]" iconClassName="h-8 w-8" />
          <h4 className="mt-3 text-[0.98rem] font-800 text-ink">{it.title}</h4>
          <p className="mt-1 max-w-[12rem] text-[0.9rem] leading-[1.4] text-ink-light">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

const CARD =
  "flex flex-col rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(12,40,82,0.06),0_6px_18px_-8px_rgba(12,40,82,0.12)] sm:p-5";

export default async function FlowerBedsPage() {
  const [c, links] = await Promise.all([
    getPageContent("greening-urban-spaces--what-we-offer--flower-beds", FLOWER_BEDS),
    linkSettings(),
  ]);
  const { hero, challenges, approach, discover, series, transform, area } = c;

  return (
    <>
      <FadeHero
        image={hero.image}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        textWidth="max-w-[38rem]"
        minHeight="md:min-h-[clamp(420px,38vw,560px)]"
        title={twoTone(hero.title, hero.titleAccent, true)}
        subtitle={hero.subtitle}
      >
        <Paras items={hero.paras} />
      </FadeHero>

      <section className="pt-7">
        <div className="container-site">
          <h2 className="text-[1.4rem] font-800 leading-[1.25] text-ink sm:text-[1.6rem]">{challenges.title}</h2>
          <div className="mt-5">
            <ExpandGrid items={toItems(challenges.items, false)} variant="photo" closeLabel="Show Less" panelClose />
          </div>
        </div>
      </section>

      <section className="mt-10 bg-gradient-to-b from-[#f1f8f2] to-white pb-4 pt-9">
        <div className="container-site">
          <SectionHead
            eyebrow={approach.eyebrow}
            title={twoTone(approach.title, approach.titleAccent)}
            lede={
              <>
                <p className="text-[1.08rem] font-800 text-ink sm:text-[1.15rem]">{approach.subtitle}</p>
                <Paras items={approach.paras} />
              </>
            }
          />
          <div className="mt-7">
            <ExpandGrid items={toItems(approach.steps, true)} variant="step" closeLabel="Show Less" panelClose />
          </div>
        </div>
      </section>

      <section className="pt-10">
        <div className="container-site">
          <SectionHead
            rule
            eyebrow={discover.eyebrow}
            title={twoTone(discover.title, discover.titleAccent)}
            lede={rich(discover.lede)}
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className={CARD}>
              <div className="relative grid grid-cols-2 gap-1.5 overflow-hidden rounded-lg">
                {[
                  { src: series.beforeImage, alt: series.beforeAlt, label: series.beforeLabel, cls: "bg-black/75" },
                  { src: series.afterImage, alt: series.afterAlt, label: series.afterLabel, cls: "bg-brand-700" },
                ].map((p, i) => (
                  <div key={i} className="relative aspect-[331/252]">
                    <Image src={p.src} alt={p.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                    {p.label && (
                      <span className={`absolute bottom-3 left-3 rounded-md px-4 py-1.5 text-[0.95rem] font-700 text-white ${p.cls}`}>
                        {p.label}
                      </span>
                    )}
                  </div>
                ))}
                <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-700 shadow-md">
                  <ArrowRight className="h-6 w-6" strokeWidth={2.4} />
                </span>
              </div>
              <h3 className="mt-5 text-[1.6rem] font-800 tracking-[-0.01em] text-ink">{series.title}</h3>
              <p className="mt-2 text-[1rem] leading-[1.5] text-ink-light">{rich(series.body)}</p>
              <MiniColumns items={series.points} />
              <a
                href={linkFor(series.ctaHref, links)}
                target="_blank"
                rel="noopener noreferrer"
                className="group/yt mt-auto flex items-center justify-center gap-4 rounded-md border-[1.5px] border-ink/70 px-5 py-3.5 text-[1.02rem] font-800 text-ink transition-colors [margin-top:1.75rem] hover:bg-surface-tint"
              >
                <span className="grid h-8 w-11 shrink-0 place-items-center rounded-lg bg-[#ff0000] text-white">
                  <Play className="h-4 w-4 fill-current" strokeWidth={0} />
                </span>
                {series.cta}
                <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover/yt:translate-x-1" strokeWidth={2.2} />
              </a>
            </article>

            <article className={CARD}>
              <div className="relative aspect-[673/254] overflow-hidden rounded-lg">
                <Image src={transform.image} alt={transform.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <h3 className="mt-5 text-[1.6rem] font-800 tracking-[-0.01em] text-brand-700">{transform.title}</h3>
              <div className="mt-2 space-y-2.5 text-[1rem] leading-[1.5] text-ink-light">
                <Paras items={transform.paras} />
              </div>
              <MiniColumns items={transform.points} />
              <div className="mt-auto [padding-top:1.75rem]">
                <Cta href={linkFor(transform.ctaHref, links)} whatsapp={transform.ctaHref === "{whatsapp}"} block size="lg">
                  {transform.cta}
                </Cta>
              </div>
            </article>
          </div>
        </div>
      </section>

      {area.text && (
        <AreaNote>
          <MapPin className="h-7 w-7 shrink-0 text-brand-700" strokeWidth={2} />
          <span>{rich(area.text, "font-800 text-ink")}</span>
        </AreaNote>
      )}
      <div aria-hidden="true" className="h-16" />
    </>
  );
}
