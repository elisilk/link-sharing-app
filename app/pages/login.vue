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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch("/auth/login", {
      method: "POST",
      body: event.data,
    });
    fetch();
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
  <UCard class="mt-4 max-w-md mx-auto">
    <template #header>
      <h1 class="text-5xl font-bold">
        Login
      </h1>
      <p>Add your details below to get back into the app</p>
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

      <UFormField label="Password" name="password">
        <!-- <UIcon name="i-lucide-lock-keyhole" /> -->
        <UInput
          v-model="state.password"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
          class="w-full"
        />
      </UFormField>

      <UButton type="submit" block>
        Login
      </UButton>
    </UForm>

    <template #footer>
      <p class="text-center">
        Don’t have an account? <ULink to="/register" class="text-primary">
          Create account
        </ULink>
      </p>
    </template>
  </UCard>
</template>
