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

const authItems = [
  {
    slot: "logo" as const,
    label: "Login Items",
    children: [
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
    ],
  },
] satisfies NavigationMenuItem[];
</script>

<template>
  <div>
    <UHeader
      :ui="{
        toggle: 'hidden',
        center: 'flex',
        root: 'border-0',
      }"
    >
      <template #left>
        <UNavigationMenu
          :items="authItems"
          :unmount-on-hide="false"
          popover
          collapsed
          orientation="vertical"
          :ui="{
            item: 'py-0',
            link: 'px-0 py-0',
          }"
        >
          <template #logo>
            <picture class="cursor-pointer">
              <source media="(min-width: 40rem)" srcset="/logo-devlinks-large.svg">
              <img
                src="/logo-devlinks-small.svg"
                alt="Devlinks logo"
              >
            </picture>
          </template>
        </UNavigationMenu>
      </template>

      <UNavigationMenu
        :items="tabItems"
        :ui="{
          linkLabel: 'hidden sm:inline',
        }"
      />

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
