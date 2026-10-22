/**
 * The seven approved, visitor-facing Blog themes (Publishing & Discovery
 * Guide v1.1, §2). This is the controlled vocabulary: an article has exactly
 * one primary theme and up to two secondary themes from this list. Add or
 * rename a theme here only by deliberate editorial decision.
 */

export type ThemeSlug =
  | "organic-mulch-soil-cover"
  | "flower-bed-design-care"
  | "indoor-plants"
  | "patio-balcony-plants"
  | "growing-media-plant-health"
  | "recycling-green-waste"
  | "sustainable-urban-greening";

export type Theme = {
  slug: ThemeSlug;
  name: string;
  /** Short line on the theme card. */
  blurb: string;
  image: string;
  imageAlt: string;
  /** Icon name from the icon registry. */
  icon: string;
};

export const THEMES: Theme[] = [
  {
    slug: "organic-mulch-soil-cover",
    name: "Organic Mulch & Soil Cover",
    blurb: "Learn about organic mulch, soil protection, weeds and healthier growing conditions.",
    image: "/images/blog-theme-mulch.jpg",
    imageAlt: "A young plant growing through organic mulch",
    icon: "leaf-outline",
  },
  {
    slug: "flower-bed-design-care",
    name: "Flower Bed Design & Care",
    blurb: "Ideas and guidance for plant selection, arrangement, establishment and ongoing care.",
    image: "/images/blog-theme-flower-beds.jpg",
    imageAlt: "Red and white flowers in a planted bed",
    icon: "flower",
  },
  {
    slug: "indoor-plants",
    name: "Indoor Plants",
    blurb: "Choosing, arranging and caring for plants in indoor environments.",
    image: "/images/blog-theme-indoor.jpg",
    imageAlt: "Potted foliage plants by a bright window",
    icon: "house",
  },
  {
    slug: "patio-balcony-plants",
    name: "Patio & Balcony Plants",
    blurb: "Plants and containers for balconies, patios and other outdoor living spaces.",
    image: "/images/blog-theme-patio.jpg",
    imageAlt: "Flowering container plants on a patio beside an outdoor sofa",
    icon: "plants",
  },
  {
    slug: "growing-media-plant-health",
    name: "Growing Media & Plant Health",
    blurb: "Explore growing mixes, root environments, drainage and plant establishment.",
    image: "/images/blog-theme-growing-media.jpg",
    imageAlt: "A seedling emerging from dark growing media",
    icon: "sprout",
  },
  {
    slug: "recycling-green-waste",
    name: "Recycling Green Waste",
    blurb: "Follow our work recovering and reusing organic materials such as madafu and other green waste.",
    image: "/images/blog-theme-recycling.jpg",
    imageAlt: "A heap of green coconut husks",
    icon: "recycle",
  },
  {
    slug: "sustainable-urban-greening",
    name: "Sustainable Urban Greening",
    blurb: "Reflections on urbanization, biodiversity and creating space for nature in our communities.",
    image: "/images/blog-theme-urban-greening.jpg",
    imageAlt: "Trees and planting in front of high-rise apartment blocks",
    icon: "building",
  },
];

export function getTheme(slug: string | undefined): Theme | undefined {
  return THEMES.find((t) => t.slug === slug);
}
