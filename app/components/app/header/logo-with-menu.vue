<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { loggedIn, user, clear } = useUserSession();

async function handleLogout() {
  await clear();
  await navigateTo("/");
}

const guestItems = ref<NavigationMenuItem[]>([
  {
    label: "devlinks",
    icon: "i-custom-icon-changes-saved",
    children: [
      {
        label: "Guest",
        icon: "i-lucide-user-round",
      },
      {
        label: "Login",
        to: "/",
        icon: "i-lucide-log-in",
      },
      {
        label: "Register",
        to: "/register",
        icon: "i-lucide-user-plus",
      },
    ],
  },
]);

const authItems = ref<NavigationMenuItem[]>([
  {
    label: "devlinks",
    icon: "i-lucide-book-open",
    children: [
      {
        label: `${user.value?.email}`,
        icon: "i-lucide-user-check",
      },
      {
        label: "Links",
        to: "/editor/links",
        icon: "i-lucide-link",
      },
      {
        label: "Profile",
        to: "/editor/profile",
        icon: "i-lucide-circle-user-round",
      },
      {
        label: "Preview",
        to: "/preview",
        icon: "i-lucide-eye",
      },
      {
        label: "Logout",
        icon: "i-lucide-log-out",
        onClick: handleLogout,
      },
    ],
  },
]);
</script>

<template>
  <!-- <img src="~/assets/images/logo-devlinks-large.svg" alt=""> -->
  <UNavigationMenu
    v-if="loggedIn"
    :items="authItems"
    content-orientation="vertical"
    :ui="{
      // viewport: 'sm:w-fit',
      childList: 'w-fit',
      // content: 'w-fit',
    }"
  />
  <UNavigationMenu
    v-else
    :items="guestItems"
    content-orientation="vertical"
  />
</template>
