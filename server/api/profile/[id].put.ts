// import type { SelectProfile } from "~~/server/db/schema/index";

import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const routerParamId = getRouterParam(event, "id");

  if (!routerParamId) {
    throw createError({
      statusCode: 400,
      message: "ID is required",
    });
  }

  const userId: number = Number(routerParamId);

  const { firstName, lastName, email } = await readBody(event);
  if (!firstName || !lastName || !email) {
    throw createError({
      message: "Missing fields!",
      statusCode: 400,
    });
  }

  try {
    const result = await useDb().update(schema.profile).set({ firstName, lastName, email }).where(eq(schema.profile.userId, userId));

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
