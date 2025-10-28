<script setup lang="ts">
defineProps<{
  id: string;
  name: string;
  label: string;
  accept?: string;
}>();
</script>

<template>
  <div class="outer">
    <div class="inner">
      <div class="label">
        {{ label }}
      </div>

      <label>
        <input
          :id="id"
          :name="name"
          type="file"
          :accept="accept"
        >
        <Icon class="icon" name="my-icon:icon-upload-image" />
        <span>+ Upload Image</span>
      </label>

      <p class="instructions">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* base containers */

.outer {
  container-type: inline-size;
}

.inner {
  --input-size: var(--input-size-image-upload-sm);
  display: grid;
  gap: var(--space-200);
}

.instructions {
  margin-block-start: var(--space-100);
  font-size: var(--fs-200);
}

label {
  cursor: pointer;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-100);

  aspect-ratio: 1 / 1;
  inline-size: var(--input-size);
  block-size: auto;
  background-color: var(--color-input-image-background);
  border-radius: var(--br-500);

  color: var(--color-input-image-text);
  font-weight: var(--fw-semibold);
}

input[type="file"] {
  cursor: pointer;
  position: absolute;
  opacity: 0;
  inset: 0;
}

.icon {
  block-size: var(--icon-size-lg);
  inline-size: var(--icon-size-lg);
}

label:has(input:focus-visible) {
  outline: none;
  border: var(--border-width) solid var(--color-input-active);
  box-shadow: var(--shadow-input-field);
}

/* container queries */

@container (min-width: 37.25rem) {
  .inner {
    --input-size: var(--input-size-image-upload-lg);
    grid-template-columns: minmax(auto, var(--input-size-label-inline-max)) var(--input-size) 1fr;
    align-items: center;
  }

  .instructions {
    margin-block-start: 0;
    margin-inline-start: var(--space-100);
  }
}
</style>
