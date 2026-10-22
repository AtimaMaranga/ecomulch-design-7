import type { Metadata } from "next";
import { JourneyFrame, JourneySteps, type JourneyShared } from "@/components/section/journey";
import { getPageContent } from "@/lib/content/store";
import { JOURNEY_SHARED, JOURNEY_PINE } from "@/lib/content/defaults/journey";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pine Bark — Our Recycling Green Waste Journey",
  description:
    "A roadside fire near Naivasha led EcoMulch to sawmill pine bark — and to asking which material, or combination of materials, is right for a particular space.",
};

export default async function JourneyPage() {
  const [shared, c] = await Promise.all([
    getPageContent("recycling-green-waste--our-journey", JOURNEY_SHARED),
    getPageContent("recycling-green-waste--our-journey--pine-bark", JOURNEY_PINE),
  ]);
  return (
    <JourneyFrame active="pine" shared={shared as JourneyShared} headline={c.headline} series={c.series}>
      <JourneySteps steps={c.steps} />
    </JourneyFrame>
  );
}
