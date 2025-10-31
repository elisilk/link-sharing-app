<template>
  <div class="edit-layout-container">
    <AppEditNavBar />

    <slot />

    <AppToastContainer />
  </div>
</template>

<style scoped>
.edit-layout-container {
  max-block-size: 100vb;
  overflow-y: hidden;
  max-inline-size: var(--edit-inline-size-max);
  margin-inline: auto;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
