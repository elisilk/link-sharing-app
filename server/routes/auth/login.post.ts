import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields.",
    });
  }

  const existingUser = await useDb().query.user.findFirst({
    where: eq(schema.user.email, email),
  });

  if (!existingUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password. Please try again.",
    });
  }

  const isValid = await verifyPassword(existingUser.password, password);

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password. Please try again.",
    });
  }

  const { password: stash, ...userWithoutPassword } = existingUser;
  await setUserSession(event, {
    user: userWithoutPassword,
  });

  return userWithoutPassword;
});
