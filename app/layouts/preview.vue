<template>
  <div class="container">
    <AppPreviewNavBar />
    <main>
      <slot />
    </main>
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

main {
  margin-inline: auto;
  margin-block: var(--space-300);
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .container {
    grid-template-rows: 136px 221px 1fr;
  }

  .container > :first-child {
    grid-column: 1 / -1;
    grid-row: 1 / 3;
  }

  .container > :last-child {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
  }
}
</style>
