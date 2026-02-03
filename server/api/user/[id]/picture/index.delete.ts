export default defineEventHandler(async (event) => {
  // restrict api only to logged in users
  const { user: loggedInUser } = await requireUserSession(event);

  const routerParamId = getRouterParam(event, "id");

  if (!routerParamId) {
    throw createError({
      status: 400,
      statusText: "User ID is required",
    });
  }

  const userId: number = Number(routerParamId);

  if (loggedInUser.id !== userId) {
    throw createError({
      status: 400,
      statusText: "User/data mismatch.",
    });
  }

  const { filename } = await readBody(event);

  if (!filename) {
    throw createError({
      status: 400,
      statusText: "Filename is required",
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
      status: 500,
      statusText: "Error deleting file",
    });
  }
});
