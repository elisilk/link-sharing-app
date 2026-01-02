import { authClient } from "~~/server/utils/auth-client";

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

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
      callbackURL: "/editor",
    });

    if (error) {
      console.error("sign in error:", error);
    }
    else {
      console.warn("sign in successful", data);
    }
  }

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          // console.log("signOut success", session.value?.data);
          await navigateTo("/", { replace: true });
          // router.push("/login"); // redirect to login page
        },
      },
    });
  }

  return { init, user, loading, signUp, signIn, signOut };
});
