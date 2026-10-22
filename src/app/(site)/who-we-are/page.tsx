import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPage, getSettings, whatsappUrl } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "EcoMulch is a sustainable urban greening company based in Kiambu, Kenya. Discover our origin, our why, and the principles behind our work.",
};

export default async function WhoWeArePage() {
  const [page, settings] = await Promise.all([
    getPage("who-we-are"),
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
