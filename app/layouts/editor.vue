<template>
  <div class="editor-layout-container">
    <AppEditorNavBar />

    <slot />

    <AppFooter />
    <AppToastContainer />
  </div>
</template>

<style scoped>
.editor-layout-container {
  max-block-size: 100vb;
  overflow-y: hidden;
  max-inline-size: var(--editor-inline-size-max);
  margin-inline: auto;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
