import type { Metadata } from "next";
import { IconBadge } from "@/components/section/blocks";
import { BadgeCard, Cta, FadeHero, Panel, SectionHead } from "@/components/section/v2";
import { getPageContent } from "@/lib/content/store";
import { SNBS_CHALLENGE } from "@/lib/content/defaults/snbs-challenge";
import { badge, ic, twoTone } from "@/lib/content/page-helpers";
import { Paras } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Bare Soil Challenge",
  description:
    "Bare soil is more common than we often notice. Why exposed soil is a problem, and why it is so common in our urban landscapes.",
};

export default async function BareSoilChallengePage() {
  const c = await getPageContent("say-no-to-bare-soil--the-challenge", SNBS_CHALLENGE);
  const { hero, problems, reasons, responding } = c;

  return (
    <>
      <FadeHero
        image={hero.image}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        title={twoTone(hero.title, hero.titleAccent)}
        subtitle={hero.subtitle}
      >
        <Paras items={hero.paras} />
      </FadeHero>

      <section className="pt-10">
        <div className="container-site">
          <SectionHead title={twoTone(problems.title, problems.titleAccent)} lede={problems.lede} />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3.5">
            {problems.items.map((p, i) => (
              <BadgeCard
                key={i}
                image={p.image}
                imageAlt={p.imageAlt}
                icon={ic(p.icon)}
                tone={badge(p._tone)}
                align="center"
                badgeSize="sm"
                aspect="aspect-[180/129]"
              >
                <h3 className="text-[1.05rem] font-800 leading-[1.25] text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.86rem] leading-[1.45] text-ink-light">{p.body}</p>
              </BadgeCard>
            ))}
          </div>
        </div>
      </section>

      <Panel className="mt-8" inner="lg:py-8">
        <SectionHead title={twoTone(reasons.title, reasons.titleAccent)} lede={reasons.lede} />
        <ul className="mt-7 grid gap-y-7 md:grid-cols-3">
          {reasons.items.map((r, i) => (
            <li
              key={i}
              className={`flex gap-4 md:px-6 ${i === 0 ? "md:pl-0" : "md:border-l md:border-line"}`}
            >
              <IconBadge icon={ic(r.icon)} tone={badge(r._tone)} className="h-[64px] w-[64px]" iconClassName="h-8 w-8" />
              <div>
                <h3 className="text-[1.08rem] font-800 leading-[1.22] text-ink">{r.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-[1.5] text-ink-light">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel className="mb-20 mt-5" inner="lg:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="max-w-[40rem]">
            <h2 className="text-[1.7rem] font-800 leading-[1.15] tracking-[-0.015em] text-ink sm:text-[2.1rem]">
              {twoTone(responding.title, responding.titleAccent)}
            </h2>
            <p className="mt-3 text-[1rem] leading-[1.5] text-ink-light">{responding.body}</p>
          </div>
          <Cta href={responding.ctaHref} size="lg">
            {responding.cta}
          </Cta>
        </div>
      </Panel>
    </>
  );
}
