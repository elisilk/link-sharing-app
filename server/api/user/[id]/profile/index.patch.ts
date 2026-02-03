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

  const { firstName, lastName, email, picture } = await readBody(event);
  if (!firstName || !lastName) {
    throw createError({
      status: 400,
      statusText: "Missing required fields!",
    });
  }

  try {
    const result = await useDb().update(schema.profile).set({ firstName, lastName, email, picture }).where(eq(schema.profile.userId, userId));

    if (result.rowsAffected > 0) {
      return {
        success: true,
        message: `User ID ${userId} updated (${result.rowsAffected} row(s) affected)`,
      };
    }
    else {
      return {
        success: false,
        message: `User ID ${userId} not found or no changes made.`,
      };
    }
  }
  catch (error: unknown) {
    console.error("(Server) Error updating profile:", error);
    return { success: false, message: "Failed to update profile." };
  }
});
