import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, Play } from "lucide-react";
import { IntroHero, SmartLink } from "@/components/section/explore";
import { BODY, ChallengeCards, GoButton, H2, Panel, StepFlow } from "@/components/section/osc";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { FLOWER_BEDS } from "@/lib/content/defaults/flower-beds";
import { ic, linkFor } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transforming Urban Flower Beds",
  description:
    "Healthier, more attractive flower beds through thoughtful plant selection, improved growing conditions, soil protection and ongoing care.",
};

/** The seed value for the video link is YouTube's home page: treat it as "not set yet". */
const isRealVideo = (url: string) => Boolean(url) && !/^https?:\/\/(www\.)?youtube\.com\/?$/.test(url.trim());

export default async function FlowerBedsPage() {
  const [c, links] = await Promise.all([
    getPageContent("greening-urban-spaces--what-we-offer--flower-beds", FLOWER_BEDS),
    linkSettings(),
  ]);
  const { intro, challenges, method: approach, talk: transform, showcase: series } = c;
  const video = linkFor(series.ctaHref, links);

  return (
    <>
      <SectionCrumbs
        items={[
          { label: "Greening Urban Spaces", href: "/greening-urban-spaces" },
          { label: "Transforming Urban Flower Beds", short: "Flower Beds" },
        ]}
      />

      <IntroHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        image={intro.image}
        imageAlt={intro.imageAlt}
        photo="framed"
        mobileAspect="aspect-[508/246]"
        framedAspect="aspect-[508/246]"
      >
        {intro.paras.map((p, i) => (
          <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
        ))}
      </IntroHero>

      <section className="pt-2 lg:pt-0">
        <div className="container-site">
          <ChallengeCards
            title={challenges.title}
            lede={<p>{rich(challenges.lede)}</p>}
            items={challenges.items.map((it) => ({ ...it, icon: ic(it.icon), tone: it._tone, color: it._color }))}
          />
        </div>
      </section>

      <section className="pt-10 lg:pt-12">
        <div className="container-site">
          <h2 className={H2}>{approach.title}</h2>
          <p className={`mt-2 ${BODY}`}>{rich(approach.body)}</p>
          <Panel className="mt-5">
            <StepFlow steps={approach.steps.map((s) => ({ ...s, icon: ic(s.icon), tone: s._tone, color: s._color }))} />
          </Panel>
        </div>
      </section>

      <section className="pt-8 lg:pt-10">
        <div className="container-site">
          <Panel>
            <div className="lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
              <div>
                <span aria-hidden="true" className="mb-4 block h-1.5 w-20 rounded-full bg-brand-600" />
                <h2 className="text-[1.6rem] font-800 leading-[1.1] tracking-[-0.02em] text-pine-deep sm:text-[2rem] xl:text-[2.6rem]">
                  {transform.title}
                </h2>
                <div className={`mt-3 space-y-2.5 ${BODY}`}>
                  {transform.paras.map((p, i) => (
                    <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
                  ))}
                </div>
                <div className="relative mt-5 aspect-[457/211] overflow-hidden rounded-2xl lg:hidden">
                  <Image src={transform.image} alt={transform.imageAlt} fill sizes="100vw" className="object-cover" />
                </div>
                <div className="mt-5">
                  <GoButton href={linkFor(transform.ctaHref, links)} lead="whatsapp" block>
                    {transform.cta}
                  </GoButton>
                </div>
              </div>
              <div className="relative hidden aspect-[457/211] overflow-hidden rounded-2xl lg:block">
                <Image src={transform.image} alt={transform.imageAlt} fill sizes="50vw" className="object-cover" />
              </div>
            </div>
            {transform.area && (
              <p className={`mt-5 flex items-center gap-3 border-t border-brand-600/20 pt-4 ${BODY}`}>
                <MapPin className="h-6 w-6 shrink-0 text-brand-700" strokeWidth={2} />
                <span aria-hidden="true" className="h-6 w-px shrink-0 bg-pine-deep/30" />
                <span>{rich(transform.area, "font-800 text-pine-deep")}</span>
              </p>
            )}
          </Panel>
        </div>
      </section>

      <section className="pb-16 pt-7 lg:pb-20 lg:pt-9">
        <div className="container-site">
          {series.divider && (
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px flex-1 bg-brand-600/40" />
              <p className="rounded-full bg-wash-mint px-5 py-2 text-center text-[0.98rem] font-800 text-pine-deep sm:text-[1.08rem]">
                {series.divider}
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-brand-600/40" />
            </div>
          )}
          <article className="mt-5 rounded-2xl bg-white p-3 shadow-float sm:p-4 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-center lg:gap-8 lg:p-5">
            <div className="relative grid grid-cols-2 gap-1.5 overflow-hidden rounded-xl">
              {[
                { src: series.beforeImage, alt: series.beforeAlt, label: series.beforeLabel, cls: "bg-pine-deep/80" },
                { src: series.afterImage, alt: series.afterAlt, label: series.afterLabel, cls: "bg-brand-700" },
              ].map((p, i) => (
                <div key={i} className="relative aspect-[331/252]">
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                  {p.label && (
                    <span className={`absolute bottom-2.5 left-2.5 rounded-md px-3 py-1 text-[0.9rem] font-700 text-white ${p.cls}`}>
                      {p.label}
                    </span>
                  )}
                </div>
              ))}
              <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-700 shadow-md">
                <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
              </span>
            </div>
            <div className="px-1 pb-1 pt-4 lg:p-0">
              <h2 className="text-[1.6rem] font-800 leading-[1.1] tracking-[-0.02em] text-pine-deep sm:text-[2rem] xl:text-[2.5rem]">
                {series.title}
              </h2>
              <p className={`mt-2 ${BODY}`}>{rich(series.body)}</p>
              {isRealVideo(video) && (
                <SmartLink
                  href={video}
                  className="group mt-5 flex w-full items-center justify-center gap-3 rounded-full border-2 border-pine-deep/70 px-5 py-3 text-[1rem] font-800 text-pine-deep transition-colors hover:bg-wash-mint sm:w-auto sm:text-[1.05rem] lg:inline-flex"
                >
                  <span className="grid h-7 w-10 shrink-0 place-items-center rounded-lg bg-glyph-red text-white">
                    <Play className="h-4 w-4 fill-current" strokeWidth={0} />
                  </span>
                  {series.cta}
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
                </SmartLink>
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
