import type { Metadata } from "next";
import { SproutTrioIcon } from "@/components/icons";
import { SubHero } from "@/components/who/sub-hero";
import { CrumbBar, SectionTitle } from "@/components/who/sub-parts";
import { FeatureCard, ValuesStrip } from "@/components/section/blocks";
import { getPageContent } from "@/lib/content/store";
import { GUS_OFFER } from "@/lib/content/defaults/gus-offer";
import { badge, ic } from "@/lib/content/page-helpers";
import { Paras } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "What We Offer",
  description:
    "Two practical ways EcoMulch is helping bring plants into the spaces where people live and work: curated indoor and patio plants, and transformed urban flower beds.",
};

export default async function WhatWeOfferPage() {
  const { hero, offers } = await getPageContent("greening-urban-spaces--what-we-offer", GUS_OFFER);

  return (
    <>
      <SubHero
        wide
        tone="light"
        layout="split"
        image={hero.image}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        eyebrowIcon={SproutTrioIcon}
        title={
          <>
            {hero.title} {hero.titleAccent && <span className="hero-accent">{hero.titleAccent}</span>}
          </>
        }
        body={
          <>
            <Paras items={hero.paras} />
            {hero.highlight && <p className="font-700 text-brand-600">{hero.highlight}</p>}
          </>
        }
      />

      <CrumbBar
        wide
        items={[
          { label: "Home", href: "/" },
          { label: "Greening Urban Spaces", href: "/greening-urban-spaces" },
          { label: "What We Offer" },
        ]}
      />

      <section className="pb-4 pt-9">
        <div className="container-site">
          <SectionTitle lede={offers.lede}>{offers.title}</SectionTitle>
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-[22px]">
            {offers.cards.map((c, i) => (
              <FeatureCard
                key={i}
                image={c.image}
                imageAlt={c.imageAlt}
                icon={ic(c.icon)}
                badge={badge(c._tone)}
                title={c.title}
                body={c.body}
                cta={c.cta}
                href={c.href}
              />
            ))}
          </div>
        </div>
      </section>

      <ValuesStrip />
    </>
  );
}
