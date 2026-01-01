<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div class="dropdown">
    <div
      tabindex="0"
      role="button"
      class="cursor-pointer"
    >
      <img src="~/assets/images/logo-devlinks-large.svg" alt="">
    </div>
    <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
      <li>
        <div v-if="!authStore.loading && authStore.user">
          <Icon name="tabler:user-check" />
          {{ authStore.user.email }}
        </div>
        <div v-else>
          User is NOT logged in
        </div>
      </li>
      <li>
        <NuxtLink to="/" active-class="menu-active">
          <Icon name="tabler:user-check" />
          Sign In
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/sign-up" active-class="menu-active">
          <Icon name="tabler:user-plus" />
          Sign Up
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/sign-out" active-class="menu-active">
          <Icon name="tabler:user-x" />
          Sign Out
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/error" active-class="menu-active">
          <Icon name="tabler:face-id-error" />
          Error
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/editor" active-class="menu-active">
          <Icon name="tabler:edit" />
          Editor
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/preview" active-class="menu-active">
          <Icon name="tabler:eye" />
          Preview
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
