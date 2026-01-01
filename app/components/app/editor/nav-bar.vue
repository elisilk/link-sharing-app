<template>
  <div class="navbar">
    <div class="navbar-start">
      <AppMenuFull />
    </div>

    <div class="navbar-center flex gap-3">
      <NuxtLink to="/editor/links" class="flex align-middle gap-1">
        <Icon name="tabler:link" size="24" />
        Links
      </NuxtLink>
      <NuxtLink to="/editor/profile" class="flex align-middle gap-1">
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
