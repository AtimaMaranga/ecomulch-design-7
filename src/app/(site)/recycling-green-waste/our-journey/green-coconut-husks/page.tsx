import type { Metadata } from "next";
import { JourneyFrame, JourneySteps, type JourneyShared } from "@/components/section/journey";
import { getPageContent } from "@/lib/content/store";
import { JOURNEY_SHARED, JOURNEY_COCONUT } from "@/lib/content/defaults/journey";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Green Coconut Husks — Our Recycling Green Waste Journey",
  description:
    "How discarded madafu husks revealed coco fibre, chunks, chips and cocopeat — and led EcoMulch into soil cover and growing media made from recovered materials.",
};

export default async function JourneyPage() {
  const [shared, c] = await Promise.all([
    getPageContent("recycling-green-waste--our-journey", JOURNEY_SHARED),
    getPageContent("recycling-green-waste--our-journey--green-coconut-husks", JOURNEY_COCONUT),
  ]);
  return (
    <JourneyFrame active="coconut" shared={shared as JourneyShared} headline={c.headline} series={c.series}>
      <JourneySteps steps={c.steps} />
    </JourneyFrame>
  );
}
