<script setup lang="ts">
import { authClient } from "~~/server/utils/auth-client";

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const errorMessage = ref("");

async function handleRegister() {
  if (password.value === "" || passwordConfirm.value === "") {
    console.error("Form not valid. Try again.");
    return;
  }

  if (password.value !== passwordConfirm.value) {
    console.error("Passwords DON'T match. Try again.");
    return;
  }

  // console.log("Passwords DO match, so good to go!");

  authStore.loading = true;

  try {
    const { data, error } = await authClient.signUp.email({
      name: "Jay Doe", // required
      email: email.value, // required
      password: password.value, // required
      callbackURL: "/",
    });

    if (error) {
      console.error("signup error:", error);
    }

    console.warn("signup successful", data);
  }
  catch (error) {
    console.error("signup error:", error);
  }
  authStore.loading = false;
}
</script>

<template>
  <div class="hero bg-base-200 container mx-auto mt-4">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Create account
        </h1>

        <p>Let’s get you started sharing your links!</p>

        <form novalidate @submit.prevent="handleRegister">
          <!-- email address -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-left">
              Email address
            </legend>
            <label class="input validator w-full">
              <Icon name="tabler:mail" />
              <input
                id="email"
                v-model="email"
                type="email"
                class="input"
                placeholder="e.g. alex@email.com"
                autocomplete="email"
                required
              >
            </label>
            <div class="validator-hint hidden">
              Enter valid email address
            </div>
          </fieldset>

          <!-- create password -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-left">
              Create password
            </legend>
            <label class="input validator w-full">
              <Icon name="tabler:lock-password" />
              <input
                id="password"
                v-model="password"
                type="password"
                class="input"
                placeholder="At least 8 characters"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                autocomplete="new-password"
                required
              >
            </label>
            <div class="validator-hint hidden">
              Must be more than 8 characters, including
              <br>At least one number <br>At least one lowercase letter <br>At least one uppercase letter
            </div>
          </fieldset>

          <!-- confirm password -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-left">
              Confirm password
            </legend>
            <label class="input validator w-full">
              <Icon name="tabler:lock-password" />
              <input
                id="passwordConfirm"
                v-model="passwordConfirm"
                type="password"
                class="input w-full"
                placeholder="At least 8 characters"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                autocomplete="new-password"
                required
              >
            </label>
            <div class="validator-hint hidden">
              Password must contain at least 8 characters
            </div>
          </fieldset>

          <!-- submit -->
          <button
            type="submit"
            :disabled="authStore.loading"
            class="btn btn-primary w-full"
          >
            <span
              v-if="authStore.loading"
              class="loading loading-spinner loading-md"
            />
            <span v-else>Create new account</span>
          </button>

          <!-- error message -->
          <p v-if="errorMessage">
            {{ errorMessage }}
          </p>
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
