<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import { FetchError } from "ofetch";
import * as z from "zod";

definePageMeta({
  middleware: ["guest"],
});

const schema = z.object({
  email: z.string("Can't be empty").check(z.email("Invalid email")),
  password: z.string("Can't be empty").min(8, { message: "Must be at least 8 characters" }),
  passwordConfirm: z.string("Can't be empty"),
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});
;

// password: z.string({ message: "Can't be empty" })
//   .trim()
//   .nonempty({ message: "Can't be empty" })
//   .min(8, { message: "Must be at least 8 characters" }),

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
});

const { fetch, loggedIn } = useUserSession();
const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch("/auth/register", {
      method: "POST",
      body: event.data,
    });
    fetch();
    toast.add({ title: "Registration Success", description: "Thank you for registering!", color: "success" });
  }
  catch (error) {
    if (error instanceof FetchError) {
      toast.add({ title: "Error Registering", description: error.data.message, color: "error" });
    }
    else {
      toast.add({ title: "Error Registering", description: "There was an issue.", color: "error" });
    }
  }
}

watch(loggedIn, () => {
  if (loggedIn.value)
    navigateTo("/editor");
});
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
        Create account
      </h1>
      <p>Let’s get you started sharing your links!</p>
    </template>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-6"
      novalidate
      @submit.prevent="onSubmit"
    >
      <UFormField label="Email address" name="email">
        <!-- <UIcon name="i-lucide-mail" /> -->
        <UInput
          v-model="state.email"
          icon="i-custom-icon-email"
          type="email"
          placeholder="e.g. alex@email.com"
          autocomplete="email"
        />
      </UFormField>

      <UFormField label="Create password" name="password">
        <UInput
          v-model="state.password"
          icon="i-custom-icon-password"
          type="password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
        />
      </UFormField>

      <UFormField
        label="Confirm password"
        name="passwordConfirm"
        help="Password must contain at least 8 characters"
      >
        <UInput
          v-model="state.passwordConfirm"
          icon="i-custom-icon-password"
          type="password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
        />
      </UFormField>

      <UButton
        type="submit"
        label="Create new account"
        block
      />
    </UForm>

    <template #footer>
      <p class="text-center text-balance px-4">
        Already have an account? <ULink to="/" class="text-primary">
          Login
        </ULink>
      </p>
    </template>
  </UCard>
</template>
