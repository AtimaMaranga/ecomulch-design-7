import { guardApi } from "@/lib/admin-session";
import { getRepository } from "@/lib/content/repository";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(req: Request) {
  const denied = await guardApi();
  if (denied) return denied;

  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    if (f instanceof File) file = f;
  } catch {
    return Response.json({ error: "Invalid upload" }, { status: 400 });
  }

  if (!file) return Response.json({ error: "No file provided" }, { status: 400 });
  if (!ALLOWED.includes(file.type)) {
    return Response.json(
      { error: "Please upload a JPG, PNG, WebP, GIF or AVIF image." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "Image is too large (max 8 MB)." },
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  try {
    const { url } = await getRepository().saveImage(
      file.name || "upload",
      bytes,
      file.type,
    );
    return Response.json({ url });
  } catch (err) {
    console.error("[admin] image upload failed", err);
    return Response.json({ error: "Upload failed on the server." }, { status: 500 });
  }
}
