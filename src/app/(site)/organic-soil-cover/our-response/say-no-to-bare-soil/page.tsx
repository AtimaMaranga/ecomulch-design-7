import type { Metadata } from "next";
import Image from "next/image";
import { CircleCheck, Play } from "lucide-react";
import { BODY, GoButton, Panel, PlainHead } from "@/components/section/osc";
import { SmartLink } from "@/components/section/explore";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { OSC_CAMPAIGN } from "@/lib/content/defaults/organic-soil-cover";
import { ic, linkFor } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Say No to Bare Soil",
  description:
    "EcoMulch’s campaign to recognise exposed soil as a challenge and protect it: learn, practise and advocate, or help spread the message.",
};

const NUM = "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-[1.2rem] font-800 text-white sm:h-12 sm:w-12 sm:text-[1.4rem]";
const PANEL_TITLE = "text-[1.45rem] font-800 leading-[1.12] tracking-[-0.015em] text-pine-deep sm:text-[1.8rem] xl:text-[2.3rem]";
const INK: Record<string, string> = { red: "text-glyph-red", green: "text-brand-600" };

export default async function SayNoToBareSoilPage() {
  const [{ intro, movement, learn, spread }, links] = await Promise.all([
    getPageContent("organic-soil-cover--our-response--say-no-to-bare-soil", OSC_CAMPAIGN),
    linkSettings(),
  ]);
  const playlist = linkFor(learn.href, links);

  return (
    <>
      <SectionCrumbs
        items={[
          { label: "Organic Soil Cover", href: "/organic-soil-cover" },
          { label: "Our Response", href: "/organic-soil-cover/our-response" },
          { label: "Say No to Bare Soil" },
        ]}
      />
      <section className="pb-16 pt-6 sm:pt-8 lg:pb-20 lg:pt-10">
        <div className="container-site">
          <PlainHead eyebrow={intro.eyebrow} title={intro.title} rule={false} className="max-w-[60rem]">
            {intro.paras.map((p, i) => (
              <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
            ))}
          </PlainHead>

          <Panel className="mt-6">
            <h2 className="text-[1.6rem] font-800 leading-[1.12] tracking-[-0.015em] text-brand-700 sm:text-[2rem] xl:text-[2.6rem]">
              {movement.title}
            </h2>
            <div className={`mt-2 space-y-2.5 ${BODY}`}>
              {movement.paras.map((p, i) => (
                <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
              ))}
            </div>
          </Panel>

          <Panel className="mt-4 lg:mt-5 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-center lg:gap-8">
            <div>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className={NUM}>1</span>
                <h2 className={PANEL_TITLE}>{learn.title}</h2>
              </div>
              <ul className="mt-4 space-y-4">
                {learn.rows.map((r, i) => {
                  const Icon = ic(r.icon);
                  return (
                    <li key={i} className="flex gap-3 sm:gap-5">
                      <Icon className={`mt-1 h-9 w-9 shrink-0 sm:h-11 sm:w-11 ${INK[r._color] ?? INK.green}`} strokeWidth={1.8} />
                      <span aria-hidden="true" className="w-1 shrink-0 self-stretch rounded-full bg-brand-600/70" />
                      <p className={BODY}>{rich(r.text, "font-800 text-brand-700")}</p>
                    </li>
                  );
                })}
              </ul>
              <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10] lg:hidden">
                <Image src={learn.image} alt={learn.imageAlt} fill sizes="100vw" className="object-cover" />
              </div>
              {playlist && (
                <SmartLink
                  href={playlist}
                  className="group mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-brand-600 px-6 py-3 text-[1.02rem] font-800 text-white shadow-go transition-colors hover:bg-brand-700 sm:text-[1.08rem]"
                >
                  <Play className="h-6 w-6 shrink-0 rounded-full border-2 border-white p-0.5" strokeWidth={2.4} />
                  {learn.cta}
                </SmartLink>
              )}
            </div>
            <div className="relative hidden aspect-[345/316] overflow-hidden rounded-2xl lg:block">
              <Image src={learn.image} alt={learn.imageAlt} fill sizes="30vw" className="object-cover" />
            </div>
          </Panel>

          <Panel tone="cream" className="mt-4 lg:mt-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-center lg:gap-8">
            <div>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className={NUM}>2</span>
                <h2 className={PANEL_TITLE}>{spread.title}</h2>
              </div>
              <p className={`mt-3 ${BODY}`}>{rich(spread.body)}</p>
              <ul className="mt-3 space-y-2">
                {spread.items.map((t, i) => (
                  <li key={i} className={`flex gap-2.5 ${BODY}`}>
                    <CircleCheck className="mt-0.5 h-6 w-6 shrink-0 fill-brand-600 text-white" strokeWidth={2.2} />
                    <span>{rich(t, "font-800 text-brand-700")}</span>
                  </li>
                ))}
              </ul>
              <p className={`mt-3 ${BODY}`}>{rich(spread.closing)}</p>
              <div className="relative mt-5 aspect-[395/351] overflow-hidden rounded-2xl lg:hidden">
                <Image src={spread.image} alt={spread.imageAlt} fill sizes="100vw" className="object-cover" />
              </div>
              <div className="mt-5">
                <GoButton href={linkFor(spread.href, links)} lead="whatsapp" block>
                  {spread.cta}
                </GoButton>
              </div>
            </div>
            <div className="relative hidden aspect-[395/351] overflow-hidden rounded-2xl lg:block">
              <Image src={spread.image} alt={spread.imageAlt} fill sizes="35vw" className="object-cover" />
            </div>
          </Panel>
        </div>
      </section>
    </>
  );
}
