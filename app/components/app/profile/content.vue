<script setup lang="ts">
import type { SelectProfileWithLinks } from "#server/db/schema/index";

type Props = {
  profile: SelectProfileWithLinks;
  variant?: "card" | "phone";
};

const { profile, variant = "phone" } = defineProps<Props>();

const isPhoneVariant = computed(() => variant === "phone");

// const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");

const config = useRuntimeConfig();

const profilePictureSrc = computed<string | null>(() =>
  profile.picture ? `${config.public.blobStorageUrl}/${config.public.blobStorageBase}/${profile.picture}` : null,
);

const NUM_SKELETON_LINKS = 5;
</script>

<template>
  <div
    v-if="profile"
    :class="[isPhoneVariant
      ? 'sm:rounded-[56px] w-77 h-158 overflow-hidden relative after:absolute after:top-0 after:left-0 after:size-full after:bg-[url(/illustration-phone-mockup-outline.svg)] after:bg-no-repeat after:bg-top after:pointer-events-none'
      : 'sm:rounded-3xl sm:shadow-(--shadow-black-400) w-min mx-auto sm:bg-default py-8.5 sm:py-12 sm:px-14',
    ]"
  >
    <div
      class="*:w-59.25 *:mx-auto"
      :class="[isPhoneVariant
        ? 'h-full overflow-scroll pt-[63.5px] pb-8'
        : '',
      ]"
    >
      <div class="mb-14 grid justify-items-center">
        <!-- profile picture -->
        <img
          v-if="profilePictureSrc"
          class="rounded-full object-cover outline-primary outline-4"
          :class="[isPhoneVariant
            ? 'h-24 w-24 mb-6.25'
            : 'h-26 w-26 mb-6']"
          :src="profilePictureSrc"
        >
        <USkeleton
          v-else
          class="animate-none rounded-full shrink-0"
          :class="[variant === 'phone'
            ? 'h-24 w-24 mb-6.25'
            : 'h-26 w-26 mb-6']"
        />

        <!-- profile name -->
        <h2
          v-if="profile.firstName || profile.lastName"
          class="text-gray-900"
          :class="[isPhoneVariant
            ? 'text-lg font-semibold'
            : 'text-[32px] font-bold']"
        >
          {{ profile.firstName }}
          {{ profile.lastName }}
        </h2>
        <USkeleton v-else class="animate-none h-4 w-40" />

        <!-- profile email -->
        <span
          v-if="profile.email"
          class="mt-2"
          :class="[isPhoneVariant ? 'text-sm' : 'text-base']"
        >
          {{ profile.email }}
        </span>
        <USkeleton v-else class="animate-none h-2 w-18 mt-3.25" />
      </div>

      <!-- profile links -->
      <div
        class="grid"
        :class="[variant === 'phone'
          ? 'gap-5'
          : 'gap-6']"
      >
        <AppProfileLink
          v-for="link in profile.links"
          :key="link.id"
          :platform="link.platform"
          :url="link.url"
          :size="isPhoneVariant ? 'sm' : undefined"
        />
        <template v-if="isPhoneVariant">
          <USkeleton
            v-for="index in NUM_SKELETON_LINKS - profile.links.length"
            :key="`link-placeholder-${index}`"
            class="animate-none h-11 w-59.25"
          />
        </template>
      </div>
    </div>
  </div>
</template>
