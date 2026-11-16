import type { Metadata } from "next";
import { IconDisc, IntroHero } from "@/components/section/explore";
import { BODY, GoButton, NumberedHead, Panel } from "@/components/section/osc";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent } from "@/lib/content/store";
import { OSC_RESPONSE } from "@/lib/content/defaults/organic-soil-cover";
import { ic } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Response to the Organic Soil Cover Challenge",
  description:
    "Organic mulches and planter toppings made from recovered green waste, and the Say No to Bare Soil campaign for greater awareness of soil cover.",
};

export default async function OscResponsePage() {
  const { intro, products, awareness } = await getPageContent("organic-soil-cover--our-response", OSC_RESPONSE);
  return (
    <>
      <SectionCrumbs
        items={[
          { label: "Organic Soil Cover", href: "/organic-soil-cover" },
          { label: "Our Response" },
        ]}
      />
      <IntroHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        image={intro.image}
        mobileImage={intro.mobileImage || undefined}
        imageAlt={intro.imageAlt}
        photo="fade"
        mobileAspect="aspect-[666/200]"
      >
        {intro.paras.map((p, i) => (
          <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
        ))}
      </IntroHero>

      <section className="pb-16 pt-8 lg:pb-20 lg:pt-10">
        <div className="container-site space-y-4 lg:space-y-5">
          <Panel>
            <NumberedHead num="01" title={products.title}>
              <p>{rich(products.body)}</p>
            </NumberedHead>
            <div className="mt-5 grid gap-3 md:grid-cols-2 lg:gap-5">
              {products.items.map((it, i) => (
                <article key={i} className="flex flex-col rounded-2xl bg-white p-4 shadow-hair sm:p-6">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <IconDisc
                      icon={ic(it.icon)}
                      tone={it._tone}
                      className="h-16 w-16 sm:h-20 sm:w-20 xl:h-24 xl:w-24"
                      iconClassName="h-8 w-8 sm:h-10 sm:w-10 xl:h-12 xl:w-12"
                    />
                    <span aria-hidden="true" className="w-px shrink-0 self-stretch bg-pine-deep/25" />
                    <h3 className="text-[1.3rem] font-800 leading-[1.15] text-pine-deep sm:text-[1.55rem] xl:text-[1.85rem]">{it.title}</h3>
                  </div>
                  <p className={`mt-3 sm:pl-[calc(5rem+3rem+1px)] xl:pl-[calc(6rem+3rem+1px)] ${BODY}`}>{rich(it.body)}</p>
                  <div className="mt-auto pt-5 sm:pl-[calc(5rem+3rem+1px)] xl:pl-[calc(6rem+3rem+1px)]">
                    <GoButton href={it.href} block>
                      {it.cta}
                    </GoButton>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel tone="cream" className="lg:flex lg:items-center lg:gap-10">
            <div className="lg:flex-1">
              <NumberedHead num="02" tone="cream" title={awareness.title}>
                <p>{rich(awareness.body)}</p>
              </NumberedHead>
            </div>
            <div className="mt-5 lg:mt-0 lg:shrink-0">
              <GoButton href={awareness.href} block>
                {awareness.cta}
              </GoButton>
            </div>
          </Panel>
        </div>
      </section>
    </>
  );
}
