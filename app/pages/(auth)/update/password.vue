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
  currentPassword: z.string("Can't be empty").min(1, { message: "Current password is required" }),
  newPassword: z.string("Can't be empty").min(8, { message: "Must be at least 8 characters" }),
  newPasswordConfirm: z.string("Can't be empty").min(8, { message: "Must be at least 8 characters" }),
}).refine(data => data.newPassword === data.newPasswordConfirm, {
  message: "Passwords don't match",
  path: ["newPasswordConfirm"],
});

type Schema = z.output<typeof schema>;

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showNewPasswordConfirm = ref(false);

const { fetch, user } = useUserSession();
const toast = useToast();

const state = reactive<Partial<Schema>>({
  currentPassword: undefined,
  newPassword: undefined,
  newPasswordConfirm: undefined,
});

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  if (!user.value) {
    toast.add({ title: "Error Updating", description: "User not logged in.", color: "error" });
    return;
  }

  try {
    await $fetch(`/api/user/${user.value.id}/update/password`, {
      method: "PATCH",
      body: payload.data,
    });
    await fetch();
    await navigateTo("/editor");
    toast.add({ title: "Success", description: "Your login password was updated!", color: "success" });
  }
  catch (error) {
    if (error instanceof FetchError) {
      toast.add({ title: "Error Updating", description: error.statusText, color: "error" });
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
      :schema
      :state
      class="space-y-6"
      novalidate
      @submit.prevent="onSubmit"
    >
      <fieldset class="space-y-6">
        <UFormField
          label="Current password"
          name="currentPassword"
          :ui="{ error: 'sm:mr-12' }"
        >
          <UInput
            v-model="state.currentPassword"
            icon="i-custom-icon-password"
            :type="showCurrentPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-3' }"
            placeholder="At least 8 characters"
            autocomplete="current-password"
            required
            autofocus
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showCurrentPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showCurrentPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showCurrentPassword"
                aria-controls="password"
                @click="showCurrentPassword = !showCurrentPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField
          label="New password"
          name="newPassword"
          :ui="{ error: 'sm:mr-12' }"
        >
          <UInput
            v-model="state.newPassword"
            icon="i-custom-icon-password"
            :type="showNewPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-3' }"
            placeholder="At least 8 characters"
            autocomplete="new-password"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showNewPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showNewPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showNewPassword"
                aria-controls="password"
                @click="showNewPassword = !showNewPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField
          label="Confirm new password"
          name="newPasswordConfirm"
          help="Password must contain at least 8 characters"
          :ui="{ error: 'sm:mr-12' }"
        >
          <UInput
            v-model="state.newPasswordConfirm"
            icon="i-custom-icon-password"
            :type="showNewPasswordConfirm ? 'text' : 'password'"
            :ui="{ trailing: 'pe-3' }"
            placeholder="At least 8 characters"
            autocomplete="new-password"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showNewPasswordConfirm ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showNewPasswordConfirm ? 'Hide password' : 'Show password'"
                :aria-pressed="showNewPasswordConfirm"
                aria-controls="password"
                @click="showNewPasswordConfirm = !showNewPasswordConfirm"
              />
            </template>
          </UInput>
        </UFormField>
      </fieldset>

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
