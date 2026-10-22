import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPage, getSettings, whatsappUrl } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Recycling Green Waste",
  description:
    "Giving green waste another life: how EcoMulch recovers sugarcane peels, green coconut husks and pine bark and puts them to work in healthier, greener urban landscapes.",
};

export default async function RecyclingGreenWastePage() {
  const [page, settings] = await Promise.all([
    getPage("recycling-green-waste"),
    getSettings(),
  ]);
  if (!page) notFound();
  return (
    <BlockRenderer
      blocks={page.blocks}
      ctx={{ whatsappUrl: whatsappUrl(settings) }}
    />
  );
}
