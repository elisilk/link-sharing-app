import { eq } from "drizzle-orm";

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
      message: "ID is required",
    });
  }

  const userId: number = Number(routerParamId);

  const profileWithLinks = await useDb().query.profile.findFirst({
    where: eq(schema.profile.userId, userId),
    with: {
      links: true,
    },
  });

  if (!profileWithLinks) {
    throw createError({
      statusCode: 401,
      statusMessage: "Profile not found.",
    });
  }

  return profileWithLinks;
});
