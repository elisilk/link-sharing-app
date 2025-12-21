export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();

  const isAuthPage = ["/login", "/register"].includes(to.path);

  // if no user is logged in and requesting a content page, then redirect to the login page (no access the content pages)
  if (!user.value && !isAuthPage) {
    return navigateTo("/login");
  }

  // if a user is logged in and requesting an auth page, then redirect to the main page (no need to access the auth pages)
  if (user.value && isAuthPage) {
    return navigateTo("/");
  }

  // return nothing to allow the request to proceed normally
});
