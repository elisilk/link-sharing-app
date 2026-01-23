export default defineEventHandler(async (event) => {
  const storage = useStorage("uploads");
  const path = getRouterParam(event, "path");
  console.log("(server) image upload: ", path);

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Path is required",
    });
  }

  const imageBuffer = await storage.getItemRaw(path);

  if (!imageBuffer) {
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found",
    });
  }

  return imageBuffer;
});
