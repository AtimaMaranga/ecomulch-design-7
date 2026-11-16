import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaptionPhoto, NextBar, Panel, PlainHead } from "@/components/section/osc";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent } from "@/lib/content/store";
import { TOPPINGS, TOPPING_PRODUCTS } from "@/lib/content/defaults/organic-soil-cover";
import { ic } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ topping: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { topping } = await params;
  const d = TOPPING_PRODUCTS[topping];
  return d ? { title: `${d.intro.title} planter topping`, description: d.intro.body } : {};
}

export default async function ToppingPage({ params }: Params) {
  const { topping } = await params;
  const defaults = TOPPING_PRODUCTS[topping];
  if (!defaults) notFound();
  const { intro, photos, next } = await getPageContent(
    `organic-soil-cover--our-response--planter-toppings--${topping}`,
    defaults,
  );
  const Layers = ic("layers");
  const others = Object.entries(TOPPING_PRODUCTS)
    .filter(([slug]) => slug !== topping)
    .map(([slug, d]) => ({ label: d.intro.title, href: `${TOPPINGS}/${slug}` }));

  return (
    <>
      <SectionCrumbs
        items={[
          { label: "Organic Soil Cover", href: "/organic-soil-cover" },
          { label: "Organic Planter Toppings", short: "Planter Toppings", href: TOPPINGS },
          { label: intro.title },
        ]}
      />
      <section className="pb-16 pt-5 sm:pt-7 lg:pb-20 lg:pt-9">
        <div className="container-site">
          <PlainHead title={intro.title} />
          <Panel className="mt-4 !py-4 sm:!py-5">
            <p className="text-[1.05rem] leading-[1.45] text-pine-deep/90 sm:text-[1.2rem] xl:text-[1.35rem]">{rich(intro.body)}</p>
            <p className="mt-2 text-[1.05rem] font-800 leading-[1.35] text-pine-deep sm:text-[1.2rem] xl:text-[1.35rem]">{intro.lead}</p>
          </Panel>
          <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {photos.items.map((p, i) => (
              <li key={i}>
                <CaptionPhoto
                  image={p.image}
                  imageAlt={p.imageAlt}
                  title={p.caption}
                  aspect="aspect-[472/208]"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </li>
            ))}
          </ul>
          <div className="mt-6 lg:mt-8">
            <NextBar
              icon={Layers}
              title={next.title}
              menuLabel={next.menuLabel}
              menuItems={others}
              orderLabel={next.orderLabel}
              orderHref={next.orderHref}
            />
          </div>
        </div>
      </section>
    </>
  );
}
