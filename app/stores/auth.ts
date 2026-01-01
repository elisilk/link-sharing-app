import { authClient } from "~~/server/utils/auth-client";

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = authClient.useSession();
  const user = computed(() => session.value.data?.user);
  const loading = computed(() => session.value.isPending || session.value.isRefetching);

  async function signUp(email: string, password: string) {
    const { data, error } = await authClient.signUp.email({
      name: "Jay Doe", // required
      email, // required
      password, // required
      callbackURL: "/",
    });

    if (error) {
      console.error("sign up error:", error);
    }
    else {
      console.warn("sign up successful", data);
    }
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await authClient.signIn.email({
      email, // required
      password, // required
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      console.error("sign in error:", error);
    }
    else {
      console.warn("sign in successful", data);
    }
  }

  async function signOut() {
    await authClient.signOut();
  }

  return { user, loading, signUp, signIn, signOut };
});
