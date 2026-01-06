<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  alias: ["/editor"],
  layout: "editor",
});

const toast = useToast();

function handleSave() {
  toast.add({
    title: "Your changes have been successfully saved!",
    icon: "i-custom-icon-changes-saved",
    color: "success",
    // close: false,
    // progress: false,
  });
}
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

      <div>
        <p>Edit the links here</p>
      </div>

      <template #footer>
        <div class="text-right">
          <UButton
            label="Save"
            class="w-full justify-center sm:w-auto"
            @click="handleSave"
          />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
