// const STORAGE_URL = "https://dmcdkdurs83kjmfp.public.blob.vercel-storage.com";
const STORAGE_BASE = "uploads";

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path");

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Path is required",
    });
  }

  // const imageUrl = `${STORAGE_URL}/${STORAGE_BASE}/${}`;

  // const storage = useStorage("uploads");
  // const storage = useStorage(STORAGE_BASE);
  // const imageBuffer = await storage.getItemRaw(path);

  const imageBuffer = await useStorage().getItemRaw(`${STORAGE_BASE}:${path}`);

  if (!imageBuffer) {
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found",
    });
  }

  return imageBuffer;
});
