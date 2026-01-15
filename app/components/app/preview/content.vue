<script setup lang="ts">
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

type Props = {
  variant?: "card" | "phone";
};

const { variant = "phone" } = defineProps<Props>();

const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");

const orderedLinks = computed(() => profile.value && profile.value.links ? [...profile.value.links].sort((a, b) => a.order - b.order) : []);
</script>

<template>
  <UCard
    class="mx-auto w-min"
    :class="{
      'variant-phone': variant === 'phone',
      'variant-card': variant === 'card',
    }"
    :ui="{
      root: 'bg-default text-default py-12 sm:px-14',
      header: 'w-59.25 mx-auto mb-14 p-0 sm:p-0 grid justify-items-center',
      body: 'w-59.25 mx-auto p-0 sm:p-0',
    }"
    variant="solid"
  >
    <template #header>
      <div v-if="profile" class="grid justify-items-center relative">
        <!-- profile picture -->
        <USkeleton class="animate-none h-24 w-24 rounded-full shrink-0 mb-6" />

        <!-- profile name -->
        <h2
          v-if="profile.firstName || profile.lastName"
          class="text-3xl font-bold"
        >
          {{ profile.firstName }}
          {{ profile.lastName }}
        </h2>
        <USkeleton v-else class="animate-none h-4 w-40" />

        <!-- profile email -->
        <h3 v-if="profile.email">
          {{ profile.email }}
        </h3>
        <USkeleton v-else class="animate-none h-2 w-18 mt-3" />
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
        class="animate-none h-11 w-59.25"
      />
    </div>
  </UCard>
</template>

<style scoped>
.variant-phone {
  background: url("/illustration-phone-mockup-outline.svg") no-repeat center;
}

/* sm: 40rem (640px) */
@media (width >= 40rem) {
  .variant-card {
    border-radius: var(--radius-3xl);
    box-shadow: var(--shadow-black-400);
  }
}
</style>
