<script setup lang="ts">
definePageMeta({
  layout: "editor",
});
</script>

<template>
  <AppEditorMain>
    <template #title>
      Customize your links
    </template>

    <template #description>
      Add/edit/remove links below and then share all your profiles with the world!
    </template>

    <button class="btn btn-secondary">
      + Add new link
    </button>

    <div class="empty">
      <h2>Let's get you started</h2>
      <p>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
      <img
        src="/illustration-empty.svg"
        alt=""
        width="250"
        height="161"
      >
    </div>
  </AppEditorMain>
</template>

<style scoped>
.empty {
  margin-block-start: var(--space-300);
  padding: var(--space-300);
  background-color: var(--color-background-links-empty);
  border-radius: var(--br-500);
  display: grid;
  grid-template-areas:
    "illustration"
    "heading"
    "description";
  justify-items: center;
  gap: var(--space-300);
  text-align: center;
}

.empty h2 {
  grid-area: heading;
}

.empty p {
  grid-area: description;
}

.empty img {
  grid-area: illustration;
}
</style>
