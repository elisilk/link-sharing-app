export default defineEventHandler(async (event) => {
  const routerParamId = getRouterParam(event, "id");

  if (!routerParamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  }

  const { filename } = await readBody(event);

  if (!filename) {
    throw createError({
      statusCode: 400,
      statusMessage: "Filename is required",
    });
  }

  const storage = useStorage("uploads");

  try {
    await storage.removeItem(filename, { removeMeta: true });
    return {
      status: "success",
      filename,
    };
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Error deleting file",
    });
  }
});
