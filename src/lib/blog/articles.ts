/**
 * Blog articles. Each record carries the CMS publishing fields from the
 * Publishing & Discovery Guide v1.1 (§6): title/slug, excerpt, author, date,
 * featured image + alt, one primary theme, up to two secondary themes,
 * keywords, optional series, the contextual EcoMulch page, exactly one
 * Continue Exploring mode, SEO fields and a status.
 *
 * Everything public is derived from this list, so publishing an article
 * updates Latest, All Articles, the theme filters and cross-links at once.
 */
import { getTheme, THEMES, type Theme, type ThemeSlug } from "./themes";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | {
      type: "figure";
      image: string;
      alt: string;
      caption?: string;
      /** Default in-article frame is 4:3, placed beside the text. */
      align: "left" | "right" | "full";
    }
  | { type: "callout"; text: string };

export type ContinueExploring =
  | { mode: "series"; next: string }
  | { mode: "related"; slugs: string[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  /** ISO date (YYYY-MM-DD); powers newest-first ordering. */
  date: string;
  featuredImage: string;
  featuredAlt: string;
  featuredCaption?: string;
  primaryTheme: ThemeSlug;
  /** Zero to two, no duplicates, never the primary theme. */
  secondaryThemes: ThemeSlug[];
  /** Editorial metadata only — not shown as public navigation in v1.0. */
  keywords: string[];
  series?: { name: string; order: number };
  /** The one contextual EcoMulch destination for the sidebar. */
  explore: { heading: string; body: string; cta: string; href: string } | null;
  continueExploring: ContinueExploring | null;
  seoTitle: string;
  metaDescription: string;
  status: "draft" | "published";
  body: ArticleBlock[];
};

/** Built-in starting articles, used until the blog has been saved in the admin. */
export const SEED_ARTICLES: Article[] = [
  {
    slug: "why-does-bare-soil-look-so-normal",
    title: "Why Does Bare Soil Look So Normal?",
    excerpt:
      "We are so accustomed to seeing bare soil in landscapes that it often looks completely normal. This article explores why, and what we can do instead.",
    author: "EcoMulch",
    date: "2026-09-18",
    featuredImage: "/images/article-bare-soil-feature.jpg",
    featuredAlt: "A flower bed with agapanthus and red flowers, with soil exposed between the plants",
    primaryTheme: "organic-mulch-soil-cover",
    secondaryThemes: ["flower-bed-design-care"],
    keywords: ["bare soil", "flower beds", "weeding", "soil cover", "hedges"],
    explore: {
      heading: "Interested in protecting the soil in your garden?",
      body: "Discover EcoMulch’s approach to creating healthier, well-covered soil using organic mulch, living groundcovers or both.",
      cta: "Explore Our Soil Cover Solutions",
      href: "/say-no-to-bare-soil/our-response",
    },
    // The related articles shown in the mockup are not published yet, so the
    // module stays hidden until they are (see visibleContinue()).
    continueExploring: {
      mode: "related",
      slugs: [
        "what-do-we-mean-when-we-say-no-to-bare-soil",
        "choosing-a-soil-cover-solution-for-your-garden",
      ],
    },
    seoTitle: "Why Does Bare Soil Look So Normal?",
    metaDescription:
      "We are so accustomed to seeing bare soil in landscapes that it often looks completely normal. EcoMulch explores why, and what we can do instead.",
    status: "published",
    body: [
      {
        type: "p",
        text: "In our last article, we explained what EcoMulch means when we talk about the challenge of bare soil. We are particularly interested in the soil we leave exposed within landscapes that we deliberately plant and maintain: between plants in flower beds, underneath hedges and along fences, and around trees.",
      },
      { type: "p", text: "But once we started noticing these spaces, another question followed." },
      { type: "h2", text: "Why is bare soil so common?" },
      {
        type: "p",
        text: "We do not pretend to have a definitive answer. We have not surveyed homeowners, gardeners or landscapers to ask why they maintain landscapes in particular ways. But we do have some ideas. And one of them starts with a very familiar concept: keeping a garden clean.",
      },
      { type: "h2", text: "What does a “clean” garden look like?" },
      {
        type: "figure",
        image: "/images/article-clean-bed.jpg",
        alt: "A freshly weeded flower bed with soil exposed between the plants",
        caption: "A freshly weeded flower bed often looks “clean” — with exposed soil between the plants.",
        align: "right",
      },
      {
        type: "p",
        text: "Think about a flower bed that needs some attention. Perhaps weeds have started growing between the flowers and shrubs. Someone comes along and weeds the bed, removing the unwanted plants and vegetation.",
      },
      { type: "p", text: "When the work is finished, the flowers remain and the soil between them is exposed." },
      { type: "p", text: "The flower bed is now “clean.”" },
      { type: "h2", text: "Bare soil has become the finished landscape" },
      {
        type: "figure",
        image: "/images/article-hedge.jpg",
        alt: "A clipped hedge with a strip of bare soil along its base",
        caption: "A narrow strip of bare soil is common underneath hedges, even in well-maintained landscapes.",
        align: "left",
      },
      {
        type: "p",
        text: "We see variations of the same practice elsewhere. Vegetation underneath a hedge is cleared. Weeds around a tree are removed. Unwanted plants along a fence are eliminated.",
      },
      {
        type: "p",
        text: "There is nothing surprising about wanting to control weeds. The interesting question is what happens next.",
      },
      { type: "p", text: "Often, nothing." },
      { type: "p", text: "The exposed soil becomes the finished landscape." },
      { type: "h2", text: "Why does this look normal?" },
      {
        type: "figure",
        image: "/images/article-tree.jpg",
        alt: "The base of a tree with weeds removed and the soil around it uncovered",
        caption: "A tree may be well cared for, with weeds removed, but the soil around it often remains completely uncovered.",
        align: "right",
      },
      {
        type: "p",
        text: "We suspect this is one reason bare soil can be so difficult to notice as a problem. We have become accustomed to seeing it. In many landscapes, a weed-free surface can actually be interpreted as evidence that somebody is taking good care of the property.",
      },
      { type: "callout", text: "Bare soil doesn’t necessarily look unfinished. It looks normal." },
    ],
  },
];

/* ─────────────────────────── queries ─────────────────────────── */
/* All queries take the full article list (see lib/blog/store.ts). */

/** Published articles, newest first. Drafts never leak to public pages. */
export function publishedOf(all: Article[]): Article[] {
  return all.filter((a) => a.status === "published").sort((a, b) => b.date.localeCompare(a.date));
}

export function findPublished(all: Article[], slug: string): Article | undefined {
  return publishedOf(all).find((a) => a.slug === slug);
}

export function articleThemes(a: Article): Theme[] {
  return [a.primaryTheme, ...a.secondaryThemes]
    .map((t) => getTheme(t))
    .filter((t): t is Theme => Boolean(t));
}

export function inTheme(a: Article, theme: ThemeSlug): boolean {
  return a.primaryTheme === theme || a.secondaryThemes.includes(theme);
}

/** Themes with at least one published article — empty themes stay hidden. */
export function visibleThemes(all: Article[]): (Theme & { count: number })[] {
  const pub = publishedOf(all);
  return THEMES.map((t) => ({ ...t, count: pub.filter((a) => inTheme(a, t.slug)).length })).filter(
    (t) => t.count > 0,
  );
}

/** The Continue Exploring module, keeping only links to published articles. */
export function visibleContinue(
  all: Article[],
  a: Article,
): { mode: "series"; next: Article } | { mode: "related"; items: Article[] } | null {
  const c = a.continueExploring;
  if (!c) return null;
  if (c.mode === "series") {
    const next = findPublished(all, c.next);
    return next ? { mode: "series", next } : null;
  }
  const items = c.slugs
    .map((s) => findPublished(all, s))
    .filter((x): x is Article => Boolean(x))
    .slice(0, 3);
  return items.length ? { mode: "related", items } : null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[“”"'’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** In This Article — built from the H2 headings, never typed by hand. */
export function articleOutline(a: Article): { id: string; text: string }[] {
  return a.body
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({ id: slugify(b.text), text: b.text }));
}

export function readingMinutes(a: Article): number {
  const words = a.body
    .map((b) => ("text" in b ? b.text : "caption" in b ? b.caption ?? "" : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!y || !m || !d) return iso;
  return `${d} ${months[m - 1]} ${y}`;
}

/**
 * Publishing checks from the guide (§6 and §10). Drafts may be incomplete;
 * an article can only be published once these all pass.
 */
export function publishProblems(a: Article, all: Article[]): string[] {
  const p: string[] = [];
  if (!a.title.trim()) p.push("Add a title.");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) p.push("The web address (slug) may only use lowercase letters, numbers and hyphens.");
  if (all.some((o) => o !== a && o.slug === a.slug)) p.push("Another article already uses this web address.");
  if (!a.excerpt.trim()) p.push("Write a short summary (excerpt).");
  if (!a.author.trim()) p.push("Add an author.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date)) p.push("Choose a publication date.");
  if (!a.featuredImage) p.push("Add a featured image.");
  if (!a.featuredAlt.trim()) p.push("Describe the featured image (alt text).");
  if (!getTheme(a.primaryTheme)) p.push("Choose a primary theme.");
  if (a.secondaryThemes.length > 2) p.push("Choose at most two secondary themes.");
  if (a.secondaryThemes.includes(a.primaryTheme)) p.push("A secondary theme can’t repeat the primary theme.");
  if (!a.body.some((b) => b.type === "p" && b.text.trim())) p.push("Write the article body.");
  if (a.body.some((b) => b.type === "figure" && (!b.image || !b.alt.trim())))
    p.push("Every photo in the article needs an image and a description.");
  if (!a.seoTitle.trim()) p.push("Add an SEO title.");
  if (!a.metaDescription.trim()) p.push("Add a meta description.");
  if (a.explore && (!a.explore.heading.trim() || !a.explore.href.trim()))
    p.push("The “Explore EcoMulch’s work” box needs a heading and a link.");
  return p;
}

/** A new, empty draft. */
export function blankArticle(): Article {
  return {
    slug: "",
    title: "",
    excerpt: "",
    author: "EcoMulch",
    date: new Date().toISOString().slice(0, 10),
    featuredImage: "",
    featuredAlt: "",
    primaryTheme: "organic-mulch-soil-cover",
    secondaryThemes: [],
    keywords: [],
    explore: null,
    continueExploring: null,
    seoTitle: "",
    metaDescription: "",
    status: "draft",
    body: [{ type: "p", text: "" }],
  };
}
