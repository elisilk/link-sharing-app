import { eq } from "drizzle-orm";

export async function throwIfUserExists(email: string) {
  const existingUser = await useDb().query.user.findFirst({
    where: eq(schema.user.email, email),
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account already exists. Please login.",
    });
  }
}

export async function registerUser(email: string, password: string) {
  const result = await useDb().insert(schema.user).values({
    email,
    password: await hashPassword(password),
  }).returning();

  const newUser = result.at(0);

  if (!newUser) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to register user.",
    });
  }

  return newUser;
}

export async function createProfileForNewUser(userId: number) {
  const result = await useDb().insert(schema.profile).values({
    userId,
  }).returning();

  const newProfile = result.at(0);

  if (!newProfile) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create profile for new user.",
    });
  }

  return newProfile;
}
