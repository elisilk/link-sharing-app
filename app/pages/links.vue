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

    <button class="button-add-new-link">
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
.button-add-new-link {
  block-size: 56px;
  inline-size: 100%;
  border-radius: var(--br-400);
  border: 1px solid hsl(var(--color-purple-600));
  color: hsl(var(--color-purple-600));
}

.button-add-new-link:hover,
.button-add-new-link:focus-visible {
  background-color: hsl(var(--color-grey-100));
}

.button-add-new-link:focus-visible {
  outline-offset: 2px;
  outline: 2px dashed hsl(var(--color-purple-600));
}

.empty {
  margin-block-start: var(--space-300);
  padding: var(--space-300);
  background-color: hsl(var(--color-grey-50));
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
