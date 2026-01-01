import { authClient } from "~~/server/utils/auth-client";

export const useAuthStore = defineStore("useAuthStore", () => {
  const loading = ref(false);

  async function signUp(email: string, password: string) {
    loading.value = true;

    const { data, error } = await authClient.signUp.email({
      name: "Jay Doe", // required
      email, // required
      password, // required
      callbackURL: "/",
    });

    if (error) {
      console.error("signup error:", error);
    }
    else {
      console.warn("signup successful", data);
    }

    loading.value = false;
  }

  async function signIn() {
    loading.value = true;
    loading.value = false;
  }

  async function signOut() {
    loading.value = true;
    loading.value = false;
  }

  return { loading, signUp, signIn, signOut };
});
