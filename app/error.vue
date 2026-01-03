<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

// const route = useRoute();
// const error = route.query.error || "An uknown error occurred.";
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UContainer>
        <UError :error="error" />
      </UContainer>
    </NuxtLayout>
  </UApp>
</template>
