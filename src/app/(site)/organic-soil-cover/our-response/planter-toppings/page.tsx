import type { Metadata } from "next";
import { LeafOutlineIcon } from "@/components/icons";
import { ActionStrip, BODY, GoButton, Panel, PlainHead, ProcessSteps, ProductCards, SectionLead } from "@/components/section/osc";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent } from "@/lib/content/store";
import { OSC_TOPPINGS } from "@/lib/content/defaults/organic-soil-cover";
import { ic } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Organic Planter Toppings",
  description:
    "Coco Chips, Pine Cone Flakes, Coco Fiber and Bark Fiber: natural finishing layers for planters, made from recovered green waste.",
};

export default async function PlanterToppingsPage() {
  const { intro, products, process, start } = await getPageContent(
    "organic-soil-cover--our-response--planter-toppings",
    OSC_TOPPINGS,
  );
  return (
    <>
      <SectionCrumbs
        items={[
          { label: "Organic Soil Cover", href: "/organic-soil-cover" },
          { label: "Organic Planter Toppings", short: "Planter Toppings" },
        ]}
      />
      <section className="pt-6 sm:pt-8 lg:pt-10">
        <div className="container-site">
          <PlainHead eyebrow={intro.eyebrow} title={intro.title} rule={false}>
            {intro.paras.map((p, i) => (
              <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
            ))}
            <p className="font-800 text-brand-700">{intro.listTitle}</p>
          </PlainHead>
          <Panel className="mt-5">
            <ProductCards items={products.items} />
          </Panel>
        </div>
      </section>

      <section className="pt-10 lg:pt-12">
        <div className="container-site">
          <div className="border-t border-line pt-10 lg:pt-12">
            <Panel>
              <SectionLead title={process.title} lede={<p className={BODY}>{rich(process.lede)}</p>} />
              <div className="mt-5">
                <ProcessSteps steps={process.steps.map((s) => ({ ...s, icon: ic(s.icon) }))} />
              </div>
            </Panel>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-5 lg:pb-20">
        <div className="container-site">
          <ActionStrip
            icon={LeafOutlineIcon}
            greenTitle
            title={start.title}
            action={<GoButton href={start.href} block>{start.cta}</GoButton>}
          >
            {rich(start.body)}
          </ActionStrip>
        </div>
      </section>
    </>
  );
}
