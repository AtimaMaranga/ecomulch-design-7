import type { Metadata } from "next";
import { ClipboardCheck, Lightbulb } from "lucide-react";
import { BODY, ChoiceTiles, GoButton, Panel, StepKicker } from "@/components/section/osc";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { OSC_TOPPING_START } from "@/lib/content/defaults/organic-soil-cover";
import { ic, linkFor } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Getting Started with Our Organic Planter Toppings",
  description:
    "Choose your planter topping, pick a package size and submit your order request on WhatsApp.",
};

const STEP_TITLE = "text-[1.45rem] font-800 leading-[1.15] tracking-[-0.015em] text-pine-deep sm:text-[1.8rem] xl:text-[2.2rem]";

export default async function ToppingGettingStartedPage() {
  const [{ intro, choose, packages, estimate, submit }, links] = await Promise.all([
    getPageContent("organic-soil-cover--our-response--planter-toppings--getting-started", OSC_TOPPING_START),
    linkSettings(),
  ]);
  return (
    <>
      <SectionCrumbs
        items={[
          { label: "Organic Soil Cover", href: "/organic-soil-cover" },
          { label: "Organic Planter Toppings", short: "Planter Toppings", href: "/organic-soil-cover/our-response/planter-toppings" },
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

          <Panel className="lg:grid lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-8">
            <div>
              <h2 className="text-[1.3rem] font-800 leading-[1.15] text-brand-700 sm:text-[1.6rem] xl:text-[1.85rem]">{packages.title}</h2>
              <p className={`mt-1.5 ${BODY}`}>{rich(packages.lede)}</p>
              <div className="mt-4 overflow-hidden rounded-xl border-2 border-brand-600 bg-white">
                <table className="w-full table-fixed text-left text-[0.92rem] sm:text-[1rem] xl:text-[1.05rem]">
                  <thead className="bg-brand-600 text-white">
                    <tr>
                      {packages.columns.map((c, i) => (
                        <th key={i} scope="col" className={`px-3 py-2.5 font-800 sm:px-4 ${i > 0 ? "text-center" : ""}`}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {packages.rows.map((r, i) => (
                      <tr key={i} className="border-t border-line">
                        <th scope="row" className="px-3 py-2.5 font-800 text-pine-deep sm:px-4">
                          {r.name}
                        </th>
                        <td className="border-l border-line px-2 py-2.5 text-center text-pine-deep/90 sm:px-3">{r.smaller}</td>
                        <td className="border-l border-line px-2 py-2.5 text-center text-pine-deep/90 sm:px-3">{r.larger}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <span aria-hidden="true" className="hidden bg-brand-700/40 lg:block" />
            <div className="mt-6 lg:mt-0">
              <div className="flex items-center gap-3">
                <ClipboardCheck className="h-9 w-9 shrink-0 text-brand-700 sm:h-11 sm:w-11" strokeWidth={1.8} />
                <span aria-hidden="true" className="h-9 w-1 shrink-0 rounded-full bg-brand-600" />
                <h2 className="text-[1.3rem] font-800 leading-[1.15] text-brand-700 sm:text-[1.6rem] xl:text-[1.85rem]">{estimate.title}</h2>
              </div>
              <p className={`mt-3 ${BODY}`}>{rich(estimate.body)}</p>
              <div className="mt-4 flex gap-3 rounded-xl bg-disc-lime/80 p-4 sm:gap-4">
                <Lightbulb className="h-9 w-9 shrink-0 text-brand-600" strokeWidth={1.8} />
                <p className={BODY}>{rich(estimate.tip, "font-800 text-pine-deep")}</p>
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
