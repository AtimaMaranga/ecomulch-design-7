import type { Metadata } from "next";
import Image from "next/image";
import { IconBadge } from "@/components/section/blocks";
import { Cta, CtaStrip, FadeHero, NumberDisc, SectionHead } from "@/components/section/v2";
import { getPageContent } from "@/lib/content/store";
import { SNBS_RESPONSE } from "@/lib/content/defaults/snbs-response";
import { badge, ic, lines, twoTone } from "@/lib/content/page-helpers";
import { Paras, rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Response to the Bare Soil Challenge",
  description:
    "Say No to Bare Soil is an EcoMulch campaign encouraging homeowners to notice exposed soil around their homes and take practical steps to reduce it.",
};

const PANEL = { peach: "from-[#fdf1e6] to-[#fdf8f2]", sky: "from-[#eaf3fb] to-[#f5f9fd]", mint: "from-[#edf7ef] to-[#f7fbf7]" };

export default async function OurResponsePage() {
  const { hero, movement, practice } = await getPageContent("say-no-to-bare-soil--our-response", SNBS_RESPONSE);

  return (
    <>
      <FadeHero
        image={hero.image}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        title={twoTone(hero.title, hero.titleAccent, true)}
        subtitle={hero.subtitle}
      >
        <Paras items={hero.paras} />
      </FadeHero>

      <section className="pt-8">
        <div className="container-site">
          <div className="rounded-xl bg-gradient-to-br from-[#edf7ef] to-[#f7fbf7] px-5 pb-6 pt-7 sm:px-7">
            <SectionHead
              eyebrow={movement.eyebrow}
              title={twoTone(movement.title, movement.titleAccent)}
              lede={rich(movement.lede)}
            />
            <ul className="mt-8 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {movement.aims.map((a, i) => (
                <li
                  key={i}
                  className={`flex flex-col items-center px-5 text-center ${i > 0 ? "lg:border-l lg:border-line" : ""}`}
                >
                  <IconBadge icon={ic(a.icon)} tone={badge(a._tone)} className="h-[70px] w-[70px]" iconClassName="h-9 w-9" />
                  <p className="mt-4 max-w-[13rem] text-[1rem] leading-[1.4] text-ink-light">{a.text}</p>
                </li>
              ))}
            </ul>
            <CtaStrip
              className="mt-8 !bg-none bg-[#e4f2e6]"
              title={movement.ctaTitle}
              body={rich(movement.ctaBody)}
              cta={<Cta href={movement.ctaHref}>{movement.cta}</Cta>}
            />
          </div>
        </div>
      </section>

      <section className="pb-20 pt-6">
        <div className="container-site">
          <div className="rounded-xl bg-gradient-to-br from-[#eef4fb] to-[#f8fbfd] px-5 pb-6 pt-7 sm:px-7">
            <SectionHead
              eyebrow={practice.eyebrow}
              title={twoTone(practice.title, practice.titleAccent)}
              lede={rich(practice.lede)}
            />
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {practice.solutions.map((s, i) => {
                const tone = (s._tone in PANEL ? s._tone : "mint") as keyof typeof PANEL;
                return (
                  <article
                    key={i}
                    className={`grid gap-4 rounded-xl bg-gradient-to-br p-4 sm:grid-cols-[1fr_minmax(0,0.7fr)] ${PANEL[tone]}`}
                  >
                    <div className="py-1 sm:pl-1">
                      <div className="flex items-center gap-4">
                        <NumberDisc
                          n={String(i + 1).padStart(2, "0")}
                          tone={tone === "sky" ? "sky" : tone === "peach" ? "peach" : "mint"}
                          className="h-14 w-14 text-[1.35rem]"
                        />
                        <h3 className="text-[1.45rem] font-800 leading-[1.12] text-ink">{lines(s.title)}</h3>
                      </div>
                      <p className="mt-4 text-[0.95rem] leading-[1.5] text-ink-light">{rich(s.body)}</p>
                    </div>
                    <div className="relative min-h-[220px] overflow-hidden rounded-lg">
                      <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 1024px) 50vw, 22vw" className="object-cover" />
                    </div>
                  </article>
                );
              })}
            </div>
            <CtaStrip
              className="mt-5 !bg-none bg-[#e3eef9]"
              title={practice.ctaTitle}
              body={rich(practice.ctaBody)}
              cta={
                <Cta href={practice.ctaHref} size="lg">
                  {practice.cta}
                </Cta>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
