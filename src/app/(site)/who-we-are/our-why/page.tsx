import type { Metadata } from "next";
import { Earth } from "lucide-react";
import { HeartOutlineIcon } from "@/components/icons";
import { SubHero } from "@/components/who/sub-hero";
import { CrumbBar, Photo, SectionTitle } from "@/components/who/sub-parts";
import { getPageContent } from "@/lib/content/store";
import { WHO_WHY } from "@/lib/content/defaults/who-why";
import { ic, lines } from "@/lib/content/page-helpers";
import { Paras } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Why",
  description:
    "Why sustainable urban greening matters — making room for plants, soils, water and biodiversity as our towns and cities grow.",
};

export default async function OurWhyPage() {
  const { hero, what, challenges, opportunity, benefits } = await getPageContent("who-we-are--our-why", WHO_WHY);

  return (
    <>
      <SubHero
        image={hero.image}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        eyebrowIcon={HeartOutlineIcon}
        title={hero.title}
        subtitleClassName="font-600"
        subtitle={hero.subtitle}
      />

      <CrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Who We Are", href: "/who-we-are" },
          { label: "Our Why" },
        ]}
      />

      <section className="pb-6 pt-7">
        <div className="container-narrow grid items-start gap-8 lg:grid-cols-[1fr_1.08fr] lg:gap-11">
          <Photo src={what.image} alt={what.imageAlt} className="aspect-[419/267]" />
          <div className="pt-2">
            <SectionTitle size="lg">{lines(what.title)}</SectionTitle>
            <div className="mt-6 space-y-5 text-[0.95rem] leading-[1.45] text-ink-light">
              <Paras items={what.paras} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-10">
          <div className="grid items-start gap-8 rounded-xl bg-surface-tint px-5 py-6 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:px-5 lg:py-6">
            <div className="pt-1">
              <SectionTitle size="lg">{challenges.title}</SectionTitle>
              <div className="mt-6 space-y-3 text-[0.9rem] leading-[1.42] text-ink-light">
                <Paras items={challenges.paras} />
              </div>
              {challenges.note && (
                <div className="mt-6 flex items-center gap-4">
                  <Earth className="h-11 w-11 shrink-0 text-brand-600" strokeWidth={1.5} />
                  <p className="max-w-[24rem] text-[0.9rem] leading-[1.42] text-ink-light">{challenges.note}</p>
                </div>
              )}
            </div>
            <Photo src={challenges.image} alt={challenges.imageAlt} className="aspect-[383/268]" />
          </div>
        </div>
      </section>

      <section className="pb-4 pt-6">
        <div className="container-narrow grid items-start gap-8 lg:grid-cols-[1fr_1.08fr] lg:gap-11">
          <Photo src={opportunity.image} alt={opportunity.imageAlt} className="aspect-[419/225]" />
          <div className="pt-1">
            <SectionTitle size="lg">{opportunity.title}</SectionTitle>
            <div className="mt-5 space-y-4 text-[0.95rem] leading-[1.45]">
              <Paras items={opportunity.paras} className="text-ink-light" />
              {opportunity.highlight && <p className="font-700 text-brand-600">{opportunity.highlight}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-6">
        <div className="container-narrow">
          <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {benefits.items.map((b, i) => {
              const Icon = ic(b.icon);
              return (
                <li
                  key={i}
                  className={`flex flex-col items-center px-3 text-center ${i > 0 ? "lg:border-l lg:border-line" : ""}`}
                >
                  <Icon className="h-10 w-10 text-brand-600" strokeWidth={1.6} />
                  <span className="mt-3 max-w-[10rem] text-[0.9rem] leading-snug text-ink">{b.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
