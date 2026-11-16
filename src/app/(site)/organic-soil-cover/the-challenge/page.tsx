import type { Metadata } from "next";
import Image from "next/image";
import { LeafPairIcon } from "@/components/icons";
import { IconDisc, IntroHero } from "@/components/section/explore";
import { ActionStrip, BODY, FactorCard, GoButton, H3, SectionLead } from "@/components/section/osc";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent } from "@/lib/content/store";
import { OSC_CHALLENGE } from "@/lib/content/defaults/organic-soil-cover";
import { ic } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Organic Soil Cover Challenge",
  description:
    "Why bare soil remains so common in our urban landscapes, and why leaving soil exposed matters for growing conditions, maintenance and appearance.",
};

export default async function OscChallengePage() {
  const { intro, why, matters, next } = await getPageContent("organic-soil-cover--the-challenge", OSC_CHALLENGE);
  return (
    <>
      <SectionCrumbs
        items={[
          { label: "Organic Soil Cover", href: "/organic-soil-cover" },
          { label: "The Challenge" },
        ]}
      />
      <IntroHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        image={intro.image}
        imageAlt={intro.imageAlt}
        photo="fade"
        mobileAspect="aspect-[605/300]"
      >
        {intro.paras.map((p, i) => (
          <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
        ))}
      </IntroHero>

      <section className="pt-9 lg:pt-11">
        <div className="container-site">
          <SectionLead title={why.title} lede={rich(why.lede)} />
          <div className="mt-5 grid gap-3 lg:grid-cols-2 lg:gap-5">
            {why.items.map((it, i) => (
              <FactorCard
                key={i}
                icon={ic(it.icon)}
                tone={it._tone}
                color={it._color}
                surface={it._surface === "cream" ? "cream" : "mint"}
                title={it.title}
              >
                {rich(it.body)}
              </FactorCard>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-10 lg:pt-12">
        <div className="container-site">
          <SectionLead title={matters.title} lede={rich(matters.lede)} />
          <ul className="mt-5 grid gap-3 lg:grid-cols-3 lg:gap-5">
            {matters.items.map((it, i) => (
              <li key={i} className="flex gap-3 sm:gap-4 lg:flex-col lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:bg-wash-cream/60 lg:shadow-hair">
                <div className="relative w-[34%] shrink-0 overflow-hidden rounded-xl lg:aspect-[345/120] lg:w-full lg:rounded-none">
                  <Image src={it.image} alt={it.imageAlt} fill sizes="(max-width: 1024px) 34vw, 30vw" className="object-cover" />
                </div>
                <div className="flex-1 rounded-xl bg-wash-cream/60 p-3.5 sm:p-4 lg:rounded-none lg:bg-transparent lg:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <IconDisc
                      icon={ic(it.icon)}
                      tone={it._tone}
                      color={it._color}
                      className="hidden h-12 w-12 sm:grid lg:h-16 lg:w-16"
                      iconClassName="h-6 w-6 lg:h-8 lg:w-8"
                    />
                    <span aria-hidden="true" className="hidden h-10 w-px shrink-0 bg-pine-deep/25 sm:block" />
                    <h3 className={H3}>{it.title}</h3>
                  </div>
                  <p className={`mt-2 ${BODY}`}>{rich(it.body)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-16 pt-10 lg:pb-20 lg:pt-12">
        <div className="container-site">
          <ActionStrip icon={LeafPairIcon} title={next.title} action={<GoButton href={next.href} block>{next.cta}</GoButton>}>
            {rich(next.body)}
          </ActionStrip>
        </div>
      </section>
    </>
  );
}
