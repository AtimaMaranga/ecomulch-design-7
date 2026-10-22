import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/page-editor";
import { ContentEditor } from "@/components/admin/content-editor";
import { getPage, getPageContent } from "@/lib/content/store";
import { findPage } from "@/lib/content/site-map";
import { CONTENT_DEFAULTS } from "@/lib/content/defaults";

export const dynamic = "force-dynamic";

export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = findPage(slug);
  if (!meta) notFound();

  if (meta.kind === "content") {
    const defaults = CONTENT_DEFAULTS[slug];
    if (!defaults) notFound();
    const content = await getPageContent(slug, defaults);
    return (
      <ContentEditor
        slug={slug}
        title={meta.title}
        path={meta.path}
        group={meta.group}
        content={content}
        defaults={defaults}
      />
    );
  }

  const page = await getPage(slug);
  if (!page) notFound();
  return <PageEditor page={{ ...page, title: meta.title, path: meta.path }} />;
}
