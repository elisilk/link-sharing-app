import { and, eq } from "drizzle-orm";

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

  const { currentEmail, newEmail } = await readBody(event);

  if (!currentEmail || !newEmail) {
    throw createError({
      status: 400,
      statusText: "Missing required fields.",
    });
  }

  // if no user with current email exists, then error (invalid current credentials, no account with that email exists)

  const existingUserCurrentEmail = await useDb().query.user.findFirst({
    where: and(
      eq(schema.user.id, userId),
      eq(schema.user.email, currentEmail),
    ),
  });

  if (!existingUserCurrentEmail) {
    throw createError({
      status: 401,
      statusText: "Invalid current email.",
    });
  }

  // if a user with the new email does exist, then error (invalid new credentials, new email is already taken)

  const existingUserNewEmail = await useDb().query.user.findFirst({
    where: eq(schema.user.email, newEmail),
  });

  if (existingUserNewEmail) {
    throw createError({
      status: 401,
      statusText: "Invalid new email. Account with that email already exists.",
    });
  }

  // if current + new email are both good, then replace current email with the new one ...
  try {
    const result = await useDb().update(schema.user).set({ email: newEmail }).where(eq(schema.user.id, userId)).returning();

    const updatedUser = result.at(0);

    if (!updatedUser) {
      throw createError({
        status: 500,
        statusText: "Failed to update user.",
      });
    }

    const { password: stash, ...updatedUserWithoutPassword } = updatedUser;

    await replaceUserSession(event, {
      user: updatedUserWithoutPassword,
    });

    return updatedUserWithoutPassword;
  }
  catch (error: unknown) {
    console.error("(Server) Error updating user:", error);
    return { success: false, message: "Failed to update user." };
  }
});
