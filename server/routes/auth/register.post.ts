export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields.",
    });
  }

  await throwIfUserExists(email);

  const newUser = await registerUser(email, password);

  const { password: stash, ...userWithoutPassword } = newUser;
  await setUserSession(event, {
    user: userWithoutPassword,
  });

  return userWithoutPassword;
});
