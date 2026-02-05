<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import { FetchError } from "ofetch";
import * as z from "zod";

definePageMeta({
  middleware: ["guest"],
  alias: ["/"],
});

useSeoMeta({
  title: "Login - A link-sharing app for developers",
  ogTitle: "devlinks - Login - A link-sharing app for developers",
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
//   label: "Password",
//   placeholder: "Enter your password",
//   autocomplete: "current-password",
// }];

const schema = z.object({
  email: z.string("Can't be empty").trim().check(z.email("Invalid email")),
  password: z.string("Please check again").min(1, { message: "Please check again" }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const showPassword = ref(false);

const { fetch, loggedIn } = useUserSession();
const toast = useToast();

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    await $fetch("/auth/login", {
      method: "POST",
      body: payload.data,
    });
    await fetch();
    toast.add({ title: "Login Success", description: "Welcome back!", color: "success" });
  }
  catch (error) {
    if (error instanceof FetchError) {
      toast.add({ title: "Error Logging In", description: error.statusText, color: "error" });
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
      :schema
      :state
      class="space-y-6"
      novalidate
      @submit.prevent="onSubmit"
    >
      <fieldset class="space-y-6">
        <legend class="sr-only">
          Login credentials
        </legend>

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
          label="Password"
          name="password"
          :ui="{ error: 'sm:mr-12' }"
        >
          <UInput
            v-model="state.password"
            icon="i-custom-icon-password"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-3' }"
            placeholder="Enter your password"
            autocomplete="current-password"
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
      </fieldset>

      <UButton
        type="submit"
        label="Login"
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

  <!--

<UCard
    variant="soft"
    class="divide-y-0 bg-transparent sm:bg-white sm:rounded-xl sm:p-10"
    :ui="{
      body: 'p-0 sm:p-0',
    }"
  >
    <UAuthForm
      title="Login"
      description="Add your details below to get back into the app"
      :schema
      :fields
      :submit="{
        label: 'Login',
      }"
      :ui="{
        root: 'space-y-0',
        header: 'text-left mb-10 p-0 sm:px-0',
        title: 'mb-2 text-gray-900 font-bold text-2xl sm:text-[2rem]',
        form: 'space-y-6',
        footer: 'mt-6 p-0 sm:px-0',
      }"
      @submit="onSubmit"
    >
      <template #footer>
        <p class="text-center text-balance px-12">
          Don’t have an account?
          <ULink to="/register" class="text-primary">
            Create account
          </ULink>
        </p>
      </template>
    </UAuthForm>
  </UCard>
  -->
</template>
