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

  const storage = useStorage();
  const itemKey = `${STORAGE_BASE}:${path}`;

  // const itemExists = await storage.hasItem(itemKey);
  // const itemMeta = await storage.getMeta(itemKey);

  // console.log("(server) key:", itemKey);
  // console.log("(server) exists:", itemExists);
  // console.log("(server) meta:", itemMeta);
  // console.log("(server) meta keys:", Object.keys(itemMeta));

  const imageBuffer = await storage.getItemRaw(itemKey);

  // setHeader(event, "Content-Type", itemMeta.contentType);
  // setHeader(event, "Content-Length", itemMeta.size);

  // console.log("(server) item data:", imageBuffer);

  if (!imageBuffer) {
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found",
    });
  }

  return imageBuffer;
  // return send(event, imageBuffer);
});
