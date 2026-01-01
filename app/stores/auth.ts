export const useAuthStore = defineStore("useAuthStore", () => {
  const loading = ref(false);

  async function signUp() {
    loading.value = true;
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
