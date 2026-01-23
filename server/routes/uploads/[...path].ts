export default defineEventHandler(async (event) => {
  // const storage = useStorage("uploads");
  const storage = useStorage();
  const path = getRouterParam(event, "path");

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Path is required",
    });
  }

  // const imageBuffer = await storage.getItemRaw(path);
  const imageBuffer = await storage.getItemRaw(`uploads:${path}`);

  if (!imageBuffer) {
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found",
    });
  }

  return {
    filename: path,
    image: imageBuffer,
  };
});
