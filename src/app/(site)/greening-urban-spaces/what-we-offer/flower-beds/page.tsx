import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, Play } from "lucide-react";
import { IconBadge } from "@/components/section/blocks";
import { ExpandGrid, type ExpandItem, type ExpandTone } from "@/components/section/expand-grid";
import { AreaNote, Cta, SectionHead } from "@/components/section/v2";
import { ExploreColumns, IconDisc, IntroHero, Kicker, SmartLink } from "@/components/section/explore";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { FLOWER_BEDS } from "@/lib/content/defaults/flower-beds";
import { badge, ic, linkFor, twoTone } from "@/lib/content/page-helpers";
import { Paras, rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transforming Urban Flower Beds",
  description:
    "Creating healthier, more attractive flower beds through thoughtful plant selection, improved growing conditions, soil protection and ongoing care.",
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
  const { intro, explore, challenge, approach, discover, series, transform, area } = c;
  const plain = (t: string) => t.replace(/\s*\n\s*/g, " ");

  return (
    <>
      <SectionCrumbs
        topId="page-top"
        items={[
          { label: "Greening Urban Spaces", href: "/greening-urban-spaces" },
          { label: "Transforming Urban Flower Beds", short: "Flower Beds" },
        ]}
        sections={[
          { id: "understand-the-challenge", label: plain(challenge.title) },
          { id: "our-approach", label: approach.eyebrow },
          { id: "discover-and-engage", label: plain(`${discover.title} ${discover.titleAccent}`) },
        ]}
      />

      <IntroHero
        id="page-top"
        eyebrow={intro.eyebrow}
        title={intro.title}
        image={intro.image}
        mobileImage={intro.mobileImage || undefined}
        imageAlt={intro.imageAlt}
        photo="framed"
        mobileAspect="aspect-[733/243]"
      >
        <Paras items={intro.paras} />
      </IntroHero>

      <div className="pt-5 lg:pt-0">
        <ExploreColumns
          title={explore.title}
          lede={explore.lede}
          options={explore.options.map((o) => ({ icon: ic(o.icon), title: o.title, body: o.body, href: o.href, tone: o._tone }))}
        />
      </div>

      {/* Understand the Challenge */}
      <section id="understand-the-challenge" className="below-crumbs pt-12 lg:pt-16">
        <div className="container-site">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.17fr)] lg:items-center lg:gap-8">
            <div>
              <Kicker className="mb-4">{challenge.eyebrow}</Kicker>
              <h2 className="text-[clamp(1.7rem,7.6vw,2.6rem)] font-800 leading-[1.08] tracking-[-0.02em] text-pine-deep lg:text-[3rem] xl:text-[3.45rem]">
                {challenge.title}
              </h2>
              <p className="mt-3 text-[1.02rem] leading-[1.5] text-pine-deep/85 sm:text-[1.1rem] lg:mt-5 xl:text-[1.2rem]">
                {rich(challenge.intro, "font-800 text-pine-deep")}
              </p>
            </div>
            <div className="relative mt-5 aspect-[589/190] overflow-hidden rounded-2xl shadow-photo sm:mt-6 lg:mt-0 lg:aspect-[774/308] lg:rounded-[1.4rem]">
              <Image
                src={challenge.image}
                alt={challenge.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="hidden object-cover lg:block"
              />
              <Image
                src={challenge.mobileImage || challenge.image}
                alt={challenge.imageAlt}
                fill
                sizes="100vw"
                className="object-cover lg:hidden"
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-wash-mint-from to-wash-mint-to p-3 sm:p-5 lg:mt-8 lg:p-6">
            <h3 className="px-1 text-[1.3rem] font-800 leading-[1.2] tracking-[-0.01em] text-pine-deep sm:text-[1.6rem] xl:text-[2.1rem]">
              {challenge.listTitle}
            </h3>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:mt-5 lg:gap-3 xl:grid-cols-4">
              {challenge.items.map((it, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-xl bg-white p-3.5 shadow-hair sm:p-4 xl:flex-col xl:gap-0 xl:rounded-2xl xl:p-5"
                >
                  <div className="flex items-center gap-4">
                    <IconDisc
                      icon={ic(it.icon)}
                      tone={it._tone}
                      color={it._color}
                      className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] xl:h-20 xl:w-20"
                      iconClassName="h-10 w-10 sm:h-11 sm:w-11 xl:h-12 xl:w-12"
                    />
                    <h4 className="hidden text-[1.5rem] font-800 leading-[1.15] text-pine-deep xl:block">{it.title}</h4>
                  </div>
                  <div className="xl:mt-4">
                    <h4 className="text-[1.15rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.25rem] xl:hidden">{it.title}</h4>
                    <p className="mt-1 text-[0.98rem] leading-[1.42] text-pine-deep/85 sm:text-[1.02rem] xl:mt-0 xl:text-[1.08rem]">
                      {it.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-2xl bg-gradient-to-r from-wash-mint-from to-wash-mint-to px-5 py-5 sm:px-7 lg:mt-5 lg:flex lg:items-center lg:gap-10 lg:py-6 xl:px-12">
            <div className="lg:flex-1">
              <h3 className="text-[1.2rem] font-800 leading-[1.25] text-pine-deep sm:text-[1.4rem] xl:text-[1.75rem]">
                {challenge.nextTitle}
              </h3>
              <p className="mt-2 text-[1rem] leading-[1.45] text-pine-deep/85 sm:text-[1.08rem] xl:text-[1.2rem]">{challenge.nextBody}</p>
            </div>
            <span aria-hidden="true" className="hidden h-20 w-px shrink-0 bg-brand-700/40 lg:block" />
            <SmartLink
              href={challenge.nextHref}
              className="group mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-brand-600 px-7 py-3.5 text-[1.05rem] font-800 text-white shadow-go transition-colors hover:bg-brand-700 lg:mt-0 lg:w-auto lg:shrink-0 xl:px-12 xl:text-[1.15rem]"
            >
              {challenge.nextCta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
            </SmartLink>
          </div>
        </div>
      </section>

      <section id="our-approach" className="below-crumbs mt-12 bg-gradient-to-b from-wash-mint to-white pb-4 pt-9 lg:mt-14">
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

      <section id="discover-and-engage" className="below-crumbs pt-10">
        <div className="container-site">
          <SectionHead
            rule
            eyebrow={discover.eyebrow}
            title={twoTone(discover.title, discover.titleAccent)}
            lede={rich(discover.lede)}
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article id="from-ordinary-to-amazing" className={`below-crumbs ${CARD}`}>
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

            <article id="transform-your-flower-bed" className={`below-crumbs ${CARD}`}>
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
