import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const routerParamId = getRouterParam(event, "id");

  if (!routerParamId) {
    throw createError({
      statusCode: 400,
      message: "User ID is required",
    });
  }

  const userId: number = Number(routerParamId);

  const { currentPassword, newPassword } = await readBody(event);

  if (!currentPassword || !newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields.",
    });
  }

  // check that current password is valid
  const existingUser = await useDb().query.user.findFirst({
    where: eq(schema.user.id, userId),
  });

  if (!existingUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid user.",
    });
  }

  const isValid = await verifyPassword(existingUser.password, currentPassword);

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid current password. Please try again.",
    });
  }

  // update to the new password
  try {
    const result = await useDb().update(schema.user).set({ password: await hashPassword(newPassword) }).where(eq(schema.user.id, userId)).returning();

    const updatedUser = result.at(0);

    if (!updatedUser) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to update user.",
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
