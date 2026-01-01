<script setup lang="ts">
const authStore = useAuthStore();

onMounted(() => {
  setTimeout(() => {
    authStore.signOut();
    navigateTo("/");
  }, 2000);
});
</script>

<template>
  <div class="card bg-base-300 container mt-4 mx-auto min-h-72 text-center flex flex-col justify-center items-center gap-4">
    Signing out
    <span class="loading loading-spinner loading-xl" />
  </div>
</template>
