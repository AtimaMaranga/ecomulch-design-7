# EcoMulch website — Content Manager (Admin)

A built-in admin lets the client edit the website's content — text, images,
links, and the order of sections — from a friendly dashboard at **`/admin`**.
Changes go live the moment they're saved.

---

## For the client — how to use it

1. Go to **`/admin`** and sign in with the admin password.
2. The dashboard lists **every page on the site**, grouped like the website
   menu, with the date each was last edited. It also shows a **launch
   checklist** of contact details and links that still need real values.
3. There are two kinds of page:
   - **Flexible pages** (the homepage and the main section pages) are built
     from sections you can add, remove and reorder — see below.
   - **Fixed-design pages** (all the sub-pages) keep their designed layout,
     but every text, photo, link, icon and list item (cards, steps, panels,
     paragraphs) is editable. Each part of the page is a collapsible box with a
     **Restore original** button if you want to undo your changes to it. In
     longer text, write `**words**` for **bold** and `[words](/page)` for a
     link. Links can also use `{whatsapp}`, `{catalogue}`, `{youtube}` or
     `{flowerBedsVideo}` to follow the values in Site settings.
4. On a flexible page, every section can be:
   - edit the text in the boxes,
   - **Upload a new photo** (or paste an image path),
   - pick an **icon** from the dropdown,
   - **move** a section up/down, **duplicate** it, or **delete** it (the arrows / icons top-right of each section),
   - **Add a section** with the dashed button at the bottom, then choose a type.
5. Click **Save changes** (bottom bar). You'll see "Saved — your changes are live."
6. **Blog articles** — write, preview, publish and unpublish articles without
   developer help. Each article has a title, web address, summary, featured
   image, one primary theme (plus up to two more), optional series, the article
   body (paragraphs, headings, photos with captions, highlighted statements),
   the two sidebar boxes and its SEO title/description. Drafts can be previewed
   while signed in; **Publish** checks the article is complete first
   (Publishing & Discovery Guide v1.1). The articles screen also shows how many
   articles each theme has — themes with none stay hidden on the Blog page.
7. **Site settings** controls things shared by every page: the navigation
   menu, the WhatsApp number and message, the catalogue/video links, and the
   footer (description, location, phone, email, social links). Phone, email
   and social icons only appear on the site once they're filled in.

Nothing breaks the design — sections always render in the site's styling.

---

## Two modes

The admin automatically uses one of two storage back ends:

| Mode | When | Where content is stored |
|------|------|-------------------------|
| **Local files** (preview) | Supabase env vars are **not** set | JSON under `content/`, images under `public/images/uploads/` |
| **Live database** | Supabase env vars **are** set | Supabase Postgres + Storage |

Local-file mode is perfect for development and trying things out. The live
database mode is what you deploy so the client can edit the real site from
anywhere and have changes persist.

---

## Going live (one-time Supabase setup)

1. **Create a Supabase project** at https://supabase.com (free tier is fine).
2. In the project's **SQL editor**, paste and run
   [`supabase/migrations/0001_cms.sql`](supabase/migrations/0001_cms.sql).
   This creates the `pages` and `site_settings` tables and the public `media`
   image bucket.
3. In **Project Settings → API**, copy:
   - the **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - the **service_role** key (under "Project API keys") → `SUPABASE_SERVICE_ROLE_KEY`
     (keep this secret — it's server-only and never shipped to the browser).
4. Set the environment variables (see `.env.example`):
   - locally in `.env.local`
   - in **Vercel → Project → Settings → Environment Variables** for production
   ```
   ADMIN_PASSWORD=<the client's password>
   ADMIN_SESSION_SECRET=<openssl rand -hex 32>
   NEXT_PUBLIC_SUPABASE_URL=<project url>
   SUPABASE_SERVICE_ROLE_KEY=<service role key>
   ```
5. Redeploy. The admin now reads and writes the Supabase database, and the
   first time a page is opened and saved it is written there (until then the
   built-in seed content shows, so the site is never blank).

---

## How it fits together (for developers)

- **Content model** — `src/lib/content/`
  - `types.ts` — `Page`, `Block`, `SiteSettings`, and the field-schema types.
  - `blocks-schema.ts` — the registry of section types: each one's editable
    fields (drives the admin forms) and its default content. **Add a section
    type here and in `components/blocks/block-renderer.tsx`.**
  - `seed.ts` — starting content, mirrors what the pages originally hardcoded.
  - `repository.ts` / `file-repo.ts` / `supabase-repo.ts` — the storage
    abstraction and its two back ends.
  - `store.ts` — `getPage` / `getSettings` with seed fallback, used by pages.
- **Rendering** — `src/components/blocks/block-renderer.tsx` turns a page's
  blocks into the same markup the site always used.
- **Admin UI** — `src/app/(admin)/…` (login + protected CMS) and
  `src/components/admin/…` (the editor, generic field inputs, settings editor).
- **APIs** — `src/app/api/admin/…` (login, logout, save page, save settings,
  image upload). Every write is guarded by the session cookie.
- **Auth** — `src/lib/auth.ts` (password + signed cookie) and
  `src/lib/admin-session.ts` (server-side enforcement).

- **Site map** — `src/lib/content/site-map.ts` lists every editable page, its
  group and kind (`blocks` or `content`). Content-page slugs are the URL with
  `/` replaced by `--`.
- **Fixed-design pages** — each page's default content lives in
  `src/lib/content/defaults/*.ts` (registered in `defaults/index.ts`). The page
  calls `getPageContent(slug, DEFAULTS)`, which layers saved edits over the
  defaults (`merge.ts`): missing keys fall back to defaults, lists come from the
  saved copy. Keys starting with `_` are layout settings (badge colours,
  aspect ratios) — hidden from editors and never taken from saved content;
  `_label` names a section in the editor. The admin form is generated from the
  data's shape (`components/admin/content-editor.tsx`). Inline formatting is
  rendered by `lib/content/rich.tsx`.
- **Blog** — themes in `src/lib/blog/themes.ts`; articles, queries and the
  publish checks in `src/lib/blog/articles.ts`; storage in `lib/blog/store.ts`
  (all articles are one record, `blog-articles`, in the same `pages` table — no
  extra migration needed). APIs: `api/admin/articles/[slug]` (PUT/DELETE).

### Current coverage

Everything: all 22 pages, the blog articles, and site-wide settings are
editable in the admin.
