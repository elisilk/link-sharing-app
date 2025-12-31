<template>
  <div class="navbar">
    <div class="navbar-start">
      <AppMenuFull />
    </div>

    <div class="navbar-center">
      <NuxtLink to="/editor" class="flex align-middle gap-1">
        <Icon name="tabler:user-circle" size="24" />
        Profile Details
      </NuxtLink>
    </div>

    <div class="navbar-end">
      <NuxtLink to="/preview" class="flex align-middle gap-1">
        <Icon name="tabler:eye" size="24" />
        Preview
      </NuxtLink>
    </div>
  </div>
</template>
