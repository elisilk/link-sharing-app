<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import { FetchError } from "ofetch";
import * as z from "zod";

definePageMeta({
  middleware: ["auth"],
});

useSeoMeta({
  title: "Update login password",
  ogTitle: "devlinks - Update login password",
});

const schema = z.object({
  currentPassword: z.string("Current password is required"),
  newPassword: z.string("Can't be empty").min(8, { message: "Must be at least 8 characters" }),
  newPasswordConfirm: z.string("Can't be empty").min(8, { message: "Must be at least 8 characters" }),
}).refine(data => data.newPassword === data.newPasswordConfirm, {
  message: "Passwords don't match",
  path: ["newPasswordConfirm"],
});

type Schema = z.output<typeof schema>;

const { fetch, user } = useUserSession();
const toast = useToast();

const state = reactive<Partial<Schema>>({
  currentPassword: undefined,
  newPassword: undefined,
  newPasswordConfirm: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!user.value) {
    toast.add({ title: "Error Updating", description: "User not logged in.", color: "error" });
    return;
  }

  try {
    await $fetch(`/api/user/${user.value.id}/update/password`, {
      method: "PATCH",
      body: event.data,
    });
    await fetch();
    await navigateTo("/editor");
    toast.add({ title: "Success", description: "Your login password was updated!", color: "success" });
  }
  catch (error) {
    if (error instanceof FetchError) {
      toast.add({ title: "Error Updating", description: error.data.message, color: "error" });
    }
    else {
      toast.add({ title: "Error Updating", description: "There was an issue.", color: "error" });
    }
  }
}
</script>

<template>
  <UCard
    variant="soft"
    class="bg-white divide-y-0"
    :ui="{
      root: 'sm:p-10 rounded-xl',
      header: 'p-0 sm:px-0',
      body: 'p-0 mt-10 mb-6 sm:p-0',
      footer: 'p-0 sm:px-0',
    }"
  >
    <template #header>
      <h1 class="mb-2 text-gray-900 font-bold text-2xl sm:text-[2rem]">
        Update login password
      </h1>
      <p>Update the password used to login to the app</p>
    </template>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-6"
      novalidate
      @submit.prevent="onSubmit"
    >
      <UFormField label="Current password" name="currentPassword">
        <UInput
          v-model="state.currentPassword"
          icon="i-custom-icon-password"
          type="password"
          placeholder="At least 8 characters"
          autocomplete="current-password"
          required
          autofocus
        />
      </UFormField>

      <UFormField label="New password" name="newPassword">
        <UInput
          v-model="state.newPassword"
          icon="i-custom-icon-password"
          type="password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
        />
      </UFormField>

      <UFormField
        label="Confirm new password"
        name="newPasswordConfirm"
        help="Password must contain at least 8 characters"
      >
        <UInput
          v-model="state.newPasswordConfirm"
          icon="i-custom-icon-password"
          type="password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
        />
      </UFormField>

      <UButton
        type="submit"
        label="Update your account"
        block
      />
    </UForm>

    <template #footer>
      <p class="text-center text-balance px-4">
        Changed your mind?
        <ULink to="/editor" class="text-primary">
          Return to the editor
        </ULink>
      </p>
    </template>
  </UCard>
</template>
