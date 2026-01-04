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
      <h1 class="text-5xl font-bold text-grey-900">
        Create account
      </h1>
      <p>Let’s get you started sharing your links!</p>
    </template>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="Email address" name="email">
        <!-- <UIcon name="i-lucide-mail" /> -->
        <UInput
          v-model="state.email"
          icon="i-custom-icon-email"
          placeholder="e.g. alex@email.com"
          autocomplete="email"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Create password" name="password">
        <UInput
          v-model="state.password"
          icon="i-custom-icon-password"
          type="password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Confirm password" name="passwordConfirm">
        <UInput
          v-model="state.passwordConfirm"
          icon="i-custom-icon-password"
          type="password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
          class="w-full"
        />
      </UFormField>

      <p>Password must contain at least 8 characters</p>

      <UButton type="submit" block>
        Create new account
      </UButton>
    </UForm>

    <template #footer>
      <p class="text-center">
        Already have an account? <ULink to="/" class="text-primary">
          Login
        </ULink>
      </p>
    </template>
  </UCard>
</template>
