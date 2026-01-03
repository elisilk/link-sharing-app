<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "preview",
});
</script>

<template>
  <UContainer>
    <UCard class="mt-4  mx-auto">
      <template #header>
        <h1 class="text-5xl font-bold">
          Preview
        </h1>
      </template>
    </UCard>
  </UContainer>
</template>
