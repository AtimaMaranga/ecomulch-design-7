/**
 * Storage abstraction. The site and admin only ever talk to a `ContentRepository`;
 * the concrete backend is chosen once, here, from the environment:
 *
 *   - Supabase (Postgres + Storage) when SUPABASE env vars are present — the
 *     live, hosted, database-backed mode.
 *   - Local JSON files under `content/` otherwise — used in development so the
 *     whole CMS runs and is testable with no external services.
 *
 * Both back ends implement the same interface, so nothing else in the app needs
 * to know which is active.
 */
import type { Page, SiteSettings } from "./types";
import { FileRepository } from "./file-repo";
import { SupabaseRepository } from "./supabase-repo";

export type SavedImage = { url: string };

export interface ContentRepository {
  readonly kind: "file" | "supabase";
  getPage(slug: string): Promise<Page | null>;
  savePage(page: Page): Promise<void>;
  getSettings(): Promise<SiteSettings | null>;
  saveSettings(settings: SiteSettings): Promise<void>;
  /** Persist an uploaded image and return its public URL. */
  saveImage(filename: string, bytes: Buffer, contentType: string): Promise<SavedImage>;
}

let cached: ContentRepository | null = null;

export function getRepository(): ContentRepository {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const repo: ContentRepository =
    url && serviceKey
      ? new SupabaseRepository(url, serviceKey)
      : new FileRepository();
  cached = repo;
  return repo;
}

/** True when the production (database-backed) backend is active. */
export function isLiveBackend(): boolean {
  return getRepository().kind === "supabase";
}
