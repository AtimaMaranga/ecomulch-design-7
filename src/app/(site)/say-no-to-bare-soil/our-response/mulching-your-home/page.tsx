import type { Metadata } from "next";
import { ArrowRight, Leaf, Truck } from "lucide-react";
import { IconBadge } from "@/components/section/blocks";
import { Cta, CtaStrip, FadeHero, SectionHead } from "@/components/section/v2";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { SNBS_MULCHING } from "@/lib/content/defaults/snbs-mulching";
import { badge, ic, lines, linkFor, twoTone } from "@/lib/content/page-helpers";
import { Paras, rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reduce Bare Soil Around Your Home",
  description:
    "Considering organic mulch? Start by telling us about the space you want to cover — then choose between an EcoMulch installation or installing the mulch yourself.",
};

type Step = { _tone: string; icon: string; title: string; body: string };

function HowItWorks({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <>
      <h3 className="mt-7 text-[1.35rem] font-800 text-brand-700">{title}</h3>
      <ol className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4">
        {steps.map((s, i) => (
          <li key={i} className="relative">
            <IconBadge icon={ic(s.icon)} tone={badge(s._tone)} className="h-[64px] w-[64px]" iconClassName="h-8 w-8" />
            {i < steps.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className="absolute left-[78px] top-[22px] hidden h-5 w-5 text-ink sm:block"
                strokeWidth={2}
              />
            )}
            <h4 className="mt-3 text-[0.95rem] font-800 text-ink">{s.title}</h4>
            <p className="mt-1 text-[0.85rem] leading-[1.45] text-ink-light">{rich(s.body)}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

export default async function MulchingYourHomePage() {
  const [{ hero, paths, install, diy, talk }, links] = await Promise.all([
    getPageContent("say-no-to-bare-soil--our-response--mulching-your-home", SNBS_MULCHING),
    linkSettings(),
  ]);

  return (
    <>
      <FadeHero
        image={hero.image}
        imageAlt={hero.imageAlt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Say No to Bare Soil", href: "/say-no-to-bare-soil" },
          { label: "Our Response", href: "/say-no-to-bare-soil/our-response" },
          { label: "Reduce Bare Soil Around Your Home" },
        ]}
        eyebrow={hero.eyebrow}
        textWidth="max-w-[38rem]"
        title={twoTone(hero.title, hero.titleAccent, true)}
      >
        <Paras items={hero.paras} className="text-[1.05rem] sm:text-[1.12rem]" />
      </FadeHero>

      <section className="pt-10">
        <div className="container-site">
          <SectionHead rule title={twoTone(paths.title, paths.titleAccent)} />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <article className="flex flex-col rounded-xl bg-gradient-to-br from-[#edf7ef] to-[#f7fbf7] px-5 py-6 sm:px-7">
              <div className="flex items-center gap-5">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-700 text-[1.9rem] font-800 text-white">1</span>
                <h3 className="text-[1.6rem] font-800 leading-[1.12] tracking-[-0.01em] text-ink sm:text-[1.85rem]">
                  {lines(install.title)}
                </h3>
              </div>
              {install.highlight && (
                <p className="mt-5 text-[1.05rem] font-800 leading-[1.35] text-brand-700">{install.highlight}</p>
              )}
              <div className="mt-3 space-y-3 text-[0.98rem] leading-[1.5] text-ink-light">
                <Paras items={install.paras} boldClass="font-800 text-ink" />
              </div>
              <HowItWorks title={install.stepsTitle} steps={install.steps} />
              <p className="mt-auto flex items-center gap-4 rounded-lg bg-[#e3f1e5] px-5 py-4 text-[1.05rem] font-800 leading-[1.35] text-brand-700 [margin-top:2rem]">
                <Leaf className="h-8 w-8 shrink-0" strokeWidth={1.8} />
                {install.note}
              </p>
            </article>

            <article className="flex flex-col rounded-xl bg-gradient-to-br from-[#eef4fb] to-[#f8fbfd] px-5 py-6 sm:px-7">
              <div className="flex items-center gap-5">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-pastel-sky text-[1.9rem] font-800 text-ink">2</span>
                <h3 className="text-[1.6rem] font-800 leading-[1.12] tracking-[-0.01em] text-ink sm:text-[1.85rem]">
                  {lines(diy.title)}
                </h3>
              </div>
              <div className="mt-5 space-y-3 text-[0.98rem] leading-[1.5] text-ink-light">
                <Paras items={diy.paras} boldClass="font-800 text-ink" />
              </div>
              <HowItWorks title={diy.stepsTitle} steps={diy.steps} />
              <p className="mt-auto flex items-center gap-4 rounded-lg bg-[#e2edf8] px-5 py-4 text-[1rem] leading-[1.4] text-ink [margin-top:2rem]">
                <Truck className="h-8 w-8 shrink-0 text-ink" strokeWidth={1.8} />
                {diy.note}
              </p>
            </article>
          </div>

          <CtaStrip
            tone="peach"
            titleTone="brand"
            className="mb-20 mt-6"
            title={talk.title}
            body={rich(talk.body)}
            cta={
              <Cta href={linkFor(talk.ctaHref, links)} whatsapp={talk.ctaHref === "{whatsapp}"}>
                {talk.cta}
              </Cta>
            }
          />
        </div>
      </section>
    </>
  );
}
