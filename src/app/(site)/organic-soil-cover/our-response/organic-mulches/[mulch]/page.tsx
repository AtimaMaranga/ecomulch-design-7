import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SackIcon } from "@/components/icons";
import { CaptionPhoto, InfoCard, NextBar, PlainHead } from "@/components/section/osc";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent } from "@/lib/content/store";
import { MULCHES, MULCH_PRODUCTS } from "@/lib/content/defaults/organic-soil-cover";
import { ic } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ mulch: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { mulch } = await params;
  const d = MULCH_PRODUCTS[mulch];
  return d ? { title: d.intro.title, description: d.intro.body } : {};
}

export default async function MulchPage({ params }: Params) {
  const { mulch } = await params;
  const defaults = MULCH_PRODUCTS[mulch];
  if (!defaults) notFound();
  const { intro, details, photos, next } = await getPageContent(
    `organic-soil-cover--our-response--organic-mulches--${mulch}`,
    defaults,
  );
  const Layers = ic("layers");
  const others = Object.entries(MULCH_PRODUCTS)
    .filter(([slug]) => slug !== mulch)
    .map(([slug, d]) => ({ label: d.intro.title, href: `${MULCHES}/${slug}` }));

  return (
    <>
      <SectionCrumbs
        items={[
          { label: "Organic Soil Cover", href: "/organic-soil-cover" },
          { label: "Organic Mulches", href: MULCHES },
          { label: intro.title },
        ]}
      />
      <section className="pb-16 pt-5 sm:pt-7 lg:pb-20 lg:pt-9">
        <div className="container-site">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-6">
            <div className="space-y-3 lg:space-y-4">
              <PlainHead title={intro.title}>
                <p>{rich(intro.body)}</p>
              </PlainHead>
              <InfoCard icon={Layers} title={details.characteristicsTitle}>
                {details.characteristics.map((p, i) => (
                  <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
                ))}
              </InfoCard>
              <InfoCard icon={ic("sprout")} title={details.usesTitle} tone="cream">
                {details.uses.map((p, i) => (
                  <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
                ))}
              </InfoCard>
              <InfoCard icon={SackIcon} title={details.packagingTitle}>
                <p>{rich(details.packaging, "font-800 text-pine-deep")}</p>
                {details.price && <p className="font-800 text-pine-deep">{details.price}</p>}
              </InfoCard>
            </div>
            <ul className="grid grid-cols-2 content-start gap-3 lg:gap-4 lg:pt-2">
              {photos.items.map((p, i) => (
                <li key={i}>
                  <CaptionPhoto
                    image={p.image}
                    imageAlt={p.imageAlt}
                    title={p.title}
                    caption={p.caption}
                    aspect="aspect-[16/11]"
                    sizes="(max-width: 1024px) 50vw, 28vw"
                  />
                </li>
              ))}
            </ul>
          </div>
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
