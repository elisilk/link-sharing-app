<script setup lang="ts">
defineProps<{
  index: number;
}>();
</script>

<template>
  <div class="container">
    <header>
      <h3 class="heading">
        Link #{{ index }}
      </h3>

      <button class="reorder">
        <span class="sr-only">Reorder</span>
        <Icon name="my-icon:icon-drag-and-drop" class="icon" />
      </button>

      <button class="remove">
        Remove
      </button>
    </header>

    <fieldset>
      <legend class="sr-only">
        Link Fields
      </legend>

      <AppFormDropdownField :index="index" />

      <AppFormTextField
        :id="`link${index}-url`"
        type="url"
        :name="`link${index}-url`"
        label="Link"
        placeholder="e.g. https://www.<put sample URL here>"
        autocomplete="given-name"
        pattern="https://.*"
      >
        <template #icon>
          <Icon name="my-icon:icon-link" />
        </template>
      </AppFormTextField>
    </fieldset>
  </div>
</template>

<style scoped>
.container {
  padding: var(--space-200);
  border-radius: var(--br-500);
  background-color: var(--color-background-editor-link);
}

header {
  display: grid;
  grid-template-areas: "reorder heading remove";
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  gap: var(--space-100);
  color: var(--color-input-dropdown-heading);
  margin-block-end: var(--space-200);
}

.heading {
  grid-area: heading;
  font-weight: var(--fw-bold);
  color: inherit;
}

.remove {
  grid-area: remove;
}

.remove:hover,
.remove:focus-visible {
  color: var(--color-button-background);
}

.remove:focus-visible {
  outline-offset: var(--outline-width);
  outline: var(--outline-width) dashed var(--color-button-background);
}

.reorder {
  grid-area: reorder;
  display: flex;
  align-items: center;
}

.reorder .icon {
  inline-size: var(--icon-size-xs);
}

.reorder:hover,
.reorder:focus-visible {
  color: var(--color-button-background);
}

.reorder:focus-visible {
  outline-offset: var(--outline-width);
  outline: var(--outline-width) dashed var(--color-button-background);
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

fieldset > :not(legend) + * {
  margin-block-start: var(--space-200);
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .container {
    padding: var(--space-300);
  }
}
</style>
