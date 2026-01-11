<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import * as z from "zod";

definePageMeta({
  middleware: ["auth"],
  layout: "editor",
});

const toast = useToast();
const { user } = useUserSession();
const { profile, pending, error, refresh } = await useProfile();

const schema = z.object({
  firstName: z.string("Can't be empty"),
  lastName: z.string("Can't be empty"),
  email: z.string("Can't be empty").check(z.email("Invalid email")),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  firstName: profile.value?.firstName || undefined,
  lastName: profile.value?.lastName || undefined,
  email: profile.value?.email || undefined,
});

watchEffect(() => {
  if (error.value) {
    throw createError({ ...error.value, fatal: true });
  }
});

watch(
  profile,
  () => {
    if (profile) {
      state.firstName = profile.value?.firstName || undefined;
      state.lastName = profile.value?.lastName || undefined;
      state.email = profile.value?.email || undefined;
    }
  },
  { deep: true },
);

async function handleSave(event: FormSubmitEvent<Schema>) {
  // console.log(event.data);
  const { firstName, lastName, email } = event.data;

  try {
    const result = await $fetch(`/api/profile/${user.value?.id}`, {
      method: "PUT",
      body: { firstName, lastName, email },
    });
    if (result.success) {
      refresh();
      toast.add({
        title: "Your changes have been successfully saved!",
        icon: "i-custom-icon-changes-saved",
        color: "success",
      });
    }
    else {
      toast.add({
        title: "Something went wrong!",
        description: result.message,
        icon: "i-custom-icon-changes-saved",
        color: "error",
      });
    }
  }
  catch (error) {
    console.error(error);
    toast.add({
      title: "Error",
      description: "Something went wrong.",
      color: "error",
    });
  }
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
        <UForm
          :schema="schema"
          :state="state"
          @submit="handleSave"
        >
          <UCard>
            <template #header>
              <h1 class="text-5xl font-bold">
                Profile Details
              </h1>
              <p>Add your details to create a personal touch to your profile.</p>
            </template>

            <UFieldGroup orientation="vertical">
              <UFormField label="Profile picture" name="picture">
                <UFileUpload />
                <UIcon name="i-custom-icon-upload-image" />
                <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
              </UFormField>
            </UFieldGroup>

            <UFieldGroup orientation="vertical">
              <UFormField label="First name" name="firstName">
                <UInput
                  v-model="state.firstName"
                  placeholder="e.g. John"
                  autocomplete="given-name"
                  class="w-full"
                  required
                />
              </UFormField>

              <UFormField label="Last name" name="lastName">
                <UInput
                  v-model="state.lastName"
                  placeholder="e.g. Appleseed"
                  autocomplete="family-name"
                  class="w-full"
                  required
                />
              </UFormField>

              <UFormField label="Email" name="email">
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="e.g. email@example.com"
                  autocomplete="email"
                  class="w-full"
                />
              </UFormField>
            </UFieldGroup>

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
