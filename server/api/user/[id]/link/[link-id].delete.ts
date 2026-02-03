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

  const deletedLink = await useDb().delete(schema.profileLink).where(eq(schema.profileLink.id, linkId)).returning();

  if (deletedLink.length > 0) {
    return {
      success: true,
      message: `Link ID ${linkId} deleted`,
      links: deletedLink,
    };
  }
  else {
    return {
      success: false,
      message: `Link ID ${linkId} not found`,
      links: deletedLink,
    };
  }
});
