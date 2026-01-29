<script setup lang="ts">
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

definePageMeta({
  layout: "profile",
});

const { loggedIn, user } = useUserSession();
const route = useRoute();

const profileUserId = computed(() => {
  // if a route param, then use that
  if (route.params.id) {
    return route.params.id;
  }
  // if no route param, but a user is logged in, then use that
  if (loggedIn.value && user.value) {
    return user.value.id;
  }
  // else something is wrong
  return null;
});

useSeoMeta({
  title: () => `User ${profileUserId.value} public profile`,
  ogTitle: () => `devlinks - User ${profileUserId.value} public profile`,
});

// const { profile, pending, error } = await useProfile();

const { data: profile, pending, error } = useAsyncData<SelectProfileWithLinks>(
  `profile:${profileUserId.value}`,
  async () => {
    const profileResult = await $fetch<SelectProfileWithLinks>(`/api/user/${profileUserId.value}/profile/`);
    return profileResult;
  },
  {
    watch: [profileUserId],
    lazy: true,
    deep: true,
    pick: ["userId", "id", "firstName", "lastName", "email", "picture", "links", "pictureUrl"],
  },
);

watchEffect(() => {
  if (error.value) {
    throw createError({ ...error.value, fatal: true });
  }
});
</script>

<template>
  <UContainer class="my-4 px-0 sm:px-0 sm:mt-0 lg:px-0">
    <UCard v-if="pending" class="mx-auto max-w-87.25">
      <div>
        <p>Loading ...</p>
      </div>
    </UCard>

    <UCard v-else-if="error" class="mx-auto max-w-87.25">
      <div>
        <p>Profile not found</p>
        <p>Error: {{ error.message }}</p>
      </div>
    </UCard>

    <AppProfileContent
      v-else-if="profile"
      :profile
      variant="card"
    />
  </UContainer>
</template>
