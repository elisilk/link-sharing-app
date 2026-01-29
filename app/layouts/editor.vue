<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

const { clear } = useUserSession();
await useProfile();

async function handleLogout() {
  await clear();
  await navigateTo("/");
}

const tabItems = ref<NavigationMenuItem[]>([
  {
    label: "Links",
    icon: "i-custom-icon-links-header",
    to: "/editor/links",
  },
  {
    label: "Profile Details",
    icon: "i-custom-icon-profile-details-header",
    to: "/editor/details",
  },
]);

const authItems = ref<NavigationMenuItem[]>([
  {
    label: "Login Items",
    type: "label",
  },
  {
    label: "Update Email",
    icon: "i-custom-icon-email",
    to: "/update/email",
  },
  {
    label: "Update Password",
    icon: "i-custom-icon-password",
    to: "/update/password",
  },
  {
    label: "Logout",
    icon: "i-lucide-log-out",
    onClick: handleLogout,
  },
]);

const { data: profile } = useNuxtData<SelectProfileWithLinks | undefined>("profile");
</script>

<template>
  <UContainer class="min-h-dvh px-0 sm:px-0 lg:px-0">
    <UHeader
      mode="slideover"
      :ui="{
        root: 'border-0 sm:p-6 sm:bg-transparent',
        container: 'pl-6 pr-4 py-4 sm:bg-default sm:rounded-xl sm:pl-6 sm:pr-4 sm:py-4 lg:pl-6 lg:pr-4 lg:py-4',
        left: 'flex-1',
        right: 'flex-1 [&>button:where([data-slot=base])]:lg:inline-flex',
        center: 'flex',
        toggle: 'lg:block',
        content: 'lg:block',
        overlay: 'lg:block',
      }"
    >
      <!-- toggle menu for auth items -->
      <template #body>
        <UNavigationMenu
          :items="authItems"
          orientation="vertical"
        />
      </template>

      <!-- left/title slot for logo -->
      <template #left>
        <NuxtLink to="/">
          <picture>
            <source media="(min-width: 40rem)" srcset="/logo-devlinks-large.svg">
            <img
              src="/logo-devlinks-small.svg"
              alt="Devlinks logo"
            >
          </picture>
        </NuxtLink>
      </template>

      <!-- center/default slot for editor tabs -->
      <UNavigationMenu
        :items="tabItems"
        :ui="{
          linkLabel: 'hidden sm:inline',
          item: 'py-0',
          link: 'h-13 sm:h-14 px-6 gap-2',
        }"
      />

      <!-- right slot for preview link -->
      <template #right>
        <UButton
          to="/profile"
          variant="outline"
          icon="i-custom-icon-preview-header"
          label="Preview"
          :ui="{
            base: 'h-13 sm:h-14 px-4',
            label: 'hidden sm:inline',
            leadingIcon: 'sm:hidden',
          }"
        />
      </template>
    </UHeader>

    <UMain>
      <UContainer class="px-4 pb-4 lg:px-6 lg:pb-6">
        <UPage
          :ui="{
            root: 'lg:grid-cols-17 lg:gap-6',
            left: 'lg:col-span-7',
            center: 'lg:col-span-10',
          }"
        >
          <template #left>
            <UPageAside class="lg:flex items-center justify-center bg-default rounded-xl lg:ms-0 lg:p-6 lg:min-h-min">
              <AppProfileContent v-if="profile" :profile />
              <div v-else>
                Error: Profile not found
              </div>
            </UPageAside>
          </template>

          <UPageBody class="mt-0 pb-0 h-full">
            <slot />
          </UPageBody>
        </UPage>
      </UContainer>
    </UMain>
  </UContainer>
</template>
