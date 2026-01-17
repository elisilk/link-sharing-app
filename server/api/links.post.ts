export default defineEventHandler(async (event) => {
  const linksToAdd: {
    userId: number;
    profileId: number;
    platform: string;
    url: string;
    order: number;
  }[] = await readBody(event);

  if (!linksToAdd || !Array.isArray(linksToAdd)) {
    // return { status: 'error', message: 'Invalid input' };
    throw createError({
      message: "Invalid input!",
      statusCode: 400,
    });
  }

  try {
    const result = await useDb().insert(schema.profileLink).values(linksToAdd).returning();

    if (result) {
      // return { success: true, insertedCount: result.length, data: result };
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
