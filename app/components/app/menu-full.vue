<template>
  <div>
    <button
      popovertarget="nav-menu-full"
      class="cursor-pointer"
      style="anchor-name:--nav-menu-full-anchor"
    >
      <img src="~/assets/images/logo-devlinks-large.svg" alt="">
    </button>

    <ul
      id="nav-menu-full"
      class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
      popover
      style="position-anchor:--nav-menu-full-anchor"
    >
      <li>
        <NuxtLink to="/" active-class="menu-active">
          <Icon name="tabler:user-check" />
          Login
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/register" active-class="menu-active">
          <Icon name="tabler:user-plus" />
          Register
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
