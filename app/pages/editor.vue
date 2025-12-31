<script setup lang="ts">
definePageMeta({
  layout: "editor",
});
</script>

<template>
  <div class="container mx-auto mt-4">
    <h1 class="sr-only">
      Editor
    </h1>

    <div class="tabs tabs-lift">
      <label class="tab flex align-middle gap-1">
        <input
          type="radio"
          name="editor_tabs"
          checked
        >
        <Icon name="tabler:link" size="18" />
        Links
      </label>
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <h2 class="text-3xl font-bold">
          Customize your links
        </h2>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
      </div>

      <label class="tab flex align-middle gap-1">
        <input type="radio" name="editor_tabs">
        <Icon name="tabler:user-circle" size="18" />
        Profile Details
      </label>
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <h2 class="text-3xl font-bold">
          Profile Details
        </h2>
        <p>Add your details to create a personal touch to your profile.</p>
      </div>
    </div>
  </div>
</template>
