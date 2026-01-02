<script setup lang="ts">
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header>
      <AppPreviewNavBar />
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>
