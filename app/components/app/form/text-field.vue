<script setup lang="ts">
const props = defineProps<{
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  autocomplete?: string;
  pattern?: string;
  required?: boolean;
}>();

const isInvalid = ref(false);
const errorMessage = ref("Can’t be empty");
</script>

<template>
  <div class="outer">
    <div class="inner">
      <label :for="id">{{ label }}{{ props.required ? "*" : null }}</label>
      <input
        :id="id"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :pattern="pattern"
        :required="required"
        :aria-invalid="isInvalid ? true : undefined"
        :aria-errormessage="isInvalid ? `${id}-error` : undefined"
      >
      <span v-if="$slots.icon" class="icon">
        <slot name="icon" />
      </span>
      <span
        v-if="isInvalid"
        :id="`${id}-error`"
        class="error"
        aria-live="polite"
      >{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
/* base containers */

.outer {
  container-type: inline-size;
}

.inner {
  --padding: var(--space-200);
  --icon-size: var(--icon-size-sm);
  display: grid;
  grid-template-areas:
    "label"
    "input"
    "error";
  align-items: center;
  gap: var(--space-100);
}

.inner > * {
  grid-area: input;
}

.inner > label {
  grid-area: label;
}

/* base elements */

label {
  font-size: var(--fs-200);
}

input {
  padding: var(--padding);
  border-radius: var(--br-400);
  border: var(--border-width) solid var(--color-input-border);
  color: hsl(var(--color-grey-900));
}

input::placeholder {
  color: hsl(var(--color-grey-900) / 0.5);
}

/* icon element */

.icon {
  pointer-events: none;
  margin-inline-start: var(--padding);
  margin-inline-end: auto;
  display: grid;
  align-items: center;
}

input:has(~ .icon) {
  padding-inline-start: calc(var(--icon-size) + 2 * var(--padding));
}

/* error states */

.error {
  grid-area: error;
  margin-inline-start: auto;
  color: var(--color-input-error);
  font-size: var(--fs-200);
}

input:hover,
input:focus-visible {
  outline: none;
  border: var(--border-width) solid var(--color-input-active);
  box-shadow: var(--shadow-input-field);
}

input[aria-invalid="true"]:not(:focus):not(:hover),
input:not(:placeholder-shown):not(:focus):user-invalid {
  border: var(--border-width) solid var(--color-input-error);
}

label:has(+ input[aria-invalid="true"]) {
  color: var(--color-input-error);
}

/* container queries */

@container (min-width: 25rem) {
  .inner {
    grid-template-areas:
      "label"
      "input";
  }

  .error {
    grid-area: input;
    pointer-events: none;
    margin-inline-end: var(--padding);
    background-color: hsl(var(--color-white));
  }
}

@container (min-width: 37.25rem) {
  .inner {
    grid-template-areas: "label input";
    column-gap: var(--space-200);
    grid-template-columns: minmax(auto, var(--input-size-label-inline-max)) 1fr;
  }

  label {
    font-size: var(--fs-400);
  }
}
</style>
