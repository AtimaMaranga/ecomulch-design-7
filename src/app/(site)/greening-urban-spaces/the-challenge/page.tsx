import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LeafPairIcon } from "@/components/icons";
import {
  BigTitle,
  ExploreStrip,
  IconDisc,
  IntroHero,
  SmartLink,
  SplitHead,
  StatementStrip,
  TitleRule,
  tintClass,
} from "@/components/section/explore";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent } from "@/lib/content/store";
import { GUS_CHALLENGE } from "@/lib/content/defaults/gus-challenge";
import { ic } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Urban Greening Challenge",
  description:
    "Where we grow plants in built-up environments, what growing plants requires, and how EcoMulch is responding to the urban greening challenge.",
};

const BODY = "text-[1.02rem] leading-[1.5] text-pine-deep/85 sm:text-[1.08rem] xl:text-[1.15rem]";

export default async function UrbanGreeningChallengePage() {
  const { intro, explore, growing, needs, response } = await getPageContent(
    "greening-urban-spaces--the-challenge",
    GUS_CHALLENGE,
  );

  return (
    <>
      <SectionCrumbs
        topId="page-top"
        items={[
          { label: "Greening Urban Spaces", href: "/greening-urban-spaces" },
          { label: "The Urban Greening Challenge", short: "The Challenge" },
        ]}
      />

      <IntroHero
        id="page-top"
        eyebrow={intro.eyebrow}
        title={intro.title}
        image={intro.image}
        mobileImage={intro.mobileImage || undefined}
        imageAlt={intro.imageAlt}
        photo="edge"
        mobileAspect="aspect-[732/301]"
      >
        {intro.paras.map((p, i) => (
          <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
        ))}
      </IntroHero>

      <div className="pt-5 lg:pt-0">
        <ExploreStrip
          title={explore.title}
          lede={explore.lede}
          options={explore.options.map((o) => ({ icon: ic(o.icon), title: o.title, href: o.href, tone: o._tone }))}
        />
      </div>

      {/* Where we grow plants */}
      <section id="where-we-grow-plants" className="below-crumbs pt-12 lg:pt-16">
        <div className="container-site">
          <BigTitle>{growing.title}</BigTitle>
          <TitleRule className="mt-4" />
          <p className={`mt-5 ${BODY}`}>{rich(growing.lede, "font-800 text-pine-deep")}</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {growing.situations.map((c, i) => (
              <article key={i} className={`flex flex-col rounded-2xl p-4 sm:p-6 xl:p-7 ${tintClass(c._tone)}`}>
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-700 text-[1.35rem] font-800 text-white sm:h-12 sm:w-12 sm:text-[1.5rem]">
                    {i + 1}
                  </span>
                  <span aria-hidden="true" className="h-10 w-px shrink-0 bg-pine-deep/25" />
                  <h3 className="text-[1.25rem] font-800 leading-[1.2] tracking-[-0.01em] text-pine-deep sm:text-[1.45rem] xl:text-[1.65rem]">
                    {c.title}
                  </h3>
                </div>
                <div className="relative mt-4 aspect-[613/214] overflow-hidden rounded-xl">
                  <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                </div>
                <p className={`mt-4 ${BODY}`}>{rich(c.body, "font-800 text-pine-deep")}</p>
                {c.highlight && (
                  <p className="mt-3 border-l-4 border-brand-700 pl-4 text-[1.08rem] font-800 leading-[1.3] text-pine-deep sm:text-[1.2rem] xl:text-[1.3rem]">
                    {c.highlight}
                  </p>
                )}
              </article>
            ))}
          </div>
          <StatementStrip icon={LeafPairIcon}>{growing.statement}</StatementStrip>
        </div>
      </section>

      {/* What growing plants requires */}
      <section id="what-growing-plants-requires" className="below-crumbs pt-10 lg:pt-12">
        <div className="container-site">
          <div className="border-t border-line pt-10 lg:pt-12">
            <SplitHead title={needs.title}>
              <p>{rich(needs.body, "font-800 text-pine-deep")}</p>
            </SplitHead>
          </div>
          <h3 className="mt-8 text-[1.25rem] font-800 leading-[1.3] text-brand-700 sm:text-[1.5rem] xl:text-[1.75rem]">
            {needs.listTitle}
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {needs.items.map((it, i) => (
              <li key={i} className="flex gap-4 rounded-2xl border border-brand-100/70 bg-wash-mint/70 p-4 xl:p-5">
                <IconDisc
                  icon={ic(it.icon)}
                  tone={it._tone}
                  color={it._color}
                  className="h-14 w-14 sm:h-16 sm:w-16 xl:h-20 xl:w-20"
                  iconClassName="h-7 w-7 sm:h-8 sm:w-8 xl:h-10 xl:w-10"
                />
                <div>
                  <h4 className="text-[1.12rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.25rem] xl:text-[1.4rem]">{it.title}</h4>
                  <p className="mt-1.5 text-[0.98rem] leading-[1.45] text-pine-deep/85 xl:text-[1.06rem]">{it.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <StatementStrip icon={LeafPairIcon}>{needs.statement}</StatementStrip>
        </div>
      </section>

      {/* How EcoMulch is responding */}
      <section id="how-ecomulch-is-responding" className="below-crumbs pb-16 pt-10 lg:pb-20 lg:pt-12">
        <div className="container-site">
          <div className="border-t border-line pt-10 lg:pt-12">
            <SplitHead title={response.title} titleWidth="lg:w-[50%]">
              <p>{rich(response.body, "font-800 text-pine-deep")}</p>
            </SplitHead>
          </div>
          <p className="mt-8 text-[1rem] font-800 uppercase tracking-[0.02em] text-brand-600 sm:text-[1.1rem] xl:text-[1.25rem]">
            {response.areasLabel}
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-5">
            {response.areas.map((a, i) => (
              <article key={i} className="flex overflow-hidden rounded-2xl bg-wash-cream">
                <div className="relative hidden w-[37%] shrink-0 sm:block">
                  <Image src={a.image} alt={a.imageAlt} fill sizes="(max-width: 1024px) 37vw, 18vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:hidden">
                      <Image src={a.image} alt="" fill sizes="80px" className="object-cover" />
                    </div>
                    <h3 className="text-[1.22rem] font-800 leading-[1.2] tracking-[-0.01em] text-pine-deep sm:text-[1.4rem] xl:text-[1.6rem]">
                      {a.title}
                    </h3>
                  </div>
                  <p className={`mt-3 ${BODY}`}>{a.body}</p>
                  <div className="mt-auto pt-5">
                    <SmartLink
                      href={a.href}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-700 px-6 py-3 text-[1rem] font-800 text-white transition-colors hover:bg-brand-800 sm:w-auto sm:text-[1.05rem]"
                    >
                      {a.cta}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
                    </SmartLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
