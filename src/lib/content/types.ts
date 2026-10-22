/**
 * Content model for the EcoMulch CMS.
 *
 * Every page is an ordered list of typed "blocks". A block has a stable `id`,
 * a `type` (which maps to a React renderer and to an editor form), and a `data`
 * object whose shape is described — for the admin UI — by the field schema in
 * `blocks-schema.ts`. Keeping block data as a loose record (rather than a rigid
 * union) is what lets the client add / remove / reorder sections freely while
 * the same generic editor keeps working as new block types are added.
 */

export type BlockData = Record<string, unknown>;

export type Block = {
  id: string;
  type: string;
  data: BlockData;
};

export type Page = {
  /** URL path without a leading slash; "" is the home page. */
  slug: string;
  /** Human label shown in the admin page list. */
  title: string;
  /** Shown in the admin list to orient non-technical editors. */
  path: string;
  blocks: Block[];
  /** Field content for fixed-layout pages (see site-map.ts "content" kind). */
  content?: Record<string, unknown>;
  /** ISO timestamp of the last save, set by the repository. */
  updatedAt?: string;
};

/** A single link used throughout the site (buttons, nav, cards). */
export type LinkValue = {
  label: string;
  href: string;
};

/** Global, cross-page settings editable in one place. */
export type SiteSettings = {
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappCatalogueUrl: string;
  flowerBedsYoutubeUrl: string;
  nav: LinkValue[];
  footerTagline: string;
  /** Footer "Get in Touch" — leave blank to hide a line (never publish example details). */
  location?: string;
  phone?: string;
  email?: string;
  /** Footer social icons — an icon only appears once its link is filled in. */
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  updatedAt?: string;
};

/* ------------------------------------------------------------------ */
/* Editor field schema — drives the generic admin forms.              */
/* ------------------------------------------------------------------ */

export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "image"
  | "icon"
  | "select"
  | "list";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  /** Helper text under the field in the admin. */
  help?: string;
  /** For `select`. */
  options?: { value: string; label: string }[];
  /** For `list` — the schema of each item, and labels for the add button. */
  itemFields?: FieldDef[];
  itemLabel?: string;
  /** For `list` — cap how many items can be added. */
  maxItems?: number;
};

export type BlockSchema = {
  type: string;
  /** Friendly name in the "add section" palette. */
  label: string;
  /** One line describing the section, shown in the palette. */
  description: string;
  fields: FieldDef[];
  /** Produces the default data for a freshly-added block of this type. */
  makeDefault: () => BlockData;
  /** Which pages may use this block in the palette; omit = all pages. */
  scope?: "home" | "section" | "any";
};
