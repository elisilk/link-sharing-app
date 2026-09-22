import { eq } from "drizzle-orm";
// import { LibsqlError } from "@libsql/client";
// import { DrizzleQueryError } from "drizzle-orm";

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

  const userId = Number(routerParamId);

  if (!Number.isInteger(userId) || userId <= 0) {
    throw createError({
      status: 400,
      statusText: "Invalid user ID.",
    });
  }

  if (loggedInUser.id !== userId) {
    throw createError({
      status: 403,
      statusText: "You are not authorized to update this profile.",
    });
  }

  const { firstName, lastName, email, picture } = await readBody(event);

  if (!firstName || !lastName) {
    throw createError({
      status: 400,
      statusText: "First name and last name are required.",
    });
  }

  try {
    const result = await useDb()
      .update(schema.profile)
      .set({ firstName, lastName, email, picture })
      .where(eq(schema.profile.userId, userId));

    if (result.rowsAffected === 0) {
      throw createError({
        status: 404,
        statusText: "Profile not found.",
      });
    }

    return {
      success: true,
    };
  }
  catch (error: any) {
    const errorMessage = error?.message || "";
    const causeMessage = error?.cause?.message || "";

    const errorDuplicateEmail = "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: profile.email";
    const isDuplicateEmail
      = errorMessage.includes(errorDuplicateEmail)
        || causeMessage.includes(errorDuplicateEmail);

    if (isDuplicateEmail) {
      console.error("(Server) Error updating profile. Profile email already in use.");
      throw createError({
        status: 409,
        statusText: "Profile email is already in use.",
        data: {
          code: "EMAIL_ALREADY_IN_USE",
        },
      });
    }

    console.error("(Server) Error updating profile. Uknown error. More details:", error);
    throw createError({
      status: 500,
      statusText: "Failed to update profile.",
    });
  }
});
