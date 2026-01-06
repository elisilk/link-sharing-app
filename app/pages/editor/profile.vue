<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
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
          Profile Details
        </h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </template>

      <div>
        <p>Edit your profile here</p>
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
