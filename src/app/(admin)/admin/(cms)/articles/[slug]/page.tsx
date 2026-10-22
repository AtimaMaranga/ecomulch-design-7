import { notFound } from "next/navigation";
import { ArticleEditor } from "@/components/admin/article-editor";
import { blankArticle } from "@/lib/blog/articles";
import { loadArticles } from "@/lib/blog/store";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await loadArticles();
  const article = slug === "new" ? blankArticle() : all.find((a) => a.slug === slug);
  if (!article) notFound();
  const others = all
    .filter((a) => a.slug !== slug)
    .map((a) => ({ slug: a.slug, title: a.title, status: a.status }));
  return <ArticleEditor key={slug} initial={article} originalSlug={slug} others={others} />;
}
