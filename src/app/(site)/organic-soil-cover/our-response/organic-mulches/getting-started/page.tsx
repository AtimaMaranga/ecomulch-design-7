import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import { BODY, ChoiceTiles, GoButton, Panel, StepKicker } from "@/components/section/osc";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { OSC_MULCH_START } from "@/lib/content/defaults/organic-soil-cover";
import { ic, linkFor } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Getting Started with Our Organic Mulches",
  description:
    "Choose the organic mulch that suits your needs, estimate how many 50-litre bags you need and submit your order request on WhatsApp.",
};

const STEP_TITLE = "text-[1.45rem] font-800 leading-[1.15] tracking-[-0.015em] text-pine-deep sm:text-[1.8rem] xl:text-[2.2rem]";

export default async function MulchGettingStartedPage() {
  const [{ intro, choose, estimate, submit }, links] = await Promise.all([
    getPageContent("organic-soil-cover--our-response--organic-mulches--getting-started", OSC_MULCH_START),
    linkSettings(),
  ]);
  return (
    <>
      <SectionCrumbs
        items={[
          { label: "Organic Soil Cover", href: "/organic-soil-cover" },
          { label: "Organic Mulches", href: "/organic-soil-cover/our-response/organic-mulches" },
          { label: "Getting Started" },
        ]}
      />
      <section className="pb-16 pt-5 sm:pt-7 lg:pb-20 lg:pt-9">
        <div className="container-site space-y-4 lg:space-y-5">
          <Panel>
            <h1 className="text-[clamp(1.7rem,7.4vw,2.6rem)] font-800 leading-[1.1] tracking-[-0.02em] text-pine-deep lg:text-[2.9rem]">
              {intro.title}
            </h1>
            <p className={`mt-2 ${BODY}`}>{rich(intro.lede)}</p>
          </Panel>

          <Panel>
            <StepKicker>{choose.kicker}</StepKicker>
            <h2 className={`mt-1.5 ${STEP_TITLE}`}>{choose.title}</h2>
            <div className={`mt-2 space-y-2.5 ${BODY}`}>
              {choose.paras.map((p, i) => (
                <p key={i}>{rich(p)}</p>
              ))}
            </div>
            <div className="mt-5">
              <ChoiceTiles items={choose.choices.map((c) => ({ ...c, icon: ic(c.icon) }))} />
            </div>
          </Panel>

          <Panel>
            <div className="flex gap-4 sm:gap-6">
              <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-full bg-disc-mint sm:grid xl:h-20 xl:w-20">
                <Calculator className="h-8 w-8 text-brand-700 xl:h-10 xl:w-10" strokeWidth={1.8} />
              </span>
              <span aria-hidden="true" className="hidden w-1 shrink-0 self-stretch rounded-full bg-brand-600 sm:block" />
              <div>
                <h2 className="text-[1.35rem] font-800 leading-[1.15] text-brand-700 sm:text-[1.65rem] xl:text-[2rem]">{estimate.title}</h2>
                <div className={`mt-2 space-y-2 ${BODY}`}>
                  {estimate.paras.map((p, i) => (
                    <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel id="submit-order" className="below-crumbs">
            <StepKicker>{submit.kicker}</StepKicker>
            <h2 className={`mt-1.5 ${STEP_TITLE}`}>{submit.title}</h2>
            <p className={`mt-2 ${BODY}`}>{rich(submit.body)}</p>
            <div className="mt-5">
              <GoButton href={linkFor(submit.href, links)} lead="whatsapp" block>
                {submit.cta}
              </GoButton>
            </div>
          </Panel>
        </div>
      </section>
    </>
  );
}
