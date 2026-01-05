<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  alias: ["/editor"],
  layout: "editor",
});
</script>

<template>
  <UContainer class="py-4">
    <UCard class="mx-auto">
      <template #header>
        <h1 class="text-5xl font-bold">
          Customize your links
        </h1>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
      </template>
    </UCard>
  </UContainer>
</template>
