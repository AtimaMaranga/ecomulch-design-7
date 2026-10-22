import { revalidatePath } from "next/cache";
import { guardApi } from "@/lib/admin-session";
import { savePage, listPages } from "@/lib/content/store";
import type { Block, Page } from "@/lib/content/types";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const denied = await guardApi();
  if (denied) return denied;

  const { slug } = await params;

  let body: Partial<Page>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const meta = listPages().find((p) => p.slug === slug);
  if (!meta) {
    return Response.json({ error: "Unknown page" }, { status: 404 });
  }

  let page: Page;
  if (meta.kind === "content") {
    const c = body.content;
    if (!c || typeof c !== "object" || Array.isArray(c)) {
      return Response.json({ error: "Missing content" }, { status: 400 });
    }
    page = { slug, title: meta.title, path: meta.path, blocks: [], content: c };
  } else {
    if (!Array.isArray(body.blocks)) {
      return Response.json({ error: "Missing blocks" }, { status: 400 });
    }
    page = { slug, title: meta.title, path: meta.path, blocks: body.blocks as Block[] };
  }

  try {
    await savePage(page);
  } catch (err) {
    console.error("[admin] savePage failed", err);
    return Response.json(
      { error: "Could not save. The storage backend rejected the write." },
      { status: 500 },
    );
  }

  // Make the change show up immediately on the public site.
  revalidatePath(page.path);
  revalidatePath("/", "layout");

  return Response.json({ ok: true });
}
