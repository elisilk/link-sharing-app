import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

import { asc, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  // TESTING: only include if want to protect api from guest users
  // await requireUserSession(event);

  // TESTING: handle response to different error status codes
  // setResponseStatus(event, 500);

  // TESTING: block for an amount of time to test pending state
  // await sleep(4000);

  const routerParamId = getRouterParam(event, "id");

  if (!routerParamId) {
    throw createError({
      statusCode: 400,
      message: "User ID is required",
    });
  }

  const userId: number = Number(routerParamId);

  const profile: SelectProfileWithLinks | undefined = await useDb().query.profile.findFirst({
    where: eq(schema.profile.userId, userId),
    with: {
      // links: true,
      links: {
        orderBy: ({ order }) => [asc(order)],
      },
    },
  });

  if (!profile) {
    throw createError({
      statusCode: 401,
      statusMessage: "Profile not found.",
    });
  }

  return profile;
});
