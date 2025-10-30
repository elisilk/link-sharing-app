<script setup lang="ts">
definePageMeta({
  layout: "preview",
});
</script>

<template>
  <main>
    <div class="inner">
      <AppPreviewProfile />
    </div>
  </main>
</template>

<style scoped>
main {
  margin-inline: auto;
  margin-block: var(--space-300);
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .inner {
    background-color: var(--color-background-preview);
    border-radius: var(--br-600);
    padding: var(--space-600) var(--space-700);
    box-shadow: var(--shadow-preview);
  }
}
</style>
