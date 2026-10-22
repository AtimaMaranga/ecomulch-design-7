/**
 * Local-filesystem backend. Content lives in JSON under `content/` and uploaded
 * images in `public/images/uploads/`. Used in development; on a read-only host
 * (e.g. Vercel) writes will fail — that is what the Supabase backend is for.
 */
import { promises as fs } from "fs";
import path from "path";
import type { ContentRepository, SavedImage } from "./repository";
import type { Page, SiteSettings } from "./types";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const SETTINGS_FILE = path.join(CONTENT_DIR, "settings.json");
const UPLOADS_DIR = path.join(ROOT, "public", "images", "uploads");

async function readJson<T>(file: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export class FileRepository implements ContentRepository {
  readonly kind = "file" as const;

  async getPage(slug: string): Promise<Page | null> {
    return readJson<Page>(path.join(PAGES_DIR, `${slug}.json`));
  }

  async savePage(page: Page): Promise<void> {
    const toSave: Page = { ...page, updatedAt: new Date().toISOString() };
    await writeJson(path.join(PAGES_DIR, `${page.slug}.json`), toSave);
  }

  async getSettings(): Promise<SiteSettings | null> {
    return readJson<SiteSettings>(SETTINGS_FILE);
  }

  async saveSettings(settings: SiteSettings): Promise<void> {
    await writeJson(SETTINGS_FILE, {
      ...settings,
      updatedAt: new Date().toISOString(),
    });
  }

  async saveImage(
    filename: string,
    bytes: Buffer,
    _contentType: string,
  ): Promise<SavedImage> {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
    const unique = `${Date.now()}-${safe}`;
    await fs.writeFile(path.join(UPLOADS_DIR, unique), bytes);
    return { url: `/images/uploads/${unique}` };
  }
}
