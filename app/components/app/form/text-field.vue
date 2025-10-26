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
  --icon-size: 16px;
  display: grid;
  grid-template-areas:
    "label"
    "input"
    "error";
  align-items: center;
  gap: var(--space-100);
}

/* base elements */

label {
  grid-area: label;
  font-size: var(--fs-200);
}

input {
  grid-area: input;
  padding: var(--padding);
  border-radius: var(--br-400);
  border: 1px solid var(--color-input-border);
  color: hsl(var(--color-grey-900));
}

input::placeholder {
  color: hsl(var(--color-grey-900) / 0.5);
}

/* icon element */

.icon {
  grid-area: input;
  pointer-events: none;
  margin-inline-start: var(--padding);
  margin-inline-end: auto;
  display: grid;
  align-items: center;
}

input:has(+ .icon) {
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
  border: 1px solid var(--color-input-active);
  box-shadow: var(--shadow-input-field);
}

input[aria-invalid="true"]:not(:focus):not(:hover),
input:not(:placeholder-shown):not(:focus):user-invalid {
  border: 1px solid var(--color-input-error);
}

label:has(+ input[aria-invalid="true"]) {
  color: var(--color-input-error);
}

/* container queries */

@container (width > 340px) {
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

@container (width > 560px) {
  .inner {
    grid-template-areas: "label input";
    column-gap: var(--space-200);
    grid-template-columns: minmax(auto, 240px) 1fr;
  }

  label {
    font-size: var(--fs-400);
  }
}
</style>
