<script setup lang="ts">
const toast = useToast();

function handleShareLink() {
  toast.add({ title: "Copied", description: "The link has been copied to your clipboard!", color: "success" });
}
</script>

<template>
  <UApp>
    <UHeader
      :ui="{
        toggle: 'hidden',
        root: 'border-0',
      }"
    >
      <template #left>
        <UButton
          to="/editor"
          label="Back to Editor"
          variant="outline"
        />
      </template>
      <template #right>
        <UButton label="Share Link" @click="handleShareLink" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>
  </UApp>
</template>
