import type { Metadata } from "next";
import Image from "next/image";
import { IconBadge, ValuesStrip } from "@/components/section/blocks";
import { ExpandGrid, type ExpandItem, type ExpandTone } from "@/components/section/expand-grid";
import { Cta, FadeHero, SectionHead } from "@/components/section/v2";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { CURATED_PLANTS } from "@/lib/content/defaults/curated-plants";
import { badge, ic, lines, linkFor, twoTone } from "@/lib/content/page-helpers";
import { Paras, rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Curated Indoor & Patio Plants",
  description:
    "Beautiful plants and thoughtful combinations, ready for your space. See how EcoMulch selects, prepares, nurtures and curates plants for indoor spaces, patios and balconies.",
};

export default async function CuratedPlantsPage() {
  const [{ hero, stages, collection, available }, links] = await Promise.all([
    getPageContent("greening-urban-spaces--what-we-offer--curated-plants", CURATED_PLANTS),
    linkSettings(),
  ]);

  const items: ExpandItem[] = stages.items.map((s, i) => ({
    key: `stage-${i}`,
    tone: (s._tone || "mint") as ExpandTone,
    badge: <IconBadge icon={ic(s.icon)} tone={badge(s._tone)} className="h-[84px] w-[84px]" iconClassName="h-10 w-10" />,
    title: `${i + 1}. ${s.title}`,
    kicker: s.kicker,
    body: rich(s.body),
    detail: {
      ...s.detail,
      points: s.detail.points.map((p) => ({
        badge: <IconBadge icon={ic(p.icon)} tone={badge(p._tone)} className="h-[52px] w-[52px]" iconClassName="h-6 w-6" />,
        title: p.title,
        body: p.body,
      })),
    },
  }));

  return (
    <>
      <FadeHero
        image={hero.image}
        imageAlt={hero.imageAlt}
        minHeight="md:min-h-[clamp(380px,34vw,500px)]"
        textWidth="max-w-[35rem]"
        title={twoTone(hero.title, hero.titleAccent, true)}
        subtitle={lines(hero.subtitle)}
      >
        <Paras items={hero.paras} />
      </FadeHero>

      <section className="pt-8">
        <div className="container-site">
          <SectionHead title={twoTone(stages.title, stages.titleAccent)} lede={rich(stages.lede)} />
          <div className="mt-5">
            <ExpandGrid items={items} variant="icon" />
          </div>
        </div>
      </section>

      <section className="pt-9">
        <div className="container-site">
          <SectionHead title={twoTone(collection.title, collection.titleAccent)} lede={rich(collection.lede)} />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collection.items.map((c, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(12,40,82,0.06),0_6px_18px_-8px_rgba(12,40,82,0.12)]"
              >
                <div className="relative aspect-[221/157] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="px-4 pb-5 pt-3.5">
                  <h3 className="text-[1.08rem] font-800 text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-[1.45] text-ink-light">{c.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8">
        <div className="container-site">
          <div className="flex flex-col gap-6 rounded-xl bg-gradient-to-br from-[#edf7ef] to-[#f7fbf7] px-5 py-7 sm:px-7 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="max-w-[34rem]">
              <h2 className="text-[1.85rem] font-800 leading-[1.12] tracking-[-0.015em] text-ink sm:text-[2.2rem]">
                {available.title}
              </h2>
              <p className="mt-3 text-[1rem] leading-[1.5] text-ink-light">{rich(available.body)}</p>
            </div>
            <Cta
              href={linkFor(available.ctaHref, links)}
              whatsapp={available.ctaHref === "{catalogue}" || available.ctaHref === "{whatsapp}"}
              size="lg"
              className="text-left"
            >
              {lines(available.cta)}
            </Cta>
          </div>
        </div>
      </section>

      <ValuesStrip />
    </>
  );
}
