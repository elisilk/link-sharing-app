<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "preview",
});
</script>

<template>
  <UContainer class="py-4">
    <UCard class="mx-auto">
      <template #header>
        <h1 class="text-5xl font-bold">
          Preview
        </h1>
      </template>
    </UCard>
  </UContainer>
</template>
