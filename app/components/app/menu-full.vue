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

    <ul
      v-if="authStore.user"
      tabindex="-1"
      class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
    >
      <li>
        <div>
          <Icon name="tabler:user-check" />
          {{ authStore.user.email }}
        </div>
      </li>
      <li>
        <NuxtLink to="/editor/links" active-class="menu-active">
          <Icon name="tabler:link" />
          Links <Icon name="tabler:edit" size="12" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/editor/profile" active-class="menu-active">
          <Icon name="tabler:user-circle" />
          Profile <Icon name="tabler:edit" size="12" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/preview" active-class="menu-active">
          <Icon name="tabler:eye" />
          Preview
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/error" active-class="menu-active">
          <Icon name="tabler:face-id-error" />
          Error
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/sign-out" active-class="menu-active">
          <Icon name="tabler:user-x" />
          Sign Out
        </NuxtLink>
      </li>
    </ul>

    <ul
      v-else
      tabindex="-1"
      class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
    >
      <li>
        <div>User is NOT logged in</div>
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
        <NuxtLink to="/error" active-class="menu-active">
          <Icon name="tabler:face-id-error" />
          Error
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
