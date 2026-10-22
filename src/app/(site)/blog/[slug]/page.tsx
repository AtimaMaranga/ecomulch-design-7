import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ChevronRight, Leaf, ListTree } from "lucide-react";
import {
  articleOutline,
  articleThemes,
  findPublished,
  formatDate,
  readingMinutes,
  slugify,
  visibleContinue,
  type Article,
  type ArticleBlock,
} from "@/lib/blog/articles";
import { getTheme } from "@/lib/blog/themes";
import { loadArticles } from "@/lib/blog/store";
import { isAuthenticated } from "@/lib/admin-session";

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

export const dynamic = "force-dynamic";

/** The article to show: published, or any status when an admin previews it. */
async function resolve(slug: string, preview: boolean) {
  const all = await loadArticles();
  if (preview && (await isAuthenticated())) {
    return { all, article: all.find((a) => a.slug === slug), preview: true };
  }
  return { all, article: findPublished(all, slug), preview: false };
}

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const { article: a } = await resolve(slug, preview === "1");
  if (!a) return {};
  return {
    title: a.seoTitle,
    description: a.metaDescription,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.seoTitle,
      description: a.metaDescription,
      publishedTime: a.date,
      authors: [a.author],
      images: [{ url: a.featuredImage, alt: a.featuredAlt }],
    },
  };
}

function Block({ b }: { b: ArticleBlock }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h2":
      return (
        <h2
          id={slugify(b.text)}
          className="clear-both scroll-mt-28 pt-4 text-[1.55rem] font-800 leading-[1.2] tracking-[-0.01em] text-ink after:mt-3 after:block after:h-[3px] after:w-10 after:rounded-full after:bg-brand-600 sm:text-[1.75rem]"
        >
          {b.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-2 text-[1.2rem] font-800 text-ink">{b.text}</h3>;
    case "callout":
      return (
        <p className="clear-both rounded-lg bg-gradient-to-r from-[#e9f5ea] to-[#f2f9f2] px-6 py-4 text-center text-[1.05rem] font-800 leading-[1.4] text-brand-700">
          {b.text}
        </p>
      );
    case "figure": {
      const side =
        b.align === "full"
          ? "w-full"
          : b.align === "right"
            ? "sm:float-right sm:ml-6 sm:w-[46%]"
            : "sm:float-left sm:mr-6 sm:w-[40%]";
      return (
        <figure className={`mb-3 mt-1 ${side}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={b.image} alt={b.alt} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" />
          </div>
          {b.caption && (
            <figcaption className="mt-2 text-[0.8rem] italic leading-[1.4] text-ink-light">
              {b.caption}
            </figcaption>
          )}
        </figure>
      );
    }
  }
}

function Outline({ a }: { a: Article }) {
  const items = articleOutline(a);
  if (items.length === 0) return null;
  return (
    <ol className="mt-3 space-y-0 border-l-2 border-line">
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            className="-ml-[2px] block border-l-2 border-transparent py-1.5 pl-4 text-[0.9rem] leading-[1.35] text-ink-light transition-colors hover:border-brand-600 hover:text-brand-700"
          >
            {it.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

const SIDE_CARD = "rounded-xl bg-gradient-to-br from-[#edf7ef] to-[#f7fbf7] p-5";

export default async function ArticlePage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { preview: previewParam } = await searchParams;
  const { all, article: a, preview } = await resolve(slug, previewParam === "1");
  if (!a) notFound();

  const primary = getTheme(a.primaryTheme)!;
  const themes = articleThemes(a);
  const cont = visibleContinue(all, a);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.metaDescription,
    datePublished: a.date,
    author: { "@type": "Organization", name: a.author },
    image: a.featuredImage,
  };

  return (
    <article>
      {preview && a.status !== "published" && (
        <p className="bg-amber-100 px-5 py-2.5 text-center text-sm font-700 text-amber-900">
          Preview — this article is a draft and is not visible to the public yet.
        </p>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative h-[clamp(200px,24vw,360px)] w-full overflow-hidden">
        <Image src={a.featuredImage} alt={a.featuredAlt} fill priority sizes="100vw" className="object-cover" />
      </div>

      <div className="container-site pt-5">
        <nav aria-label="Breadcrumb">
          {/* Mobile simplifies to a single "Back to Blog" link. */}
          <Link href="/blog" className="text-[0.9rem] font-700 text-brand-700 sm:hidden">
            ← Back to Blog
          </Link>
          <ol className="hidden flex-wrap items-center gap-2 text-[0.86rem] sm:flex">
            <li><Link href="/" className="text-brand-700 hover:underline">Home</Link></li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-ink-light" /></li>
            <li><Link href="/blog" className="text-brand-700 hover:underline">Blog</Link></li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-ink-light" /></li>
            <li>
              <Link href={`/blog?theme=${primary.slug}#articles`} className="text-brand-700 hover:underline">
                {primary.name}
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-ink-light" /></li>
            <li aria-current="page" className="text-ink-light">{a.title}</li>
          </ol>
        </nav>

        <h1 className="mt-4 text-[2.1rem] font-800 leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
          {a.title}
        </h1>
        <p className="mt-3 text-[0.95rem] text-ink-light">
          By {a.author} <span className="mx-2 text-line">|</span>
          <time dateTime={a.date}>{formatDate(a.date)}</time>
          <span className="mx-2 text-line">|</span>
          {readingMinutes(a)} min read
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {themes.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/blog?theme=${t.slug}#articles`}
                className="inline-block rounded-full bg-pastel-mint px-3.5 py-1.5 text-[0.8rem] font-700 text-brand-700 transition-colors hover:bg-brand-100"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-10 pb-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <div className="min-w-0">
            {/* Mobile: collapsible contents before the article. */}
            <details className={`${SIDE_CARD} mb-6 lg:hidden`}>
              <summary className="flex cursor-pointer list-none items-center gap-2 text-[0.92rem] font-800 uppercase text-brand-700">
                <ListTree className="h-5 w-5" /> In this article
              </summary>
              <Outline a={a} />
            </details>

            <div className="max-w-[46rem] space-y-4 text-[1.04rem] leading-[1.65] text-ink-light after:clear-both after:block after:content-['']">
              {a.body.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className={`${SIDE_CARD} hidden lg:block`}>
              <p className="flex items-center gap-2 text-[0.92rem] font-800 uppercase text-brand-700">
                <ListTree className="h-5 w-5" /> In this article
              </p>
              <Outline a={a} />
            </div>

            {a.explore && (
              <div className={SIDE_CARD}>
                <div className="flex items-start gap-3">
                  <Leaf className="h-9 w-9 shrink-0 text-brand-600" strokeWidth={1.7} />
                  <p className="text-[0.95rem] font-800 uppercase leading-[1.3] text-brand-700">
                    {a.explore.heading}
                  </p>
                </div>
                <p className="mt-3 text-[0.92rem] leading-[1.5] text-ink-light">{a.explore.body}</p>
                <Link
                  href={a.explore.href}
                  className="group mt-4 flex items-center justify-center gap-2 rounded-md border-[1.5px] border-brand-600 bg-white px-4 py-2.5 text-[0.9rem] font-700 text-brand-700 transition-colors hover:bg-brand-50"
                >
                  {a.explore.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                </Link>
              </div>
            )}

            {cont && (
              <div className="rounded-xl border border-line bg-white p-5">
                <p className="flex items-center gap-2 text-[0.92rem] font-800 uppercase text-brand-700">
                  <BookOpen className="h-5 w-5" /> Continue exploring
                </p>
                <p className="mt-3 text-[0.95rem] font-800 text-ink">
                  {cont.mode === "series" ? "Next in this series" : "Related articles"}
                </p>
                <ul className="mt-3 space-y-4">
                  {(cont.mode === "series" ? [cont.next] : cont.items).map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="group flex gap-3">
                        <span className="relative h-[64px] w-[84px] shrink-0 overflow-hidden rounded-md">
                          <Image src={r.featuredImage} alt="" fill sizes="84px" className="object-cover" />
                        </span>
                        <span>
                          <span className="block text-[0.9rem] font-800 leading-[1.25] text-ink group-hover:text-brand-700">
                            {r.title}
                          </span>
                          <span className="mt-1 block text-[0.8rem] leading-[1.35] text-ink-light line-clamp-2">
                            {r.excerpt}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/blog#articles"
                  className="group mt-4 flex items-center justify-center gap-2 rounded-md border-[1.5px] border-brand-600 px-4 py-2.5 text-[0.9rem] font-700 text-brand-700 transition-colors hover:bg-brand-50"
                >
                  Explore More Articles
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
