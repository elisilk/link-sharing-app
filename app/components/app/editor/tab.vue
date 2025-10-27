<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>

<template>
  <NuxtLink :to="to" class="tab">
    <span class="icon">
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
  color: hsl(var(--color-grey-500));
  font-weight: var(--fw-semibold);
}

.tab.router-link-active {
  background-color: hsl(var(--color-grey-100));
  color: hsl(var(--color-purple-600));
}

.tab:hover,
.tab:focus-visible {
  color: hsl(var(--color-purple-600));
  border: 0;
}

.tab:focus-visible {
  outline-offset: -2px;
  outline: 2px dashed hsl(var(--color-purple-600));
}

.text {
  display: none;
}

.icon {
  block-size: 20px;
  inline-size: 20px;
}

.icon > * {
  block-size: 100%;
  inline-size: 100%;
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .tab {
    padding-inline: var(--space-300);
  }

  .text {
    display: block;
  }
}
</style>
