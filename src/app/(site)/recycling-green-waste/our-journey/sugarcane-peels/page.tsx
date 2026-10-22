import type { Metadata } from "next";
import { JourneyFrame, JourneySteps, type JourneyShared } from "@/components/section/journey";
import { getPageContent } from "@/lib/content/store";
import { JOURNEY_SHARED, JOURNEY_SUGARCANE } from "@/lib/content/defaults/journey";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sugarcane Peels — Our Recycling Green Waste Journey",
  description:
    "How discarded sugarcane peels around Nairobi became Miwa Mulch — a specialised, transitional soil-cover material.",
};

export default async function JourneyPage() {
  const [shared, c] = await Promise.all([
    getPageContent("recycling-green-waste--our-journey", JOURNEY_SHARED),
    getPageContent("recycling-green-waste--our-journey--sugarcane-peels", JOURNEY_SUGARCANE),
  ]);
  return (
    <JourneyFrame active="sugarcane" shared={shared as JourneyShared} headline={c.headline} series={c.series}>
      <JourneySteps steps={c.steps} />
    </JourneyFrame>
  );
}
