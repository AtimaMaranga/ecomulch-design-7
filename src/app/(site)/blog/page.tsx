import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, Leaf } from "lucide-react";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { IconBadge } from "@/components/section/blocks";
import { getPage, getSettings, whatsappUrl } from "@/lib/content/store";
import { resolveIcon } from "@/lib/content/icon-registry";
import type { IconComponent } from "@/components/icons";
import { loadArticles } from "@/lib/blog/store";
import {
  formatDate,
  publishedOf,
  readingMinutes,
  visibleThemes,
  type Article,
} from "@/lib/blog/articles";
import { getTheme } from "@/lib/blog/themes";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories, observations and practical guidance from EcoMulch’s journey to recycle green waste, protect soil and create thriving urban environments for plants and people.",
};

const PAGE_SIZE = 6;

function ThemeChip({ slug }: { slug: string }) {
  const t = getTheme(slug);
  if (!t) return null;
  return (
    <span className="inline-block rounded-full bg-pastel-mint px-3 py-1 text-[0.72rem] font-700 uppercase tracking-[0.02em] text-brand-700">
      {t.name}
    </span>
  );
}

function Meta({ a }: { a: Article }) {
  return (
    <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.86rem] text-ink-light">
      <span className="flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
        <time dateTime={a.date}>{formatDate(a.date)}</time>
      </span>
      <span className="flex items-center gap-1.5">
        <Clock className="h-4 w-4" strokeWidth={1.8} />
        {readingMinutes(a)} min read
      </span>
    </p>
  );
}

function themeHref(slug?: string) {
  return slug ? `/blog?theme=${slug}#articles` : "/blog#articles";
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string; show?: string }>;
}) {
  const [page, settings, params] = await Promise.all([
    getPage("blog"),
    getSettings(),
    searchParams,
  ]);
  if (!page) notFound();

  const all = await loadArticles();
  const articles = publishedOf(all);
  const latest = articles[0];
  const themes = visibleThemes(all);
  const active = themes.find((t) => t.slug === params.theme);
  const filtered = active
    ? articles.filter(
        (a) => a.primaryTheme === active.slug || a.secondaryThemes.includes(active.slug),
      )
    : articles;
  const shown = Math.max(PAGE_SIZE, Number(params.show) || PAGE_SIZE);
  const listed = filtered.slice(0, shown);

  return (
    <>
      <BlockRenderer
        blocks={page.blocks}
        ctx={{ whatsappUrl: whatsappUrl(settings) }}
        endSpacer={false}
      />

      {/* Latest */}
      {latest && (
        <section className="pt-10">
          <div className="container-site">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-[1.8rem] font-800 tracking-[-0.015em] text-ink sm:text-[2.1rem]">
                Latest from EcoMulch
              </h2>
              <Link
                href="/blog#articles"
                className="group flex shrink-0 items-center gap-2 pb-1.5 text-[0.95rem] font-700 text-brand-700 hover:text-brand-800"
              >
                View all articles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
              </Link>
            </div>
            <Link
              href={`/blog/${latest.slug}`}
              className="group mt-4 grid gap-6 rounded-xl border border-line bg-white p-3.5 shadow-[0_1px_3px_rgba(12,40,82,0.05)] transition-shadow hover:shadow-[0_10px_28px_-14px_rgba(12,40,82,0.25)] md:grid-cols-[1fr_1fr] md:gap-7"
            >
              <div className="relative aspect-[375/183] overflow-hidden rounded-lg">
                <Image
                  src={latest.featuredImage}
                  alt={latest.featuredAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col py-2 pr-3">
                <div>
                  <ThemeChip slug={latest.primaryTheme} />
                </div>
                <h3 className="mt-3 text-[1.6rem] font-800 leading-[1.15] tracking-[-0.01em] text-ink sm:text-[1.85rem]">
                  {latest.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.5] text-ink-light">{latest.excerpt}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                  <Meta a={latest} />
                  <span className="flex items-center gap-2 text-[0.95rem] font-700 text-brand-700">
                    Read the article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Themes */}
      <section className="pt-12">
        <div className="container-site">
          <h2 className="text-[1.8rem] font-800 tracking-[-0.015em] text-ink sm:text-[2.1rem]">
            Explore Our Articles by Theme
          </h2>
          <p className="mt-1.5 text-[1rem] leading-[1.5] text-ink-light">
            Choose a topic you’re interested in. Each theme brings together articles,
            practical guidance and real experiences from EcoMulch.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {themes.map((t) => (
              <Link
                key={t.slug}
                href={themeHref(t.slug)}
                className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-[0_10px_28px_-14px_rgba(12,40,82,0.25)]"
              >
                <div className="relative">
                  <div className="relative aspect-[180/97] overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <IconBadge
                    icon={resolveIcon(t.icon) as unknown as IconComponent}
                    tone={{ soft: "mint" }}
                    ring
                    className="absolute -bottom-6 left-4 h-[52px] w-[52px]"
                    iconClassName="h-6 w-6"
                  />
                </div>
                <div className="flex flex-1 flex-col px-4 pb-4 pt-8">
                  <h3 className="text-[1.05rem] font-800 leading-[1.2] text-ink">{t.name}</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-[1.45] text-ink-light">{t.blurb}</p>
                  <span className="mt-auto flex items-center gap-2 pt-3 text-[0.9rem] font-700 text-brand-700">
                    Explore articles
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            ))}
            <div className="flex flex-col justify-center rounded-lg bg-gradient-to-br from-[#edf7ef] to-[#f6fbf6] p-5">
              <Leaf className="h-9 w-9 text-brand-600" strokeWidth={1.7} />
              <h3 className="mt-3 text-[1.35rem] font-800 leading-[1.15] text-brand-700">
                Not sure where to start?
              </h3>
              <p className="mt-2 text-[0.95rem] leading-[1.45] text-ink-light">
                Browse all articles in chronological order.
              </p>
              <Link
                href={themeHref()}
                className="group mt-4 flex w-fit items-center gap-2 rounded-md border-[1.5px] border-brand-600 bg-white px-5 py-2.5 text-[0.95rem] font-700 text-brand-700 transition-colors hover:bg-brand-50"
              >
                View all articles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Article listing, filtered on the same page */}
      <section id="articles" className="scroll-mt-28 pb-20 pt-12">
        <div className="container-site">
          <h2 className="text-[1.8rem] font-800 tracking-[-0.015em] text-ink sm:text-[2.1rem]">
            {active ? active.name : "All Articles"}
          </h2>
          <nav aria-label="Filter articles by theme" className="mt-4">
            <ul className="flex flex-wrap gap-2">
              {[{ slug: undefined, name: "All Articles" }, ...themes].map((t) => {
                const on = (active?.slug ?? undefined) === t.slug;
                return (
                  <li key={t.name}>
                    <Link
                      href={themeHref(t.slug)}
                      scroll={false}
                      aria-current={on ? "page" : undefined}
                      className={`inline-block rounded-full border px-4 py-2 text-[0.88rem] font-700 transition-colors ${
                        on
                          ? "border-brand-700 bg-brand-700 text-white"
                          : "border-line bg-white text-ink hover:border-brand-500 hover:text-brand-700"
                      }`}
                    >
                      {t.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listed.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-[0_10px_28px_-14px_rgba(12,40,82,0.25)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={a.featuredImage}
                    alt={a.featuredAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div>
                    <ThemeChip slug={a.primaryTheme} />
                  </div>
                  <h3 className="mt-3 text-[1.2rem] font-800 leading-[1.22] text-ink">{a.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-[1.5] text-ink-light">{a.excerpt}</p>
                  <div className="mt-auto pt-4">
                    <Meta a={a} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length > listed.length && (
            <div className="mt-8 flex justify-center">
              <Link
                href={`/blog?${active ? `theme=${active.slug}&` : ""}show=${shown + PAGE_SIZE}#articles`}
                scroll={false}
                className="rounded-md border-[1.5px] border-brand-600 px-6 py-2.5 text-[0.95rem] font-700 text-brand-700 transition-colors hover:bg-brand-50"
              >
                Load more articles
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
