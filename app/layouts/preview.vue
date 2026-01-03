<template>
  <UApp>
    <UHeader>
      <template #left>
        <AppHeaderLogoWithMenu />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>
  </UApp>
</template>
