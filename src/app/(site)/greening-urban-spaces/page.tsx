import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPage, getSettings, whatsappUrl } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Greening Urban Spaces",
  description:
    "Practical ways to bring more living green into the places where people live and work: flower bed transformations, indoor and patio plants, and guidance on growing plants in built-up environments.",
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
