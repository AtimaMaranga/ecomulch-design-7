/**
 * The block registry: one entry per section type. Each entry describes the
 * editable fields (so the admin can render a form automatically) and supplies
 * the default data for a newly-added block. Add a new section type here and in
 * `components/blocks/block-renderer.tsx`, and it becomes available everywhere:
 * in the page, in the editor, and in the "add section" palette.
 */
import type { BlockSchema, FieldDef } from "./types";

const ICON_FIELD: FieldDef = {
  key: "icon",
  label: "Icon",
  type: "icon",
  help: "Pick a line icon to sit beside the label.",
};

const CTA_ITEM_FIELDS: FieldDef[] = [
  { key: "label", label: "Button text", type: "text" },
  { key: "href", label: "Links to", type: "url", help: "A page path like /who-we-are or a full https:// link." },
  {
    key: "variant",
    label: "Style",
    type: "select",
    options: [
      { value: "solid", label: "Solid (filled)" },
      { value: "outline", label: "Outline" },
      { value: "ghost", label: "Text only" },
    ],
  },
];

export const BLOCK_SCHEMAS: Record<string, BlockSchema> = {
  hero: {
    type: "hero",
    label: "Hero banner",
    description: "Full-width photo banner with a headline and call-to-action buttons.",
    fields: [
      { key: "image", label: "Background photo", type: "image" },
      { key: "imageAlt", label: "Photo description (for accessibility)", type: "text" },
      ICON_FIELD,
      { key: "eyebrow", label: "Small label above heading", type: "text" },
      { key: "heading", label: "Headline", type: "textarea" },
      { key: "body", label: "Intro paragraph", type: "textarea" },
      { key: "primaryLabel", label: "Primary button text", type: "text" },
      { key: "primaryHref", label: "Primary button link", type: "url" },
      {
        key: "showWhatsapp",
        label: "Show WhatsApp button",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      { key: "whatsappLabel", label: "WhatsApp button text", type: "text" },
    ],
    makeDefault: () => ({
      image: "/images/home-hero.jpg",
      imageAlt: "Green landscape",
      icon: "leaf",
      eyebrow: "Sustainable Urban Greening",
      heading: "A short, powerful headline goes here.",
      body: "One or two sentences introducing what this page is about.",
      primaryLabel: "Learn more",
      primaryHref: "/who-we-are",
      showWhatsapp: "yes",
      whatsappLabel: "Chat with us on WhatsApp",
    }),
  },

  "mission-strip": {
    type: "mission-strip",
    label: "Mission strip",
    description: "A short label beside one larger statement sentence.",
    fields: [
      ICON_FIELD,
      { key: "eyebrow", label: "Label", type: "text" },
      { key: "body", label: "Statement", type: "textarea" },
    ],
    makeDefault: () => ({
      icon: "sprout",
      eyebrow: "Our Mission",
      body: "A single, memorable statement about what the company stands for.",
    }),
  },

  "services-grid": {
    type: "services-grid",
    label: "Services grid",
    description: "A heading with a row of linked cards, each with an icon.",
    fields: [
      ICON_FIELD,
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "learnMoreLabel", label: "Card link text", type: "text" },
      {
        key: "items",
        label: "Cards",
        type: "list",
        itemLabel: "card",
        maxItems: 6,
        itemFields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "href", label: "Links to", type: "url" },
          { key: "body", label: "Description", type: "textarea" },
        ],
      },
    ],
    makeDefault: () => ({
      icon: "leaf",
      eyebrow: "What We Do",
      heading: "Section heading",
      learnMoreLabel: "Learn more",
      items: [
        { icon: "recycle", title: "First service", href: "/", body: "Describe this service in a sentence or two." },
        { icon: "sprout", title: "Second service", href: "/", body: "Describe this service in a sentence or two." },
        { icon: "building", title: "Third service", href: "/", body: "Describe this service in a sentence or two." },
      ],
    }),
  },

  "split-feature": {
    type: "split-feature",
    label: "Image + text",
    description: "A photo on one side with a heading, paragraph and buttons on the other.",
    fields: [
      { key: "image", label: "Photo", type: "image" },
      { key: "imageAlt", label: "Photo description", type: "text" },
      {
        key: "imageSide",
        label: "Photo position",
        type: "select",
        options: [
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
        ],
      },
      ICON_FIELD,
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "body", label: "Paragraph", type: "textarea" },
      {
        key: "buttons",
        label: "Buttons",
        type: "list",
        itemLabel: "button",
        maxItems: 3,
        itemFields: CTA_ITEM_FIELDS,
      },
    ],
    makeDefault: () => ({
      image: "/images/misc-forest.jpg",
      imageAlt: "Photo",
      imageSide: "left",
      icon: "sprout",
      eyebrow: "Small label",
      heading: "Section heading",
      body: "A paragraph of supporting text.",
      buttons: [{ label: "Learn more", href: "/", variant: "solid" }],
    }),
  },

  "cta-band": {
    type: "cta-band",
    label: "Call-to-action band",
    description: "A full-width green band with a heading and a WhatsApp button.",
    fields: [
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "body", label: "Paragraph", type: "textarea" },
      { key: "whatsappLabel", label: "WhatsApp button text", type: "text" },
    ],
    makeDefault: () => ({
      heading: "Let's work together.",
      body: "Invite the visitor to get in touch.",
      whatsappLabel: "Chat with us on WhatsApp",
    }),
  },

  "prose-section": {
    type: "prose-section",
    label: "Text section",
    description: "A heading with a green rule and paragraphs of body text.",
    fields: [
      ICON_FIELD,
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "heading", label: "Heading", type: "textarea" },
      {
        key: "paragraphs",
        label: "Paragraphs",
        type: "list",
        itemLabel: "paragraph",
        itemFields: [{ key: "text", label: "Text", type: "textarea" }],
      },
    ],
    makeDefault: () => ({
      icon: "leaf",
      eyebrow: "",
      heading: "Section heading",
      paragraphs: [{ text: "A paragraph of body text." }],
    }),
  },

  "team-hero": {
    type: "team-hero",
    label: "Team hero",
    description: "Full-width photo with a centred headline and a scroll link.",
    fields: [
      { key: "image", label: "Background photo", type: "image" },
      { key: "imageAlt", label: "Photo description", type: "text" },
      { key: "heading", label: "Headline", type: "textarea" },
      { key: "ctaLabel", label: "Link text", type: "text" },
      { key: "ctaHref", label: "Link target", type: "url", help: "Use #explore to scroll to the section below." },
    ],
    makeDefault: () => ({
      image: "/images/who-hero.jpg",
      imageAlt: "The EcoMulch team",
      heading: "A short, centred headline.",
      ctaLabel: "Discover our story",
      ctaHref: "#explore",
    }),
  },

  "pillar-cards": {
    type: "pillar-cards",
    label: "Pillar cards",
    description: "A row of horizontal photo-and-text cards with an outlined button.",
    fields: [
      {
        key: "items",
        label: "Cards",
        type: "list",
        itemLabel: "card",
        maxItems: 4,
        itemFields: [
          { key: "image", label: "Photo", type: "image" },
          { key: "imageAlt", label: "Photo description", type: "text" },
          { key: "icon", label: "Icon", type: "icon" },
          { key: "eyebrow", label: "Small label", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Description", type: "textarea" },
          { key: "cta", label: "Button text", type: "text" },
          { key: "href", label: "Button link", type: "url" },
        ],
      },
    ],
    makeDefault: () => ({
      items: [
        {
          image: "/images/card-origin.jpg",
          imageAlt: "Photo",
          icon: "leaf-outline",
          eyebrow: "Our Origin",
          title: "How We Started",
          body: "Describe this pillar in a few sentences.",
          cta: "Read our story",
          href: "/",
        },
      ],
    }),
  },

  "sub-hero": {
    type: "sub-hero",
    label: "Section hero (split)",
    description: "Dark hero with the photo on the right and copy on the left.",
    fields: [
      { key: "image", label: "Photo", type: "image" },
      { key: "imageAlt", label: "Photo description", type: "text" },
      { key: "icon", label: "Label icon", type: "icon" },
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "title", label: "Headline", type: "textarea" },
      {
        key: "titleAccent",
        label: "Headline (green part)",
        type: "text",
        help: "Optional. Shown in green at the end of the headline.",
      },
      { key: "subtitle", label: "Lead sentence", type: "textarea" },
      { key: "body", label: "Paragraph", type: "textarea" },
    ],
    makeDefault: () => ({
      image: "/images/rgw-hero.jpg",
      imageAlt: "Photo",
      icon: "recycle",
      eyebrow: "Section label",
      title: "A bold headline",
      titleAccent: "with a green ending.",
      subtitle: "A lead sentence that sets up the page.",
      body: "A supporting paragraph.",
    }),
  },

  "explore-section": {
    type: "explore-section",
    label: "Explore cards",
    description: "A heading with a lead line and two large feature cards.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "lede", label: "Lead line", type: "textarea" },
      {
        key: "items",
        label: "Cards",
        type: "list",
        itemLabel: "card",
        maxItems: 4,
        itemFields: [
          { key: "image", label: "Photo", type: "image" },
          { key: "imageAlt", label: "Photo description", type: "text" },
          { key: "icon", label: "Icon", type: "icon" },
          {
            key: "badgeTone",
            label: "Icon colour",
            type: "select",
            options: [
              { value: "brand", label: "Green" },
              { value: "rust", label: "Terracotta" },
            ],
          },
          {
            key: "accent",
            label: "Accent colour",
            type: "select",
            options: [
              { value: "brand", label: "Green" },
              { value: "rust", label: "Terracotta" },
            ],
          },
          { key: "title", label: "Title", type: "text" },
          { key: "kicker", label: "Kicker (bold line)", type: "textarea" },
          { key: "body", label: "Description", type: "textarea" },
          {
            key: "chips",
            label: "Tags (optional)",
            type: "list",
            itemLabel: "tag",
            itemFields: [
              { key: "label", label: "Tag", type: "text" },
              {
                key: "accent",
                label: "Colour",
                type: "select",
                options: [
                  { value: "brand", label: "Green" },
                  { value: "rust", label: "Terracotta" },
                ],
              },
            ],
          },
          { key: "cta", label: "Button text", type: "text" },
          { key: "href", label: "Button link", type: "url" },
        ],
      },
    ],
    makeDefault: () => ({
      heading: "Explore, Learn, Discover.",
      lede: "A short line introducing the two cards below.",
      items: [
        {
          image: "/images/rgw-card-challenge.jpg",
          imageAlt: "Photo",
          icon: "sprout-trio",
          badgeTone: "rust",
          accent: "rust",
          title: "First card",
          kicker: "A bold question or statement.",
          body: "Describe where this card leads.",
          chips: [],
          cta: "Learn more",
          href: "/",
        },
        {
          image: "/images/rgw-card-journey.jpg",
          imageAlt: "Photo",
          icon: "waste",
          badgeTone: "brand",
          accent: "brand",
          title: "Second card",
          kicker: "A bold question or statement.",
          body: "Describe where this card leads.",
          chips: [],
          cta: "Learn more",
          href: "/",
        },
      ],
    }),
  },

  "values-strip": {
    type: "values-strip",
    label: "Values strip",
    description: "The People · Plants · A Greener Tomorrow closing strip.",
    fields: [],
    makeDefault: () => ({}),
  },

  "page-hero": {
    type: "page-hero",
    label: "Page hero (photo)",
    description: "A photo banner with a small label, title and subtitle.",
    fields: [
      { key: "image", label: "Background photo", type: "image" },
      { key: "imageAlt", label: "Photo description", type: "text" },
      { key: "icon", label: "Label icon", type: "icon" },
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ],
    makeDefault: () => ({
      image: "/images/misc-forest.jpg",
      imageAlt: "Photo",
      icon: "leaf",
      eyebrow: "Label",
      title: "Page title",
      subtitle: "A sentence introducing the page.",
    }),
  },

  breadcrumb: {
    type: "breadcrumb",
    label: "Breadcrumb trail",
    description: "The small 'Home › Page' trail under a hero.",
    fields: [
      {
        key: "items",
        label: "Trail",
        type: "list",
        itemLabel: "crumb",
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "Link (leave blank for current page)", type: "url" },
        ],
      },
    ],
    makeDefault: () => ({
      items: [
        { label: "Home", href: "/" },
        { label: "This page", href: "" },
      ],
    }),
  },

  "intro-section": {
    type: "intro-section",
    label: "Intro text",
    description: "A lead sentence followed by paragraphs, with a contact box.",
    fields: [
      { key: "lead", label: "Lead sentence", type: "textarea" },
      {
        key: "paragraphs",
        label: "Paragraphs",
        type: "list",
        itemLabel: "paragraph",
        itemFields: [{ key: "text", label: "Text", type: "textarea" }],
      },
    ],
    makeDefault: () => ({
      lead: "A larger opening sentence.",
      paragraphs: [{ text: "A paragraph of body text." }],
    }),
  },
  "fade-hero": {
    type: "fade-hero",
    label: "Hero (photo fade)",
    description: "Large two-tone title on a pale ground with the photo fading in from the right.",
    fields: [
      {
        key: "tone",
        label: "Style",
        type: "select",
        options: [
          { value: "light", label: "Light (pale green)" },
          { value: "dark", label: "Dark" },
        ],
      },
      {
        key: "layout",
        label: "Photo",
        type: "select",
        options: [
          { value: "split", label: "On the right, fading in" },
          { value: "cover", label: "Behind the whole hero" },
        ],
      },
      { key: "image", label: "Photo", type: "image" },
      { key: "imageAlt", label: "Photo description", type: "text" },
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "title", label: "Title (navy part)", type: "textarea" },
      { key: "titleAccent", label: "Title (green part)", type: "textarea" },
      {
        key: "accentBreak",
        label: "Green part starts",
        type: "select",
        options: [
          { value: "inline", label: "On the same line" },
          { value: "newline", label: "On a new line" },
        ],
      },
      { key: "titleEnd", label: "Title (navy line after the green part, optional)", type: "text" },
      { key: "subtitle", label: "Bold line under the title", type: "textarea" },
      {
        key: "paragraphs",
        label: "Paragraphs",
        type: "list",
        itemLabel: "paragraph",
        itemFields: [{ key: "text", label: "Text", type: "textarea" }],
      },
    ],
    makeDefault: () => ({
      tone: "light",
      layout: "split",
      image: "/images/snbs-hero.jpg",
      imageAlt: "Photo",
      eyebrow: "Label",
      title: "Page title",
      titleAccent: "in green.",
      accentBreak: "newline",
      subtitle: "",
      paragraphs: [{ text: "A paragraph introducing the page." }],
    }),
  },

  "split-cta": {
    type: "split-cta",
    label: "Text + photo call-out",
    description: "Small label, two-tone heading, a paragraph and one button, with a photo on the right.",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "title", label: "Heading (navy part)", type: "textarea" },
      { key: "titleAccent", label: "Heading (green part)", type: "textarea" },
      { key: "body", label: "Paragraph", type: "textarea" },
      { key: "buttonLabel", label: "Button text", type: "text" },
      { key: "buttonHref", label: "Button link", type: "url" },
      {
        key: "buttonAccent",
        label: "Button colour",
        type: "select",
        options: [
          { value: "brand", label: "Green" },
          { value: "rust", label: "Terracotta" },
        ],
      },
      { key: "image", label: "Photo", type: "image" },
      { key: "imageAlt", label: "Photo description", type: "text" },
    ],
    makeDefault: () => ({
      eyebrow: "Label",
      title: "A heading",
      titleAccent: "in green.",
      body: "A short paragraph.",
      buttonLabel: "Learn more",
      buttonHref: "/",
      buttonAccent: "brand",
      image: "/images/gus2-challenge.jpg",
      imageAlt: "Photo",
    }),
  },

  "explore-cards": {
    type: "explore-cards",
    label: "Choice cards",
    description: "A two-tone heading and two large photo cards, each leading to a page.",
    fields: [
      { key: "eyebrow", label: "Small label (optional)", type: "text" },
      { key: "heading", label: "Heading (navy part)", type: "text" },
      { key: "headingAccent", label: "Heading (green part)", type: "text" },
      { key: "lede", label: "Lead line", type: "textarea" },
      {
        key: "buttonStyle",
        label: "Button style",
        type: "select",
        options: [
          { value: "solid", label: "Solid, full width" },
          { value: "outline", label: "Outline" },
        ],
      },
      {
        key: "titleSize",
        label: "Card title size",
        type: "select",
        options: [
          { value: "large", label: "Large" },
          { value: "regular", label: "Regular" },
        ],
      },
      {
        key: "surface",
        label: "Card background",
        type: "select",
        options: [
          { value: "white", label: "White" },
          { value: "tinted", label: "Tinted to match the card colour" },
        ],
      },
      {
        key: "items",
        label: "Cards",
        type: "list",
        itemLabel: "card",
        maxItems: 4,
        itemFields: [
          { key: "image", label: "Photo", type: "image" },
          { key: "imageAlt", label: "Photo description", type: "text" },
          { key: "icon", label: "Icon", type: "icon" },
          {
            key: "badge",
            label: "Icon circle",
            type: "select",
            options: [
              { value: "brand", label: "Solid green" },
              { value: "rust", label: "Solid terracotta" },
              { value: "mint", label: "Pale green" },
              { value: "peach", label: "Pale peach" },
            ],
          },
          {
            key: "accent",
            label: "Accent colour",
            type: "select",
            options: [
              { value: "brand", label: "Green" },
              { value: "rust", label: "Terracotta" },
            ],
          },
          { key: "title", label: "Title", type: "textarea" },
          { key: "kicker", label: "Bold line", type: "text" },
          { key: "body", label: "Description", type: "textarea" },
          { key: "cta", label: "Button text", type: "text" },
          { key: "href", label: "Button link", type: "url" },
        ],
      },
    ],
    makeDefault: () => ({
      eyebrow: "",
      heading: "Where would you like to",
      headingAccent: "explore?",
      lede: "A short line introducing the cards.",
      buttonStyle: "solid",
      titleSize: "large",
      surface: "tinted",
      items: [
        {
          image: "/images/snbs-card-challenge.jpg",
          imageAlt: "Photo",
          icon: "soil",
          badge: "rust",
          accent: "rust",
          title: "First card.",
          kicker: "A bold question.",
          body: "Describe where this card leads.",
          cta: "Learn more",
          href: "/",
        },
        {
          image: "/images/snbs-card-response.jpg",
          imageAlt: "Photo",
          icon: "sprout-trio",
          badge: "brand",
          accent: "brand",
          title: "Second card.",
          kicker: "A bold statement.",
          body: "Describe where this card leads.",
          cta: "Learn more",
          href: "/",
        },
      ],
    }),
  },
  "home-landing": {
    type: "home-landing",
    label: "Homepage welcome screen",
    description: "Full-screen photo with the headline and the three section buttons.",
    scope: "home",
    fields: [
      { key: "image", label: "Background photo", type: "image", help: "People and plants together in an urban/residential space works best." },
      { key: "imageAlt", label: "Photo description", type: "text" },
      { key: "title", label: "Headline", type: "textarea" },
      {
        key: "buttons",
        label: "Section buttons",
        type: "list",
        itemLabel: "button",
        maxItems: 3,
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "target", label: "Scrolls to", type: "text", help: "The section anchor, e.g. #about, #our-work, #our-solutions." },
          {
            key: "tone",
            label: "Colour",
            type: "select",
            options: [
              { value: "cream", label: "Cream" },
              { value: "mint", label: "Mint" },
              { value: "blush", label: "Blush" },
            ],
          },
          { key: "icon", label: "Icon (shown on phones)", type: "icon" },
        ],
      },
      { key: "scrollLabel", label: "Scroll prompt", type: "text" },
    ],
    makeDefault: () => ({
      image: "/images/home-hero.jpg",
      imageAlt: "",
      title: "Headline",
      buttons: [{ label: "About EcoMulch", target: "#about", tone: "cream", icon: "people" }],
      scrollLabel: "Scroll down to explore",
    }),
  },

  "home-about": {
    type: "home-about",
    label: "Homepage introduction",
    description: "Text-led introduction over a softened photo, with one button.",
    scope: "home",
    fields: [
      { key: "anchor", label: "Section anchor", type: "text", help: "Used by the welcome-screen buttons, e.g. about." },
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "lead", label: "Opening statement", type: "textarea" },
      {
        key: "paragraphs",
        label: "Paragraphs",
        type: "list",
        itemLabel: "paragraph",
        itemFields: [{ key: "text", label: "Text", type: "textarea" }],
      },
      { key: "buttonLabel", label: "Button text", type: "text" },
      { key: "buttonHref", label: "Button link", type: "url" },
      { key: "image", label: "Photo", type: "image" },
      { key: "imageAlt", label: "Photo description", type: "text" },
    ],
    makeDefault: () => ({
      anchor: "about",
      eyebrow: "About",
      heading: "Heading",
      lead: "Opening statement.",
      paragraphs: [{ text: "A paragraph." }],
      buttonLabel: "Learn more",
      buttonHref: "/who-we-are",
      image: "/images/home-about.jpg",
      imageAlt: "",
    }),
  },

  "home-cards": {
    type: "home-cards",
    label: "Homepage card section",
    description: "Label, heading, introduction and three photo cards (Our Work / Our Solutions).",
    scope: "home",
    fields: [
      { key: "anchor", label: "Section anchor", type: "text", help: "e.g. our-work or our-solutions." },
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "intro", label: "Introduction", type: "textarea" },
      {
        key: "cards",
        label: "Cards",
        type: "list",
        itemLabel: "card",
        maxItems: 3,
        itemFields: [
          { key: "image", label: "Photo", type: "image" },
          { key: "imageAlt", label: "Photo description", type: "text" },
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Description", type: "textarea" },
          { key: "linkLabel", label: "Link text", type: "text" },
          { key: "href", label: "Links to", type: "url" },
        ],
      },
    ],
    makeDefault: () => ({
      anchor: "section",
      eyebrow: "Label",
      heading: "Heading",
      intro: "A short introduction.",
      cards: [],
    }),
  },

  "home-talk": {
    type: "home-talk",
    label: "Let's talk (WhatsApp)",
    description: "Rounded green invitation with a WhatsApp button (uses the number in Site settings).",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "body", label: "Supporting text", type: "textarea" },
      { key: "buttonLabel", label: "Button text", type: "text" },
    ],
    makeDefault: () => ({
      heading: "Let’s talk about your space",
      body: "We’d be happy to learn more about your ideas and explore how EcoMulch might help.",
      buttonLabel: "Start a conversation",
    }),
  },
};

export function getBlockSchema(type: string): BlockSchema | undefined {
  return BLOCK_SCHEMAS[type];
}

/** The palette shown in the editor's "add section" menu. */
export const PALETTE: { type: string; label: string; description: string }[] =
  Object.values(BLOCK_SCHEMAS).map((s) => ({
    type: s.type,
    label: s.label,
    description: s.description,
  }));
