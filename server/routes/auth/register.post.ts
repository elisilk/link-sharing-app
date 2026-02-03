export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      status: 400,
      statusText: "Missing required fields.",
    });
  }

  await throwIfUserExists(email);

  const newUser = await registerUser(email, password);

  const { password: stash, ...userWithoutPassword } = newUser;
  await setUserSession(event, {
    user: userWithoutPassword,
  });

  // create empty profile for the new user
  await createProfileForNewUser(newUser.id);

  return userWithoutPassword;
});
