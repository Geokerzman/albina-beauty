import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getCms, isCmsConfigured } from "@/cms/payload";
import { mediaDirectory } from "@/cms/payload.config";
import { isMediaName } from "@/cms/fields";

export async function GET(_: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!isCmsConfigured() || !isMediaName(filename)) return new Response(null, { status: 404 });

  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "site-media",
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  });
  const image = docs[0];
  if (!image || typeof image.mimeType !== "string") return new Response(null, { status: 404 });

  try {
    const bytes = await readFile(join(mediaDirectory, filename));
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": image.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT")
      return new Response(null, { status: 404 });
    throw error;
  }
}
