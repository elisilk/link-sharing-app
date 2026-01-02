<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useField, useForm } from "vee-validate";
import * as z from "zod";

definePageMeta({
  middleware: ["guest"],
  alias: ["/"],
});

const { fetch, loggedIn } = useUserSession();

const schema = toTypedSchema(
  z.object({
    email: z.string({ message: "Can't be empty" })
      .trim()
      .nonempty({ message: "Can't be empty" })
      .check(z.email({ message: "Must be a valid email" })),
    password: z.string({ message: "Can't be empty" })
      .trim()
      .nonempty({ message: "Can't be empty" }),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  // validateOnChange: false,
});

const { value: email, errorMessage: emailFieldError, meta: emailFieldMeta } = useField("email");
const { value: password, errorMessage: passwordFieldError, meta: passwordFieldMeta } = useField("password");

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch("/auth/login", {
      method: "POST",
      body: values,
    });
    fetch();
  }
  catch (error) {
    if (error instanceof FetchError) {
      console.error("Fetch error logging in:", error.data.message);
    }
    else {
      console.error("Uknown error logging in:", error);
    }
  }
});

watch(loggedIn, () => {
  if (loggedIn.value)
    navigateTo("/editor");
});
</script>

<template>
  <div class="hero bg-base-200 container mx-auto mt-4">
    <div class="hero-content">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Login
        </h1>

        <p>Add your details below to get back into the app</p>

        <form
          novalidate
          class="grid gap-4"
          @submit="onSubmit"
        >
          <div class="grid gap-2">
            <label for="email">Email address</label>
            <!-- <Icon name="tabler:mail" /> -->
            <input
              id="email"
              v-model="email"
              type="email"
              class="input w-full"
              placeholder="e.g. alex@email.com"
              autocomplete="email"
            >
            <span v-if="emailFieldError && emailFieldMeta.dirty">
              {{ emailFieldError }}
            </span>
          </div>

          <div class="grid gap-2">
            <label for="password">Password</label>
            <!-- <Icon name="tabler:lock-password" /> -->
            <input
              id="password"
              v-model="password"
              type="password"
              class="input w-full"
              placeholder="Enter your password"
              autocomplete="current-password"
            >
            <span v-if="passwordFieldError && passwordFieldMeta.dirty">
              {{ passwordFieldError }}
            </span>
          </div>

          <button class="btn btn-primary">
            Login
          </button>
        </form>

        <p>
          Don’t have an account? <NuxtLink to="/register" class="link link-primary link-hover">
            Create account
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
