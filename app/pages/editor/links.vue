<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  alias: ["/editor/"],
  layout: "editor",
});
</script>

<template>
  <div class="container mx-auto mt-4">
    <h1 class="text-3xl font-bold">
      Customize your links
    </h1>
    <p>Add/edit/remove links below and then share all your profiles with the world!</p>
  </div>
</template>
