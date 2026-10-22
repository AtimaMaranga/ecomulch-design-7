import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPage, getSettings, whatsappUrl } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Say No to Bare Soil",
  description:
    "Protecting and nurturing living soils with mulch and plants—keeping them cool, healthy, moist and full of life.",
};

export default async function SayNoToBareSoilPage() {
  const [page, settings] = await Promise.all([
    getPage("say-no-to-bare-soil"),
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
