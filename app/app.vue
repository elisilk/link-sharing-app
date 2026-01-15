<script setup lang="ts">
onMounted(() => {
  document.body.classList.add("sm:bg-gray-50");
});
</script>

<template>
  <UApp
    :toaster="{
      position: 'bottom-center',
      duration: 3000,
    }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
