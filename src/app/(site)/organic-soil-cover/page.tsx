import type { Metadata } from "next";
import { IntroHero } from "@/components/section/explore";
import { NumberedHub } from "@/components/section/osc";
import { getPageContent } from "@/lib/content/store";
import { OSC_LANDING } from "@/lib/content/defaults/organic-soil-cover";
import { ic } from "@/lib/content/page-helpers";
import { rich } from "@/lib/content/rich";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Organic Soil Cover",
  description:
    "Natural, plant-derived materials to protect and finish exposed soil: why soil cover matters, our organic mulches and planter toppings, and the Say No to Bare Soil campaign.",
};

export default async function OrganicSoilCoverPage() {
  const { intro, explore } = await getPageContent("organic-soil-cover", OSC_LANDING);
  const opt = (o: { icon: string; title: string; body: string; href: string }) => ({ ...o, icon: ic(o.icon) });
  return (
    <>
      <IntroHero
        title={intro.title}
        image={intro.image}
        mobileImage={intro.mobileImage || undefined}
        imageAlt={intro.imageAlt}
        photo="fade"
        mobileAspect="aspect-[607/223]"
      >
        {intro.paras.map((p, i) => (
          <p key={i}>{rich(p, "font-800 text-pine-deep")}</p>
        ))}
      </IntroHero>
      <NumberedHub
        title={explore.title}
        lede={explore.lede}
        first={opt(explore.challenge)}
        group={opt(explore.response)}
        options={explore.options.map(opt)}
      />
    </>
  );
}
