<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import { FetchError } from "ofetch";
import * as z from "zod";

definePageMeta({
  middleware: ["auth"],
});

useSeoMeta({
  title: "Update login email",
  ogTitle: "devlinks - Update login email",
});

const schema = z.object({
  currentEmail: z.string("Can't be empty").check(z.email("Invalid email")),
  newEmail: z.string("Can't be empty").check(z.email("Invalid email")),
});

type Schema = z.output<typeof schema>;

const { fetch, user } = useUserSession();
const toast = useToast();

const state = reactive<Partial<Schema>>({
  currentEmail: user.value?.email || undefined,
  newEmail: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!user.value) {
    toast.add({ title: "Error Updating", description: "User not logged in.", color: "error" });
    return;
  }

  try {
    await $fetch(`/api/user/${user.value.id}/update/email`, {
      method: "PATCH",
      body: event.data,
    });
    await fetch();
    await navigateTo("/editor");
    toast.add({ title: "Success", description: "Your login email was updated!", color: "success" });
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
        Update login email
      </h1>
      <p>Update the email used to login to the app (separate from the email shown in your shareable profile)</p>
    </template>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-6"
      novalidate
      @submit.prevent="onSubmit"
    >
      <UFormField label="Current email address" name="currentEmail">
        <UInput
          v-model="state.currentEmail"
          icon="i-custom-icon-email"
          type="email"
          placeholder="e.g. alex@email.com"
          disabled
          required
        />
      </UFormField>

      <UFormField label="New email address" name="newEmail">
        <UInput
          v-model="state.newEmail"
          icon="i-custom-icon-email"
          type="email"
          placeholder="e.g. alex@email.com"
          autocomplete="email"
          required
          autofocus
        />
      </UFormField>

      <UButton
        type="submit"
        label="Update your email"
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
