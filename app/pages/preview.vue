<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "preview",
});
</script>

<template>
  <div class="container mx-auto mt-4 flex justify-center">
    <h1 class="sr-only">
      Preview
    </h1>

    <div class="mockup-phone">
      <div class="mockup-phone-camera" />
      <div class="mockup-phone-display text-white grid place-content-center bg-neutral-900">
        It's Glowtime.
      </div>
    </div>
  </div>
</template>
