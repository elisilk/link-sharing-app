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
  <UCard class="mt-4 max-w-md mx-auto">
    <template #header>
      <h1 class="text-5xl font-bold">
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
          placeholder="e.g. alex@email.com"
          autocomplete="email"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Create password" name="password">
        <!-- <UIcon name="i-lucide-lock-keyhole" /> -->
        <UInput
          v-model="state.password"
          type="password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Confirm password" name="passwordConfirm">
        <!-- <UIcon name="i-lucide-lock-keyhole" /> -->
        <UInput
          v-model="state.passwordConfirm"
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
