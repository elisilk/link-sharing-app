<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "preview",
});

useSeoMeta({
  title: "Link-sharing app | Preview your profile",
  ogTitle: "Link-sharing app | Preview your profile",
  description: "For developers to have a single place to share their multiple developer profiles across the web.",
  ogDescription: "For developers to have a single place to share their multiple developer profiles across the web.",
});

const { profile, pending, error } = await useProfile();

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

    <AppPreviewContent
      v-else-if="profile"
      :profile
      variant="card"
    />
  </UContainer>
</template>
