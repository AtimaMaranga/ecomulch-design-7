import type { Metadata } from "next";
import { LeafOutlineIcon } from "@/components/icons";
import { SubHero } from "@/components/who/sub-hero";
import { CrumbBar, Photo, SectionTitle } from "@/components/who/sub-parts";
import { getPageContent } from "@/lib/content/store";
import { WHO_HOW } from "@/lib/content/defaults/who-how";
import { ic } from "@/lib/content/page-helpers";
import { Paras } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How We Started",
  description:
    "EcoMulch's story began in 2024 with a simple question about making Africa's urbanization more sustainable — and a first experiment turning sugarcane peels into mulch.",
};

export default async function HowWeStartedPage() {
  const { hero, question, experiment, destination } = await getPageContent(
    "who-we-are--how-we-started",
    WHO_HOW,
  );
  return (
    <>
      <SubHero
        image={hero.image}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        eyebrowIcon={LeafOutlineIcon}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      <CrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Who We Are", href: "/who-we-are" },
          { label: "How We Started" },
        ]}
      />

      {/* From a Simple Question */}
      <section className="pb-6 pt-7">
        <div className="container-narrow grid items-start gap-8 lg:grid-cols-[383fr_484fr] lg:gap-8">
          <div className="pt-1">
            <SectionTitle>{question.title}</SectionTitle>
            <div className="mt-6 space-y-5 text-[0.98rem] leading-[1.45] text-ink-light">
              <Paras items={question.paras} />
            </div>
          </div>
          <Photo
            src={question.image}
            alt={question.imageAlt}
            className="aspect-[485/267]"
          />
        </div>
      </section>

      {/* Our Early Experiment */}
      <section className="py-4">
        <div className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-10">
          <div className="grid gap-7 rounded-xl bg-surface-tint p-5 sm:p-6 lg:grid-cols-[270px_1fr_auto] lg:gap-7 lg:py-5">
            <Photo
              src={experiment.image}
              alt={experiment.imageAlt}
              className="aspect-[270/309] max-lg:aspect-[4/3]"
            />
            <div className="pt-1">
              <SectionTitle size="sm">{experiment.title}</SectionTitle>
              <div className="mt-6 space-y-3 text-[0.84rem] leading-[1.45] text-ink-light">
                <Paras items={experiment.paras} />
                {experiment.highlight && <p className="pt-1 font-700 text-brand-600">{experiment.highlight}</p>}
              </div>
            </div>
            <ul className="flex flex-col justify-center border-line max-lg:border-t max-lg:pt-4 lg:w-[210px] lg:border-l lg:pl-8">
              {experiment.milestones.map((m, i) => {
                const Icon = ic(m.icon);
                return (
                <li
                  key={i}
                  className={`py-4 ${
                    i < experiment.milestones.length - 1
                      ? "border-b border-dashed border-brand-200"
                      : ""
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-brand-600 text-brand-600">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <span className="mt-2.5 block max-w-[9.5rem] text-[0.88rem] leading-snug text-ink">
                    {m.label}
                  </span>
                </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* But mulch was never the destination */}
      <section className="pb-20 pt-6">
        <div className="container-narrow grid items-start gap-8 lg:grid-cols-[486fr_389fr] lg:gap-7">
          <div>
            <SectionTitle size="lg">{destination.title}</SectionTitle>
            <div className="mt-5 space-y-3.5 text-[0.95rem] leading-[1.4] text-ink-light">
              <Paras items={destination.paras} />
              {destination.highlight && <p className="pt-1 font-700 text-brand-600">{destination.highlight}</p>}
            </div>
          </div>
          <Photo
            src={destination.image}
            alt={destination.imageAlt}
            className="aspect-[389/354]"
          />
        </div>
      </section>
    </>
  );
}
