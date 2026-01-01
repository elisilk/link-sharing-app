import { authClient } from "~~/server/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch);
  const isUserSignedIn = session.value;

  // user NOT signed in, so protect routes:
  // - /sign-out
  // - /editor
  // - /editor/links
  // - /editor/profile
  // - /preview
  if (!isUserSignedIn) {
    if (to.path === "/sign-out"
      || to.path.startsWith("/editor")
      || to.path === "/preview") {
      return navigateTo("/");
    }
  }

  // user IS signed in, so protect routes:
  // - /
  // - /sign-in
  // - /sign-up
  if (isUserSignedIn) {
    if (to.path === "/"
      || to.path === "/sign-in"
      || to.path === "/sign-up") {
      return navigateTo("/editor");
    }
  }
});
