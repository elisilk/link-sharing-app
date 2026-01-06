<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "preview",
});

const { user } = useUserSession();

const { data: profile, status, error } = useFetch(
  `/api/profiles/${user.value?.id}`,
  {
    lazy: true,
    key: "profilePreview",
  },
);

const orderedLinks = computed(() => profile.value ? [...profile.value.links].sort((a, b) => a.order - b.order) : []);

watchEffect(() => {
  if (error.value) {
    throw createError({ ...error.value, fatal: true });
  }
});
</script>

<template>
  <UContainer class="my-4 px-0 sm:px-0 sm:mt-0 lg:px-0">
    <UCard
      v-if="profile"
      class="mx-auto w-min"
      :ui="{
        root: 'bg-default text-default py-12 sm:px-14 sm:rounded-3xl sm:shadow-(--shadow-black-400)',
        header: 'w-59.25 mx-auto mb-14 p-0 sm:p-0 grid justify-items-center',
        body: 'w-59.25 mx-auto p-0 sm:p-0 grid gap-6',
      }"
      variant="solid"
    >
      <template #header>
        <USkeleton class="h-26 w-26 rounded-full mb-6 animate-none" />
        <h1 class="text-3xl font-bold mb-2">
          {{ profile.firstName }}
          {{ profile.lastName }}
        </h1>
        <h2>{{ profile.email }}</h2>
      </template>

      <!-- <pre>{{ profile }}</pre> -->
      <template v-if="orderedLinks">
        <AppPreviewLink
          v-for="link in orderedLinks"
          :key="link.id"
          :platform="link.platform"
          :url="link.url"
        />
      </template>
    </UCard>

    <UCard v-if="!profile && status === 'pending'" class="mx-auto max-w-87.25">
      <div>
        Loading ...
        <div class="flex items-start gap-4">
          <USkeleton class="h-12 w-12 rounded-full shrink-0" />
          <div class="grid gap-2">
            <USkeleton class="h-4 w-62.5" />
            <USkeleton class="h-4 w-50" />
          </div>
        </div>
      </div>
    </UCard>

    <UCard v-if="!profile && status === 'success'" class="mx-auto max-w-87.25">
      <div>
        Profile not found
      </div>
    </UCard>
  </UContainer>
</template>
