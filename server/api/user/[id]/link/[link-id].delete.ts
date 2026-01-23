import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const routerParamId = getRouterParam(event, "link-id");

  if (!routerParamId) {
    throw createError({
      statusCode: 400,
      message: "Link ID is required",
    });
  }

  const linkId: number = Number(routerParamId);

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
