import type { Metadata } from "next";
import { LeafFlourish, LeafOutlineIcon } from "@/components/icons";
import { SubHero } from "@/components/who/sub-hero";
import { CrumbBar } from "@/components/who/sub-parts";
import { PrinciplesExplorer } from "@/components/principles/principles-explorer";
import { getPageContent } from "@/lib/content/store";
import { WHO_PRINCIPLES } from "@/lib/content/defaults/who-principles";
import { lines } from "@/lib/content/page-helpers";
import { Paras } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sustainable Urban Greening Principles",
  description:
    "The principles that guide how EcoMulch designs and stewards greener, healthier and more resilient urban environments.",
};

export default async function PrinciplesPage() {
  const { hero, intro, explorer, closing } = await getPageContent("who-we-are--principles", WHO_PRINCIPLES);

  return (
    <>
      <SubHero
        image={hero.image}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        eyebrowIcon={LeafOutlineIcon}
        title={<>{hero.title.split("\n").map((l, i, a) => (<span key={i}>{l}{i < a.length - 1 && <br />}</span>))}</>}
        subtitle={hero.subtitle}
      />

      <CrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Who We Are", href: "/who-we-are" },
          { label: "Sustainable Urban Greening Principles" },
        ]}
      />

      <section className="pt-5">
        <div className="container-narrow">
          <div className="max-w-[42rem] space-y-2.5 text-[0.98rem] leading-[1.35] text-ink-light">
            <Paras items={intro.paras} />
            {intro.highlight && <p className="font-700 text-brand-600">{intro.highlight}</p>}
          </div>
        </div>
      </section>

      <section className="pt-7">
        <div className="container-narrow">
          <div className="text-center">
            <div className="flex items-center justify-center gap-5 sm:gap-7">
              <LeafFlourish className="hidden h-4 w-12 text-brand-600 sm:block" />
              <h2 className="text-[1.3rem] font-700 leading-tight text-ink sm:text-[1.4rem]">{explorer.title}</h2>
              <LeafFlourish flip className="hidden h-4 w-12 text-brand-600 sm:block" />
            </div>
            <p className="mt-2 text-[0.95rem] leading-[1.4] text-ink-light">{lines(explorer.lede)}</p>
          </div>
          <div className="mt-4">
            <PrinciplesExplorer items={explorer.principles} />
          </div>
        </div>
      </section>

      <section className="pb-20 pt-6">
        <div className="container-narrow">
          <div className="max-w-[40rem] space-y-2.5 text-[0.98rem] leading-[1.4] text-ink-light">
            <Paras items={closing.paras} />
          </div>
        </div>
      </section>
    </>
  );
}
