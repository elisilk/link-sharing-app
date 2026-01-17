import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const routerParamId = getRouterParam(event, "id");

  if (!routerParamId) {
    throw createError({
      statusCode: 400,
      message: "ID is required",
    });
  }

  const linkId: number = Number(routerParamId);

  const { platform, url, order } = await readBody(event);
  if (!platform || !url || !order) {
    throw createError({
      message: "Missing fields!",
      statusCode: 400,
    });
  }

  try {
    const result = await useDb().update(schema.profileLink).set({ platform, url, order }).where(eq(schema.profileLink.id, linkId));

    if (result.rowsAffected > 0) {
      return {
        success: true,
        message: `Link ID ${linkId} updated (${result.rowsAffected} row(s) affected)`,
      };
    }
    else {
      return {
        success: false,
        message: `Link ID ${linkId} not found or no changes made.`,
      };
    }
  }
  catch (error: unknown) {
    console.error("(Server) Error updating link:", error);
    return { success: false, message: "Failed to update link." };
  }
});
