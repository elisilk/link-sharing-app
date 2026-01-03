<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "editor",
});
</script>

<template>
  <UContainer>
    <UCard class="mt-4  mx-auto">
      <template #header>
        <h1 class="text-5xl font-bold">
          Profile Details
        </h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </template>
    </UCard>
  </UContainer>
</template>
