<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { clear } = useUserSession();

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
    to: "/editor/profile",
  },
]);

const authItems = ref<NavigationMenuItem[]>([
  {
    label: "Login Items",
    type: "label",
  },
  {
    label: "Update",
    icon: "i-lucide-user-pen",
    to: "/editor/profile",
  },
  {
    label: "Logout",
    icon: "i-lucide-log-out",
    onClick: handleLogout,
  },
]);
</script>

<template>
  <div>
    <UHeader
      mode="slideover"
      :ui="{
        root: 'border-0',
        left: 'flex-1',
        right: 'flex-1',
        center: 'flex',
        toggle: 'lg:block',
        content: 'lg:block',
        overlay: 'lg:block',
      }"
    >
      <!-- toggle menu for auth items -->
      <!--
        class="-mx-2.5"
        -->
      <template #body>
        <UNavigationMenu
          :items="authItems"
          orientation="vertical"
        />
      </template>

      <!-- right/title slot for logo -->
      <template #title>
        <picture>
          <source media="(min-width: 40rem)" srcset="/logo-devlinks-large.svg">
          <img
            src="/logo-devlinks-small.svg"
            alt="Devlinks logo"
          >
        </picture>
      </template>

      <!-- center/default slot for editor tabs -->
      <UNavigationMenu
        :items="tabItems"
        :ui="{
          linkLabel: 'hidden sm:inline',
        }"
      />

      <!-- right slot for preview link -->
      <template #right>
        <UButton
          to="/preview"
          variant="outline"
          icon="i-custom-icon-preview-header"
          label="Preview"
          :ui="{
            label: 'hidden sm:inline',
            leadingIcon: 'sm:hidden',
          }"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>
  </div>
</template>
