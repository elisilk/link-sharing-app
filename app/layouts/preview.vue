<template>
  <div class="container">
    <AppPreviewNavBar />

    <slot />

    <!-- <AppToastNotification>
      The link has been copied to your clipboard!
    </AppToastNotification> -->

    <AppToastNotification icon="my-icon:icon-link-copied-to-clipboard">
      The link has been copied to your clipboard!
    </AppToastNotification>
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

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .container {
    grid-template-rows: 136px 221px 1fr;
  }

  .container > :first-child {
    grid-column: 1 / -1;
    grid-row: 1 / 3;
  }

  .container > :nth-child(2) {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
  }
}
</style>
