<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  inline-size: 100%;
  border-radius: var(--br-400);
  background-color: var(--color-background-button);
  color: var(--color-text-button);
  padding: var(--space-200) var(--space-300);
}

button:hover,
button:focus-visible {
  background-color: var(--color-background-button-active);
}

button:focus-visible {
  outline-offset: 2px;
  outline: 2px dashed var(--color-background-button-active);
}
</style>
