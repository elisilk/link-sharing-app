import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

// export async function useProfile(userId: string) {
export async function useProfile() {
  const { user } = useUserSession();

  const { data: profile, status, pending, error, refresh } = useAsyncData(
    () => `profile:${user.value?.id}`,
    async () => await $fetch<SelectProfileWithLinks>(
      `/api/profile/${user.value?.id}`,
    ),
    {
      lazy: true,
      pick: ["firstName", "lastName", "email", "links"],
    },
  );

  return { profile, status, pending, error, refresh };
}
