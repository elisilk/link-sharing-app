import { eq } from "drizzle-orm";

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

  const routerParamLinkId = getRouterParam(event, "link-id");

  if (!routerParamLinkId) {
    throw createError({
      status: 400,
      statusText: "Link ID is required",
    });
  }

  const linkId: number = Number(routerParamLinkId);

  const { platform, url, order } = await readBody(event);
  if (!platform || !url || !order) {
    throw createError({
      status: 400,
      statusText: "Missing fields!",
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
