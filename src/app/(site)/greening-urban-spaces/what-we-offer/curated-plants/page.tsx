import type { Metadata } from "next";
import Image from "next/image";
import { IntroHero } from "@/components/section/explore";
import { BODY, ChallengeCards, GoButton, H2, Panel, SectionHero, StepFlow } from "@/components/section/osc";
import { SectionCrumbs } from "@/components/section/section-crumbs";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { CURATED_PLANTS } from "@/lib/content/defaults/curated-plants";
import { ic, linkFor } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Curated Indoor & Patio Plants",
  description:
    "Container plants for homes with little or no ground: the challenges, our six-step approach, and our curated plants with optional professional installation.",
};

function Pill({ children, tone = "mint" }: { children: React.ReactNode; tone?: "mint" | "cream" }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`rounded-full px-4 py-1.5 text-[0.85rem] font-800 uppercase tracking-[0.02em] sm:text-[0.95rem] ${
          tone === "cream" ? "bg-disc-cream text-pine-deep" : "bg-disc-mint text-pine-deep"
        }`}
      >
        {children}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-brand-600/40" />
    </div>
  );
}

export default async function CuratedPlantsPage() {
  const [c, links] = await Promise.all([
    getPageContent("greening-urban-spaces--what-we-offer--curated-plants", CURATED_PLANTS),
    linkSettings(),
  ]);
  const { intro, challenges, approach, offer, primary, install } = c;

  return (
    <>
      <SectionCrumbs
        topId="page-top"
        items={[
          { label: "Greening Urban Spaces", href: "/greening-urban-spaces" },
          { label: "Curated Indoor & Patio Plants", short: "Indoor & Patio Plants" },
        ]}
        sections={[
          { id: "our-approach", label: approach.title },
          { id: "what-we-offer", label: offer.title },
        ]}
      />

      <IntroHero
        id="page-top"
        eyebrow={intro.eyebrow}
        title={intro.title}
        image={intro.image}
        imageAlt={intro.imageAlt}
        photo="framed"
        mobileAspect="aspect-[632/258]"
        framedAspect="aspect-[632/258]"
      >
        {intro.paras.map((p, i) => (
          <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
        ))}
      </IntroHero>

      <section className="pt-2 lg:pt-0">
        <div className="container-site">
          <ChallengeCards
            title={challenges.title}
            items={challenges.items.map((it) => ({ ...it, icon: ic(it.icon), tone: it._tone, color: it._color }))}
          />
        </div>
      </section>

      {/* Our approach */}
      <section className="pt-12 lg:pt-16">
        <div className="container-site">
          <SectionHero
            id="our-approach"
            eyebrow={approach.eyebrow}
            title={approach.title}
            image={approach.image}
            imageAlt={approach.imageAlt}
            aspect="aspect-[705/228]"
          >
            <p>{rich(approach.body)}</p>
          </SectionHero>
          <Panel className="mt-5 lg:mt-6">
            <h3 className={H2}>{approach.stepsTitle}</h3>
            <p className={`mt-2 ${BODY}`}>{rich(approach.stepsLede)}</p>
            <div className="mt-5">
              <StepFlow steps={approach.steps.map((s) => ({ ...s, icon: ic(s.icon), tone: s._tone, color: s._color }))} />
            </div>
          </Panel>
        </div>
      </section>

      {/* What we offer */}
      <section id="what-we-offer" className="below-crumbs pb-16 pt-12 lg:pb-20 lg:pt-16">
        <div className="container-site">
          <p className="text-[0.92rem] font-800 uppercase tracking-[0.02em] text-brand-600 sm:text-[1rem] xl:text-[1.1rem]">{offer.eyebrow}</p>
          <span aria-hidden="true" className="mb-4 mt-3 block h-1 w-16 rounded-full bg-brand-600 xl:w-[4.5rem]" />
          <h2 className="text-[clamp(1.75rem,7.6vw,2.6rem)] font-800 leading-[1.08] tracking-[-0.02em] text-pine-deep lg:text-[3rem] xl:text-[3.4rem]">
            {offer.title}
          </h2>
          <p className={`mt-3 ${BODY}`}>{rich(offer.lede)}</p>

          <Panel className="mt-6">
            <div className="xl:grid xl:grid-cols-[minmax(0,0.75fr)_1px_minmax(0,1.25fr)] xl:gap-7">
              <div>
                <Pill>{primary.label}</Pill>
                <h3 className="mt-3 text-[1.5rem] font-800 leading-[1.12] tracking-[-0.015em] text-pine-deep sm:text-[1.9rem] xl:text-[2.2rem]">
                  {primary.title}
                </h3>
                <p className={`mt-2 ${BODY}`}>{rich(primary.body)}</p>
                <div className="mt-5">
                  <GoButton href={linkFor(primary.ctaHref, links)} lead="whatsapp" block>
                    {primary.cta}
                  </GoButton>
                </div>
              </div>
              <span aria-hidden="true" className="hidden bg-brand-600/40 xl:block" />
              <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 xl:mt-0">
                {primary.items.map((it, i) => (
                  <li key={i} className="flex flex-col overflow-hidden rounded-2xl bg-white p-2.5 shadow-hair sm:p-3">
                    <div className="relative aspect-[171/137] overflow-hidden rounded-xl">
                      <Image src={it.image} alt={it.imageAlt} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover" />
                    </div>
                    <h4 className="mt-3 px-1 text-[1.02rem] font-800 leading-[1.2] text-pine-deep sm:text-[1.15rem] xl:text-[1.2rem]">{it.title}</h4>
                    <p className="mt-1 px-1 pb-1 text-[0.9rem] leading-[1.4] text-pine-deep/85 sm:text-[0.98rem]">{it.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="mt-5 flex flex-col gap-2.5 border-t border-brand-600/20 pt-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {primary.features.map((f, i) => {
                const Icon = ic(f.icon);
                return (
                  <li key={i} className="flex items-center gap-3 text-[0.98rem] font-700 text-pine-deep sm:text-[1.04rem]">
                    <Icon className="h-6 w-6 shrink-0 text-brand-600" strokeWidth={2} />
                    {f.text}
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel tone="cream" className="mt-4 lg:mt-5">
            <div className="lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-7 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.8fr)_1px_minmax(0,0.85fr)]">
              <div>
                <Pill tone="cream">{install.label}</Pill>
                <h3 className="mt-3 text-[1.5rem] font-800 leading-[1.12] tracking-[-0.015em] text-pine-deep sm:text-[1.9rem] xl:text-[2.2rem]">
                  {install.title}
                </h3>
                <p className={`mt-2 ${BODY}`}>{rich(install.body)}</p>
              </div>
              <div className="relative mt-5 aspect-[325/187] overflow-hidden rounded-2xl lg:mt-0">
                <Image src={install.image} alt={install.imageAlt} fill sizes="(max-width: 1024px) 100vw, 28vw" className="object-cover" />
              </div>
              <span aria-hidden="true" className="hidden self-stretch bg-brand-600/40 xl:block" />
              <div className="mt-5 lg:col-span-2 lg:mt-6 xl:col-span-1 xl:mt-0">
                <ul className="space-y-3">
                  {install.points.map((p, i) => {
                    const Icon = ic(p.icon);
                    return (
                      <li key={i} className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-disc-mint">
                          <Icon className="h-6 w-6 text-brand-700" strokeWidth={2} />
                        </span>
                        <span className="text-[0.98rem] leading-[1.35] text-pine-deep sm:text-[1.04rem]">{p.text}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-5">
                  <GoButton href={linkFor(install.ctaHref, links)} lead="whatsapp" block className="xl:w-full">
                    {install.cta}
                  </GoButton>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </section>
    </>
  );
}
