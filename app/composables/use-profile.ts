import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

// export async function useProfile(userId: string) {
export async function useProfile() {
  const { user } = useUserSession();

  const { data: profile, pending, error, refresh } = useFetch<SelectProfileWithLinks>(
    `/api/profile/${user.value?.id}`,
    {
      key: "profile",
      lazy: true,
      pick: ["firstName", "lastName", "email", "links"],
    },
  );

  return { profile, pending, error, refresh };
}
