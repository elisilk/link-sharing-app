<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import { FetchError } from "ofetch";
import * as z from "zod";

definePageMeta({
  middleware: ["guest"],
  alias: ["/"],
});

const schema = z.object({
  email: z.string("Can't be empty").check(z.email("Invalid email")),
  password: z.string("Password is required"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const { fetch, loggedIn } = useUserSession();
const toast = useToast();

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch("/auth/login", {
      method: "POST",
      body: event.data,
    });
    await fetch();
    toast.add({ title: "Login Success", description: "Welcome back!", color: "success" });
  }
  catch (error) {
    if (error instanceof FetchError) {
      toast.add({ title: "Error Logging In", description: error.data.message, color: "error" });
    }
    else {
      toast.add({ title: "Error Logging In", description: "There was an issue.", color: "error" });
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
        Login
      </h1>
      <p>Add your details below to get back into the app</p>
    </template>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-6"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <UFormField label="Email address" name="email">
        <UInput
          v-model="state.email"
          icon="i-custom-icon-email"
          type="email"
          placeholder="e.g. alex@email.com"
          autocomplete="email"
        />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          v-model="state.password"
          icon="i-custom-icon-password"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
        />
      </UFormField>

      <UButton
        type="submit"
        label="Login"
        block
      />
    </UForm>

    <template #footer>
      <p class="text-center text-balance px-4">
        Don’t have an account? <ULink to="/register" class="text-primary">
          Create account
        </ULink>
      </p>
    </template>
  </UCard>
</template>
