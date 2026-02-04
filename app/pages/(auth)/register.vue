<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import { FetchError } from "ofetch";
import * as z from "zod";

definePageMeta({
  middleware: ["guest"],
});

useSeoMeta({
  title: "Create a new account",
  ogTitle: "devlinks - Create a new account",
});

// const fields: AuthFormField[] = [{
//   name: "email",
//   type: "email",
//   icon: "i-custom-icon-email",
//   label: "Email address",
//   placeholder: "e.g. alex@email.com",
//   autocomplete: "email",
//   autofocus: true,
// }, {
//   name: "password",
//   type: "password",
//   icon: "i-custom-icon-password",
//   label: "Create password",
//   placeholder: "At least 8 characters",
//   autocomplete: "new-password",
// }, {
//   name: "passwordConfirm",
//   type: "password",
//   icon: "i-custom-icon-password",
//   label: "Confirm password",
//   placeholder: "At least 8 characters",
//   help: "Password must contain at least 8 characters",
//   autocomplete: "new-password",
// }];

const schema = z.object({
  email: z.string("Can't be empty").trim().check(z.email("Invalid email")),
  password: z.string("Please check again").min(8, { message: "Must be at least 8 characters" }),
  passwordConfirm: z.string("Please check again").min(8, { message: "Must be at least 8 characters" }),
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
});

const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const { fetch, loggedIn } = useUserSession();
const toast = useToast();

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    await $fetch("/auth/register", {
      method: "POST",
      body: payload.data,
    });
    await fetch();
    toast.add({ title: "Registration Success", description: "Thank you for registering!", color: "success" });
  }
  catch (error) {
    if (error instanceof FetchError) {
      toast.add({ title: "Error Registering", description: error.statusText, color: "error" });
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
      :schema
      :state
      class="space-y-6"
      novalidate
      @submit.prevent="onSubmit"
    >
      <fieldset class="space-y-6">
        <UFormField label="Email address" name="email">
          <UInput
            v-model="state.email"
            icon="i-custom-icon-email"
            type="email"
            placeholder="e.g. alex@email.com"
            autocomplete="email"
            autofocus
          />
        </UFormField>

        <UFormField
          label="Create password"
          name="password"
          :ui="{ error: 'sm:mr-12' }"
        >
          <UInput
            v-model="state.password"
            icon="i-custom-icon-password"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-3' }"
            placeholder="At least 8 characters"
            autocomplete="new-password"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField
          label="Confirm password"
          name="passwordConfirm"
          :ui="{ error: 'sm:mr-12' }"
        >
          <UInput
            v-model="state.passwordConfirm"
            icon="i-custom-icon-password"
            :type="showPasswordConfirm ? 'text' : 'password'"
            :ui="{ trailing: 'pe-3' }"
            placeholder="At least 8 characters"
            autocomplete="new-password"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPasswordConfirm ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPasswordConfirm ? 'Hide password' : 'Show password'"
                :aria-pressed="showPasswordConfirm"
                aria-controls="password"
                @click="showPasswordConfirm = !showPasswordConfirm"
              />
            </template>
          </UInput>
          <template #help>
            Password must contain at least 8 characters
          </template>
        </UFormField>
      </fieldset>

      <UButton
        type="submit"
        label="Create new account"
        block
      />
    </UForm>

    <template #footer>
      <p class="text-center text-balance px-4">
        Already have an account?
        <ULink to="/" class="text-primary">
          Login
        </ULink>
      </p>
    </template>
  </UCard>
</template>
