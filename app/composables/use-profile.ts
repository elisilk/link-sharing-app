import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

// export async function useProfile(userId: string) {
export async function useProfile() {
  const { user } = useUserSession();

  const { data: profile, pending, error, refresh } = useAsyncData<SelectProfileWithLinks>(
    "profile",
    async () => {
      const profileResult = await $fetch<SelectProfileWithLinks>(`/api/user/${user.value?.id}/profile/`);
      return profileResult;
    },
    {
      lazy: true,
      deep: true,
      pick: ["userId", "id", "firstName", "lastName", "email", "picture", "links", "pictureUrl"],
    },
  );

  return { profile, pending, error, refresh };
}
