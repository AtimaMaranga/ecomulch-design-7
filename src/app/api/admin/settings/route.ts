import { revalidatePath } from "next/cache";
import { guardApi } from "@/lib/admin-session";
import { saveSettings } from "@/lib/content/store";
import type { LinkValue, SiteSettings } from "@/lib/content/types";

export async function PUT(req: Request) {
  const denied = await guardApi();
  if (denied) return denied;

  let body: Partial<SiteSettings>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const nav: LinkValue[] = Array.isArray(body.nav)
    ? body.nav
        .filter((n) => n && typeof n.label === "string")
        .map((n) => ({ label: n.label, href: n.href ?? "/" }))
    : [];

  const settings: SiteSettings = {
    whatsappNumber: String(body.whatsappNumber ?? "").trim(),
    whatsappMessage: String(body.whatsappMessage ?? ""),
    whatsappCatalogueUrl: String(body.whatsappCatalogueUrl ?? ""),
    flowerBedsYoutubeUrl: String(body.flowerBedsYoutubeUrl ?? ""),
    nav,
    footerTagline: String(body.footerTagline ?? ""),
  };

  try {
    await saveSettings(settings);
  } catch (err) {
    console.error("[admin] saveSettings failed", err);
    return Response.json({ error: "Could not save settings." }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
