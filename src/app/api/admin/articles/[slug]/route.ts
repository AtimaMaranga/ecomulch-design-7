import { revalidatePath } from "next/cache";
import { guardApi } from "@/lib/admin-session";
import { loadArticles, saveArticles } from "@/lib/blog/store";
import { publishProblems, type Article } from "@/lib/blog/articles";

type Ctx = { params: Promise<{ slug: string }> };

/**
 * Create or update one article. `slug` in the URL is the article's current
 * address ("new" when creating); the body carries the full article, whose
 * own slug may differ if the editor renamed it.
 */
export async function PUT(req: Request, { params }: Ctx) {
  const denied = await guardApi();
  if (denied) return denied;
  const { slug } = await params;

  let article: Article;
  try {
    ({ article } = (await req.json()) as { article: Article });
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!article || typeof article.slug !== "string" || !article.title?.trim()) {
    return Response.json({ error: "An article needs at least a title." }, { status: 400 });
  }

  const all = await loadArticles();
  const others = all.filter((a) => a.slug !== slug);
  if (others.some((a) => a.slug === article.slug)) {
    return Response.json({ error: "Another article already uses this web address." }, { status: 409 });
  }
  if (article.status === "published") {
    const problems = publishProblems(article, [...others, article]);
    if (problems.length) {
      return Response.json({ error: "This article isn’t ready to publish yet.", problems }, { status: 422 });
    }
  }

  const exists = all.some((a) => a.slug === slug);
  const next = exists ? all.map((a) => (a.slug === slug ? article : a)) : [...all, article];
  // Keep cross-links valid if the article's address changed.
  if (exists && slug !== article.slug) {
    for (const a of next) {
      const c = a.continueExploring;
      if (c?.mode === "series" && c.next === slug) c.next = article.slug;
      if (c?.mode === "related") c.slugs = c.slugs.map((s) => (s === slug ? article.slug : s));
    }
  }

  try {
    await saveArticles(next);
  } catch (err) {
    console.error("[admin] saveArticles failed", err);
    return Response.json({ error: "Could not save. The storage backend rejected the write." }, { status: 500 });
  }
  revalidatePath("/blog");
  revalidatePath(`/blog/${article.slug}`);
  if (slug !== article.slug) revalidatePath(`/blog/${slug}`);
  return Response.json({ ok: true, slug: article.slug });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await guardApi();
  if (denied) return denied;
  const { slug } = await params;
  const all = await loadArticles();
  if (!all.some((a) => a.slug === slug)) {
    return Response.json({ error: "Article not found" }, { status: 404 });
  }
  const next = all
    .filter((a) => a.slug !== slug)
    .map((a) => {
      const c = a.continueExploring;
      if (c?.mode === "series" && c.next === slug) return { ...a, continueExploring: null };
      if (c?.mode === "related") return { ...a, continueExploring: { ...c, slugs: c.slugs.filter((s) => s !== slug) } };
      return a;
    });
  await saveArticles(next);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return Response.json({ ok: true });
}
