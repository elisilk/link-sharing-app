export const useProfileStore = defineStore("profileStore", () => {
  const firstName = ref<string | null>(null);
  const lastName = ref<string | null>(null);
  const email = ref<string | null>(null);

  return {
    firstName,
    lastName,
    email,
  };
});
