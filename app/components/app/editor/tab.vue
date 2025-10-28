<script setup lang="ts">
defineProps<{
  to: string;
  secondary?: true | undefined;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="tab"
    :class="{ secondary }"
  >
    <span v-if="$slots.icon" class="icon">
      <slot name="icon" />
    </span>
    <span class="text">
      <slot />
    </span>
  </NuxtLink>
</template>

<style scoped>
.tab {
  display: block;
  block-size: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-100);

  border-radius: var(--br-400);
  background-color: var(--color-tab-background);
  color: var(--color-tab-text);
  font-weight: var(--fw-semibold);
}

.tab.router-link-active {
  background-color: var(--color-tab-current-background);
  color: var(--color-tab-current-text);
}

.tab:hover,
.tab:focus-visible {
  color: var(--color-tab-active-text);
  border: 0;
}

.tab:focus-visible {
  outline-offset: calc(-1 * var(--outline-width));
  outline: var(--outline-width) dashed var(--color-tab-active-outline);
}

.text {
  display: none;
}

.icon {
  block-size: var(--icon-size-md);
  inline-size: var(--icon-size-md);
}

.icon > * {
  block-size: 100%;
  inline-size: 100%;
}

.tab.secondary {
  border: var(--border-width) solid var(--color-tab-secondary-border);
  background-color: transparent;
  color: var(--color-tab-secondary-text);
}

.tab.secondary:hover,
.tab.secondary:focus-visible {
  background-color: var(--color-tab-secondary-active-background);
}

.tab.secondary:focus-visible {
  outline-offset: var(--outline-width);
  outline: var(--outline-width) dashed var(--color-tab-secondary-active-outline);
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .tab {
    padding-inline: var(--space-300);
  }

  .text {
    display: block;
  }

  .tab.secondary .icon {
    display: none;
  }
}
</style>
