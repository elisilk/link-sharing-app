<template>
  <div class="editor-layout-container">
    <AppEditorNavBar />

    <slot />

    <AppToastContainer />
  </div>
</template>

<style scoped>
.editor-layout-container {
  min-block-size: 100vb;
  max-inline-size: var(--editor-inline-size-max);
  margin-inline: auto;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
