import type { Metadata } from "next";
import { WasteIcon } from "@/components/icons";
import { SubHero } from "@/components/who/sub-hero";
import { CrumbBar, Photo, SectionTitle } from "@/components/who/sub-parts";
import { Copy, CtaBand, IconColumns, ImageCard, ValuesStrip } from "@/components/section/blocks";
import { getPageContent } from "@/lib/content/store";
import { RGW_CHALLENGE } from "@/lib/content/defaults/rgw-challenge";
import { badge, ic } from "@/lib/content/page-helpers";
import { Paras } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Green Waste Challenge",
  description:
    "What is green waste, where does it come from, and why does finding better uses for it matter for healthier, more sustainable towns and cities?",
};

export default async function GreenWasteChallengePage() {
  const { hero, growing, differently, kinds, matters, journey } = await getPageContent(
    "recycling-green-waste--the-challenge",
    RGW_CHALLENGE,
  );

  return (
    <>
      <SubHero
        wide
        tone="light"
        layout="split"
        image={hero.image}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        eyebrowIcon={WasteIcon}
        title={hero.title}
        subtitle={hero.subtitle}
        body={<Paras items={hero.paras} />}
      />

      <CrumbBar
        wide
        items={[
          { label: "Home", href: "/" },
          { label: "Recycling Green Waste", href: "/recycling-green-waste" },
          { label: "The Challenge" },
        ]}
      />

      <section className="pb-6 pt-8">
        <div className="container-site">
          <SectionTitle lede={growing.lede}>{growing.title}</SectionTitle>
          <div className="mt-8">
            <IconColumns items={growing.items.map((it) => ({ ...it, icon: ic(it.icon), tone: badge(it._tone) }))} />
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container-site">
          <div className="grid items-center gap-8 rounded-xl bg-surface-tint p-5 sm:p-6 lg:grid-cols-[350fr_560fr] lg:gap-9">
            <Photo src={differently.image} alt={differently.imageAlt} className="aspect-[369/198]" />
            <div>
              <SectionTitle>{differently.title}</SectionTitle>
              <Copy className="mt-5">
                <Paras items={differently.paras} />
              </Copy>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 pt-8">
        <div className="container-site">
          <SectionTitle lede={kinds.lede}>{kinds.title}</SectionTitle>
          <div className="mt-7 grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {kinds.items.map((k, i) => (
              <ImageCard
                key={i}
                image={k.image}
                imageAlt={k.imageAlt}
                title={k.title}
                body={k.body}
                surface="none"
                aspect="aspect-[203/96]"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-6 pt-6">
        <div className="container-site">
          <SectionTitle>{matters.title}</SectionTitle>
          <Copy className="mt-5 max-w-[56rem]">
            <Paras items={matters.paras} />
          </Copy>
        </div>
      </section>

      <section className="pt-6">
        <CtaBand
          image={journey.image}
          title={journey.title}
          body={journey.body}
          cta={{ label: journey.cta, href: journey.ctaHref }}
        />
      </section>

      <ValuesStrip />
    </>
  );
}
