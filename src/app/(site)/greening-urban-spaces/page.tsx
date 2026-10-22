import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPage, getSettings, whatsappUrl } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Greening Urban Spaces",
  description:
    "Helping people and plants thrive together in urban spaces — better growing environments and thoughtful ways of bringing plants into homes, workplaces and outdoor spaces.",
};

export default async function GreeningUrbanSpacesPage() {
  const [page, settings] = await Promise.all([
    getPage("greening-urban-spaces"),
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
