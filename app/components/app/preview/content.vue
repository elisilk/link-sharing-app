<script setup lang="ts">
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

const props = defineProps<{
  profile: Pick<SelectProfileWithLinks, "email" | "firstName" | "lastName" | "links">;
}>();

const orderedLinks = computed(() => props.profile?.links ? [...props.profile?.links].sort((a, b) => a.order - b.order) : []);
</script>

<template>
  <UCard
    class="mx-auto w-min"
    :ui="{
      root: 'bg-default text-default py-12 sm:px-14 sm:rounded-3xl sm:shadow-(--shadow-black-400)',
      header: 'w-59.25 mx-auto mb-14 p-0 sm:p-0 grid justify-items-center',
      body: 'w-59.25 mx-auto p-0 sm:p-0',
    }"
    variant="solid"
  >
    <template #header>
      <div class="grid justify-items-center">
        <!-- profile picture -->
        <USkeleton class="h-24 w-24 rounded-full shrink-0 mb-6" />

        <!-- profile name -->
        <h2
          v-if="profile.firstName || profile.lastName"
          class="text-3xl font-bold"
        >
          {{ profile.firstName }}
          {{ profile.lastName }}
        </h2>
        <USkeleton v-else class="h-4 w-40" />

        <!-- profile email -->
        <h3 v-if="profile.email">
          {{ profile.email }}
        </h3>
        <USkeleton v-else class="h-2 w-18 mt-3" />
      </div>
    </template>

    <div class="grid gap-5">
      <AppPreviewLink
        v-for="link in orderedLinks"
        :key="link.id"
        :platform="link.platform"
        :url="link.url"
      />
      <USkeleton
        v-for="index in 5 - orderedLinks.length"
        :key="`link-placeholder-${index}`"
        class="h-11 w-59.25"
      />
    </div>
  </UCard>
</template>
