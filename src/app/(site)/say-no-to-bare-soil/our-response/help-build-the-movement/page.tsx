import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  BadgeCard,
  Cta,
  CtaStrip,
  FadeHero,
  NumberDisc,
  SectionHead,
  type PanelTone,
} from "@/components/section/v2";
import { getPageContent, linkSettings } from "@/lib/content/store";
import { SNBS_MOVEMENT } from "@/lib/content/defaults/snbs-movement";
import { badge, ic, lines, linkFor, twoTone } from "@/lib/content/page-helpers";
import { Paras, rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Help Build the Movement",
  description:
    "Ways you can help carry the Say No to Bare Soil message further — online, through campaign merchandise, or by helping set up a demonstration site.",
};

export default async function HelpBuildTheMovementPage() {
  const [{ hero, ways, host }, links] = await Promise.all([
    getPageContent("say-no-to-bare-soil--our-response--help-build-the-movement", SNBS_MOVEMENT),
    linkSettings(),
  ]);

  return (
    <>
      <FadeHero
        leafMark
        minHeight="md:min-h-[clamp(320px,30vw,420px)]"
        textWidth="max-w-[54rem]"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Say No to Bare Soil", href: "/say-no-to-bare-soil" },
          { label: "Our Response", href: "/say-no-to-bare-soil/our-response" },
          { label: "Help Build the Movement" },
        ]}
        eyebrow={hero.eyebrow}
        title={twoTone(hero.title, hero.titleAccent, true)}
      >
        <p className="text-[1.08rem] sm:text-[1.18rem]">{rich(hero.body)}</p>
      </FadeHero>

      <section className="pt-4">
        <div className="container-site grid gap-4 md:grid-cols-3">
          {ways.items.map((w, i) => {
            const href = linkFor(w.ctaHref, links);
            return (
              <BadgeCard
                key={i}
                image={w.image}
                imageAlt={w.imageAlt}
                icon={ic(w.icon)}
                tone={badge(w._tone)}
                align="center"
                badgeSize="md"
                surface={w._surface as "white" | PanelTone}
                aspect="aspect-[305/215]"
                insetPhoto
              >
                <div className="w-full text-left">
                  <p className="text-[0.88rem] font-800 uppercase tracking-[0.01em] text-brand-700">{w.kicker}</p>
                  <h2 className="mt-1 text-[1.75rem] font-800 leading-[1.08] tracking-[-0.015em] text-ink">
                    {lines(w.title)}
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-[1.5] text-ink-light">{rich(w.body)}</p>
                </div>
                <div className="mt-auto w-full pt-6">
                  <Cta href={href} icon={href.startsWith("#") ? "down" : "arrow"} block>
                    {w.cta}
                  </Cta>
                </div>
              </BadgeCard>
            );
          })}
        </div>
      </section>

      <section id="host" className="scroll-mt-24 pb-20 pt-5">
        <div className="container-site">
          <div className="rounded-xl bg-gradient-to-br from-[#eef4fb] to-[#f8fbfd] px-5 pb-6 pt-7 sm:px-7">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <SectionHead eyebrow={host.eyebrow} size="md" title={host.title} />
                <div className="mt-3 max-w-[48rem] space-y-3 text-[0.95rem] leading-[1.5] text-ink-light">
                  <Paras items={host.paras} />
                </div>
              </div>
              {host.illustration && (
                <Image src={host.illustration} alt="" width={348} height={394} className="hidden w-[190px] md:block" />
              )}
            </div>

            <h3 className="mt-7 text-[1.4rem] font-800 text-brand-700">{host.stepsTitle}</h3>
            <ol className="mt-4 grid gap-4 rounded-xl bg-white/70 p-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-5">
              {host.steps.map((s, i) => (
                <li key={i} className={`relative lg:px-5 ${i > 0 ? "lg:border-l lg:border-line" : "lg:pl-0"}`}>
                  <div className="flex items-center gap-3">
                    <NumberDisc
                      n={String(i + 1).padStart(2, "0")}
                      tone={(["mint", "peach", "sky"].includes(s._tone) ? s._tone : "mint") as "mint" | "peach" | "sky"}
                      className="h-12 w-12 text-[1.2rem]"
                    />
                    <h4 className="text-[1.08rem] font-800 leading-[1.18] text-ink">{s.title}</h4>
                  </div>
                  <p className="mt-3 text-[0.9rem] leading-[1.5] text-ink-light">{rich(s.body)}</p>
                  {i < host.steps.length - 1 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="absolute -right-3 top-3 hidden h-5 w-5 bg-white text-ink lg:block"
                      strokeWidth={2}
                    />
                  )}
                </li>
              ))}
            </ol>

            <CtaStrip
              className="mt-5 !bg-none bg-[#e7f3e9]"
              title={host.ctaTitle}
              body={rich(host.ctaBody)}
              cta={
                <Cta href={linkFor(host.ctaHref, links)} whatsapp={host.ctaHref === "{whatsapp}"} size="lg">
                  {host.cta}
                </Cta>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
