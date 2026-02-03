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

  const { currentPassword, newPassword } = await readBody(event);

  if (!currentPassword || !newPassword) {
    throw createError({
      status: 400,
      statusText: "Missing required fields.",
    });
  }

  // check that current password is valid
  const existingUser = await useDb().query.user.findFirst({
    where: eq(schema.user.id, userId),
  });

  if (!existingUser) {
    throw createError({
      status: 401,
      statusText: "Invalid user.",
    });
  }

  const isValid = await verifyPassword(existingUser.password, currentPassword);

  if (!isValid) {
    throw createError({
      status: 401,
      statusText: "Invalid current password. Please try again.",
    });
  }

  // update to the new password
  try {
    const result = await useDb().update(schema.user).set({ password: await hashPassword(newPassword) }).where(eq(schema.user.id, userId)).returning();

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
