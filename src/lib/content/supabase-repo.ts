/**
 * Supabase backend — the live, hosted, database-backed mode.
 *
 * Tables (see supabase/migrations): `pages` (slug PK, jsonb body) and
 * `site_settings` (single row, jsonb body). Images go to the public `media`
 * storage bucket. All access here uses the service-role key, so this module
 * must only ever be imported from server code (API routes / server components),
 * never shipped to the browser.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ContentRepository, SavedImage } from "./repository";
import type { Page, SiteSettings } from "./types";

const BUCKET = "media";
const SETTINGS_ID = "site";

export class SupabaseRepository implements ContentRepository {
  readonly kind = "supabase" as const;
  private db: SupabaseClient;

  constructor(url: string, serviceKey: string) {
    this.db = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async getPage(slug: string): Promise<Page | null> {
    const { data, error } = await this.db
      .from("pages")
      .select("body")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ? (data.body as Page) : null;
  }

  async savePage(page: Page): Promise<void> {
    const body: Page = { ...page, updatedAt: new Date().toISOString() };
    const { error } = await this.db
      .from("pages")
      .upsert({ slug: page.slug, body }, { onConflict: "slug" });
    if (error) throw error;
  }

  async getSettings(): Promise<SiteSettings | null> {
    const { data, error } = await this.db
      .from("site_settings")
      .select("body")
      .eq("id", SETTINGS_ID)
      .maybeSingle();
    if (error) throw error;
    return data ? (data.body as SiteSettings) : null;
  }

  async saveSettings(settings: SiteSettings): Promise<void> {
    const body: SiteSettings = { ...settings, updatedAt: new Date().toISOString() };
    const { error } = await this.db
      .from("site_settings")
      .upsert({ id: SETTINGS_ID, body }, { onConflict: "id" });
    if (error) throw error;
  }

  async saveImage(
    filename: string,
    bytes: Buffer,
    contentType: string,
  ): Promise<SavedImage> {
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `uploads/${Date.now()}-${safe}`;
    const { error } = await this.db.storage
      .from(BUCKET)
      .upload(key, bytes, { contentType, upsert: false });
    if (error) throw error;
    const { data } = this.db.storage.from(BUCKET).getPublicUrl(key);
    return { url: data.publicUrl };
  }
}
