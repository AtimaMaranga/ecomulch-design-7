/**
 * Every editable page on the site, grouped the way the public menu is.
 *
 *  - "blocks"  pages are built from sections the editor can add, remove and
 *    reorder (the section landing pages and the homepage).
 *  - "content" pages keep a fixed, designed layout; every text, photo, link
 *    and repeatable item on them is editable (the sub-pages).
 *
 * Content-page slugs are the URL path with "/" replaced by "--".
 */

export type PageKind = "blocks" | "content";

export type SiteMapEntry = {
  slug: string;
  title: string;
  path: string;
  group: SiteGroup;
  kind: PageKind;
};

export const GROUPS = [
  "Home",
  "Who We Are",
  "Recycling Green Waste",
  "Say No to Bare Soil",
  "Greening Urban Spaces",
  "Blog",
] as const;
export type SiteGroup = (typeof GROUPS)[number];

const content = (path: string, title: string, group: SiteGroup): SiteMapEntry => ({
  slug: path.replace(/^\//, "").replace(/\//g, "--"),
  title,
  path,
  group,
  kind: "content",
});

export const SITE_MAP: SiteMapEntry[] = [
  { slug: "home", title: "Homepage", path: "/", group: "Home", kind: "blocks" },

  { slug: "who-we-are", title: "Who We Are", path: "/who-we-are", group: "Who We Are", kind: "blocks" },
  content("/who-we-are/how-we-started", "How We Started", "Who We Are"),
  content("/who-we-are/our-why", "Our Why", "Who We Are"),
  content("/who-we-are/principles", "Greening Principles", "Who We Are"),

  { slug: "recycling-green-waste", title: "Recycling Green Waste", path: "/recycling-green-waste", group: "Recycling Green Waste", kind: "blocks" },
  content("/recycling-green-waste/the-challenge", "The Green Waste Challenge", "Recycling Green Waste"),
  content("/recycling-green-waste/our-journey", "Our Journey (shared parts)", "Recycling Green Waste"),
  content("/recycling-green-waste/our-journey/sugarcane-peels", "Journey: Sugarcane Peels", "Recycling Green Waste"),
  content("/recycling-green-waste/our-journey/green-coconut-husks", "Journey: Green Coconut Husks", "Recycling Green Waste"),
  content("/recycling-green-waste/our-journey/pine-bark", "Journey: Pine Bark", "Recycling Green Waste"),

  { slug: "say-no-to-bare-soil", title: "Say No to Bare Soil", path: "/say-no-to-bare-soil", group: "Say No to Bare Soil", kind: "blocks" },
  content("/say-no-to-bare-soil/the-challenge", "The Bare Soil Challenge", "Say No to Bare Soil"),
  content("/say-no-to-bare-soil/our-response", "Our Response", "Say No to Bare Soil"),
  content("/say-no-to-bare-soil/our-response/help-build-the-movement", "Help Build the Movement", "Say No to Bare Soil"),
  content("/say-no-to-bare-soil/our-response/mulching-your-home", "Mulching Your Home", "Say No to Bare Soil"),

  { slug: "greening-urban-spaces", title: "Greening Urban Spaces", path: "/greening-urban-spaces", group: "Greening Urban Spaces", kind: "blocks" },
  content("/greening-urban-spaces/the-challenge", "The Urban Greening Challenge", "Greening Urban Spaces"),
  content("/greening-urban-spaces/what-we-offer", "What We Offer", "Greening Urban Spaces"),
  content("/greening-urban-spaces/what-we-offer/curated-plants", "Curated Indoor & Patio Plants", "Greening Urban Spaces"),
  content("/greening-urban-spaces/what-we-offer/flower-beds", "Transforming Flower Beds", "Greening Urban Spaces"),

  { slug: "blog", title: "Blog homepage", path: "/blog", group: "Blog", kind: "blocks" },
];

export function findPage(slug: string): SiteMapEntry | undefined {
  return SITE_MAP.find((p) => p.slug === slug);
}

export const contentSlug = (path: string) => path.replace(/^\//, "").replace(/\//g, "--");
