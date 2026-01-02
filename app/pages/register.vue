<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useField, useForm } from "vee-validate";
import * as z from "zod";

definePageMeta({
  middleware: ["guest"],
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
      .nonempty({ message: "Can't be empty" })
      .min(8, { message: "Must be at least 8 characters" }),
    passwordConfirm: z.string({ message: "Can't be empty" })
      .trim()
      .nonempty({ message: "Can't be empty" })
      .min(8, { message: "Must be at least 8 characters" }),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  // validateOnChange: false,
});

const { value: email, errorMessage: emailFieldError, meta: emailFieldMeta } = useField("email");
const { value: password, errorMessage: passwordFieldError, meta: passwordFieldMeta } = useField("password");
const { value: passwordConfirm, errorMessage: passwordConfirmFieldError, meta: passwordConfirmFieldMeta } = useField("passwordConfirm");

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch("/auth/register", {
      method: "POST",
      body: values,
    });
    fetch();
  }
  catch (error) {
    if (error instanceof FetchError) {
      console.error("Fetch error registering:", error.data.message);
    }
    else {
      console.error("Uknown error registering:", error);
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
          Create account
        </h1>

        <p>Let’s get you started sharing your links!</p>

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
            <label for="password">Create password</label>
            <!-- <Icon name="tabler:lock-password" /> -->
            <input
              id="password"
              v-model="password"
              type="password"
              class="input w-full"
              placeholder="At least 8 characters"
              autocomplete="new-password"
            >
            <span v-if="passwordFieldError && passwordFieldMeta.dirty">
              {{ passwordFieldError }}
            </span>
          </div>

          <div class="grid gap-2">
            <label for="passwordConfirm">Confirm password</label>
            <!-- <Icon name="tabler:lock-password" /> -->
            <input
              id="passwordConfirm"
              v-model="passwordConfirm"
              type="password"
              class="input w-full"
              placeholder="At least 8 characters"
              autocomplete="new-password"
            >
            <span v-if="passwordConfirmFieldError && passwordConfirmFieldMeta.dirty">
              {{ passwordConfirmFieldError }}
            </span>
          </div>

          <p>Password must contain at least 8 characters</p>

          <button class="btn btn-primary">
            Create new account
          </button>
        </form>

        <p>
          Already have an account? <NuxtLink to="/" class="link link-primary link-hover">
            Login
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
