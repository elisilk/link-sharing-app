<script setup lang="ts">
const shareLink = "https://generated.share.link";

const { addToast } = useToastNotifications();

function showSuccessToast() {
  addToast("The link has been copied to your clipboard!", "my-icon:icon-link-copied-to-clipboard", false);
}

async function copyShareLinkToClipboard() {
  try {
    // clipboard successfully set
    await navigator.clipboard.writeText(shareLink);
    // trigger the toast notification
    showSuccessToast();
  }
  catch (error: unknown) {
    // clipboard write failed
    console.error("Share link failed to copy to clipboard");
    if (error instanceof Error) {
      console.error(error.message);
    }
    else {
      console.error("An unknown error occurred:", error);
    }
  }
}
</script>

<template>
  <div class="preview-layout-container">
    <AppPreviewNavBar
      @share-link="copyShareLinkToClipboard"
    />

    <slot />

    <AppToastContainer />
  </div>
</template>

<style scoped>
.preview-layout-container {
  min-block-size: 100vb;
  max-inline-size: var(--preview-inline-size-max);
  margin-inline: auto;
  display: grid;
  grid-template-rows: auto 1fr;
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .container {
    grid-template-rows: var(--preview-block-size-header-row) var(--preview-block-size-header-overlap) 1fr;
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
