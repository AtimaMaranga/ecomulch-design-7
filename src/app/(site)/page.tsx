import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPage, getSettings, whatsappUrl } from "@/lib/content/store";

// Read content on every request so edits made in the admin appear immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [page, settings] = await Promise.all([getPage("home"), getSettings()]);
  if (!page) notFound();
  return <BlockRenderer blocks={page.blocks} ctx={{ whatsappUrl: whatsappUrl(settings) }} />;
}
