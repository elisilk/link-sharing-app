<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  alias: ["/editor"],
  layout: "editor",
});

const toast = useToast();
const { profile, pending, error } = await useProfile();

const orderedLinks = computed(() => profile.value?.links ? [...profile.value?.links].sort((a, b) => a.order - b.order) : []);

watchEffect(() => {
  if (error.value) {
    throw createError({ ...error.value, fatal: true });
  }
});

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
    <div v-if="pending">
      <p>Loading ...</p>
    </div>

    <div v-else-if="error">
      <p>Profile not found</p>
      <p>Error: {{ error.message }}</p>
    </div>

    <UPage
      v-else-if="profile"
      :ui="{
        left: 'lg:col-span-4',
        center: 'lg:col-span-6',
      }"
    >
      <template #left>
        <UPageAside>
          <AppPreviewContent :profile />
        </UPageAside>
      </template>

      <UPageBody>
        <UForm @submit="handleSave">
          <UCard>
            <template #header>
              <h1 class="text-5xl font-bold">
                Customize your links
              </h1>
              <p>Add/edit/remove links below and then share all your profiles with the world!</p>
            </template>

            <UButton
              variant="outline"
              label="+ Add new link"
              class="w-full justify-center"
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

            <div v-for="(link, index) in orderedLinks" :key="link.id">
              <UFieldGroup orientation="vertical">
                <UButton>
                  <UIcon name="i-custom-icon-drag-and-drop" />
                </UButton>
                <p>Link #{{ index + 1 }}</p>
                <UButton>Remove</UButton>

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
              </UFieldGroup>
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
      </UPageBody>
    </UPage>
  </UContainer>
</template>
