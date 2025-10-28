<script setup lang="ts">
definePageMeta({
  layout: "preview",
});
</script>

<template>
  <main>
    <div class="inner">
      <img
        src="/illustration-phone-mockup.svg"
        alt="Illustration phone mockup"
        width="308"
        height="632"
      >
    </div>
  </main>
</template>

<style scoped>
main {
  margin-inline: auto;
  margin-block: var(--space-300);
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .inner {
    background-color: hsl(var(--color-white));
    border-radius: var(--br-600);
    padding: var(--space-600) var(--space-700);
    box-shadow: var(--shadow-preview);
  }
}
</style>
