<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();
</script>

<template>
  <NuxtLayout>
    <div>
      <h1>{{ error.statusCode }}</h1>
      <p>Oops, something went wrong!</p>
      <NuxtLink to="/">
        Go back home
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<style scoped>
div {
  text-align: center;
}

div > * + * {
  margin-block-start: var(--space-200);
}

a {
  display: inline-block;
}

h1 {
  font-size: var(--fs-600);
  font-weight: var(--fw-bold);
}

@media (min-width: 29rem) {
  h1 {
    font-size: var(--fs-800);
  }
}
</style>
