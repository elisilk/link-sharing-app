<script setup lang="ts">
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

definePageMeta({
  middleware: ["auth"],
  alias: ["/editor"],
  layout: "editor",
});

const toast = useToast();
const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");

const orderedLinks = computed(() => profile.value?.links ? [...profile.value?.links].sort((a, b) => a.order - b.order) : []);

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
  <UForm
    v-if="profile"
    class="h-full"
    @submit="handleSave"
  >
    <UCard
      class="h-full flex flex-col"
      :ui="{
        root: 'bg-default text-default rounded-xl',
        header: 'border-b-0',
        body: 'flex-1 space-y-6',
      }"
      variant="soft"
    >
      <template #header>
        <h1 class="text-5xl font-bold">
          Customize your links
        </h1>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
      </template>

      <UButton
        variant="outline"
        label="+ Add new link"
        class="w-full justify-center mb-6"
      />

      <div v-if="orderedLinks.length === 0" class="text-center p-6 rounded-xl bg-gray-50 min-h-119.75 grid content-center justify-items-center">
        <img
          src="/illustration-empty.svg"
          alt="Empty set of links"
          width="250"
          height="161"
          class="mx-auto mb-10"
        >
        <h2>Let’s get you started</h2>
        <p class="mt-6 max-w-122">
          Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!
        </p>
      </div>

      <div
        v-for="(link, index) in orderedLinks"
        :key="link.id"
        class="bg-gray-50 rounded-xl p-4 sm:p-6"
      >
        <div class="flex">
          <UButton variant="ghost">
            <UIcon name="i-custom-icon-drag-and-drop" />
          </UButton>
          <p>Link #{{ index + 1 }}</p>
          <UButton variant="ghost" class="ms-auto">
            Remove
          </UButton>
        </div>

        <UFormField label="Platform" name="platform">
          <UInput
            v-model="link.platform"
            class="w-full"
            required
          />
        </UFormField>

        <UFormField label="Link" name="url">
          <UInput
            v-model="link.url"
            class="w-full"
            required
          />
        </UFormField>
      </div>

      <!-- <pre>{{ orderedLinks }}</pre> -->

      <template #footer>
        <div class="text-right">
          <UButton
            type="submit"
            label="Save"
            class="w-full justify-center sm:w-auto"
          />
        </div>
      </template>
    </UCard>
  </UForm>
</template>
