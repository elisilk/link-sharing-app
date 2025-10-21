<script setup lang="ts">
definePageMeta({
  layout: "preview",
});
</script>

<template>
  <div class="container">
    <img
      src="/illustration-phone-mockup.svg"
      alt="Illustration phone mockup"
      width="308"
      height="632"
    >
  </div>
</template>

<style scoped>
/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .container {
    background-color: hsl(var(--color-white));
    border-radius: var(--br-600);
    padding: var(--space-600) var(--space-700);
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  }
}
</style>
