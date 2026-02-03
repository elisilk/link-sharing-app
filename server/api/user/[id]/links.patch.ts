import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  // TESTING: block for an amount of time to test pending state
  // await sleep(4000);

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

  const linksToUpdate: {
    id: number;
    platform: string;
    url: string;
    order: number;
  }[] = await readBody(event);

  if (!linksToUpdate || !Array.isArray(linksToUpdate)) {
    // return { status: 'error', message: 'Invalid input' };
    throw createError({
      status: 400,
      statusText: "Invalid input!",
    });
  }

  try {
    const results = await useDb().transaction(async (tx) => {
      const updatedItems = [];
      for (const update of linksToUpdate) {
        const [updatedItem] = await tx
          .update(schema.profileLink)
          .set({
            platform: update.platform,
            url: update.url,
            order: update.order,
          })
          .where(eq(schema.profileLink.id, update.id))
          .returning(); // Get the updated row back

        updatedItems.push(updatedItem);
      }
      return updatedItems;
    });

    if (results) {
      return {
        success: true,
        message: `Links updated successfully`,
      };
    }
    else {
      return {
        success: false,
        message: `Link updates failed.`,
      };
    }
  }
  catch (error: unknown) {
    console.error("(Server) Error updating links:", error);
    return { success: false, message: "Failed to update links." };
  }
});
