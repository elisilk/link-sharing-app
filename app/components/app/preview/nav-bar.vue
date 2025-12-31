<template>
  <div class="navbar">
    <div class="flex-1">
      <NuxtLink to="/editor" class="flex align-middle gap-1">
        <Icon name="tabler:edit" size="24" />
        Back to Editor
      </NuxtLink>
    </div>

    <div class="flex-none">
      <NuxtLink to="/preview" class="flex align-middle gap-1">
        <Icon name="tabler:copy" size="24" />
        Share Link
      </NuxtLink>
    </div>
  </div>
</template>
