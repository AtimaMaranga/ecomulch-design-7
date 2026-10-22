import type { Metadata } from "next";
import Image from "next/image";
import { OutlineButton } from "@/components/section/blocks";
import { BadgeCard, Eyebrow2, FadeHero, IconRow, SectionHead, type PanelTone } from "@/components/section/v2";
import { getPageContent } from "@/lib/content/store";
import { GUS_CHALLENGE } from "@/lib/content/defaults/gus-challenge";
import { badge, ic, twoTone } from "@/lib/content/page-helpers";
import { Paras, rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Urban Greening Challenge",
  description:
    "As our towns and cities grow, where does nature fit? Why making room for plants is only the beginning — and why the challenge is also an opportunity.",
};

function Statement({ text }: { text: string }) {
  return (
    <p className="mt-5 rounded-lg bg-gradient-to-r from-[#e9f5ea] to-[#f2f9f2] px-6 py-4 text-center text-[1rem] leading-[1.45] text-ink-light sm:text-[1.05rem]">
      {rich(text, "font-800 text-brand-700")}
    </p>
  );
}

export default async function UrbanGreeningChallengePage() {
  const { hero, beginning, opportunity, responding } = await getPageContent(
    "greening-urban-spaces--the-challenge",
    GUS_CHALLENGE,
  );

  return (
    <>
      <FadeHero
        tone="dark"
        image={hero.image}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        title={twoTone(hero.title, hero.titleAccent)}
      >
        <Paras items={hero.paras} boldClass="font-800 text-white" />
      </FadeHero>

      <section className="pt-9">
        <div className="container-site">
          <SectionHead title={twoTone(beginning.title, beginning.titleAccent)} lede={rich(beginning.lede)} />
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {beginning.situations.map((c, i) => (
              <BadgeCard
                key={i}
                image={c.image}
                imageAlt={c.imageAlt}
                icon={ic(c.icon)}
                tone={badge(c._tone)}
                surface={c._surface as "white" | PanelTone}
                badgeSize="md"
                aspect="aspect-[453/158]"
              >
                <h3 className="text-[1.45rem] font-800 leading-[1.18] tracking-[-0.01em] text-ink">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-[1.5] text-ink-light">{rich(c.body)}</p>
              </BadgeCard>
            ))}
          </div>
          <Statement text={beginning.statement} />
        </div>
      </section>

      <section className="pt-10">
        <div className="container-site">
          <SectionHead title={opportunity.title} lede={<Paras items={opportunity.paras} />} />
          <IconRow
            items={opportunity.items.map((it) => ({ ...it, icon: ic(it.icon), tone: badge(it._tone) }))}
            cols={4}
            layout="stack"
            className="mt-7"
          />
          <Statement text={opportunity.statement} />
        </div>
      </section>

      <section className="pb-20 pt-6">
        <div className="container-site">
          <div className="grid gap-7 rounded-xl bg-gradient-to-br from-[#edf7ef] to-[#f7fbf7] px-5 py-7 sm:px-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-0">
            <div className="lg:border-r lg:border-line lg:pr-8">
              <h2 className="text-[1.6rem] font-800 leading-[1.18] tracking-[-0.015em] text-ink sm:text-[1.85rem]">
                {responding.title}
              </h2>
              <span className="mt-4 block h-[3px] w-10 rounded-full bg-brand-600" />
              <p className="mt-5 text-[1rem] leading-[1.55] text-ink-light">{rich(responding.body)}</p>
            </div>
            <div className="lg:pl-7">
              <Eyebrow2 rule={false}>{responding.areasLabel}</Eyebrow2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {responding.areas.map((a, i) => (
                  <article key={i} className="flex flex-col rounded-lg bg-white p-3.5 shadow-[0_1px_3px_rgba(12,40,82,0.06)]">
                    <div className="flex gap-3.5">
                      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-md">
                        <Image src={a.image} alt={a.imageAlt} fill sizes="88px" className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-[1.02rem] font-800 leading-[1.2] text-ink">{a.title}</h3>
                        <p className="mt-1.5 text-[0.84rem] leading-[1.4] text-ink-light">{a.body}</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-4">
                      <OutlineButton href={a.href} compact>
                        {a.cta}
                      </OutlineButton>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
