<template>
  <div class="container">
    <AppEditorNavBar />
    <slot />
  </div>
</template>

<style scoped>
.container {
  min-block-size: 100vb;
  max-inline-size: var(--editor-inline-size-max);
  margin-inline: auto;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
