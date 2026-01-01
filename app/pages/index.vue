<script setup lang="ts">
definePageMeta({
  alias: ["/sign-in"],
});

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

async function handleSignIn() {
  // validate form
  if (email.value.trim() === "" || password.value.trim() === "") {
    console.error("Form not valid. Try again.");
    return;
  }

  // form is valid form, so process it
  authStore.signIn(email.value, password.value);
}
</script>

<template>
  <div class="hero bg-base-200 container mx-auto mt-4">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Login
        </h1>

        <p>Add your details below to get back into the app</p>

        <form novalidate @submit.prevent="handleSignIn">
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
              Can't be empty
            </div>
          </fieldset>

          <!-- create password -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-left">
              Password
            </legend>
            <label class="input validator w-full">
              <Icon name="tabler:lock-password" />
              <input
                id="password"
                v-model="password"
                type="password"
                class="input"
                placeholder="Enter your password"
                autocomplete="new-password"
                required
              >
            </label>
            <div class="validator-hint hidden">
              Please check again
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
            <span v-else>Login</span>
          </button>

          <!-- error message -->
          <p v-if="errorMessage">
            {{ errorMessage }}
          </p>
        </form>

        <p>
          Don’t have an account? <NuxtLink to="/sign-up" class="link link-primary link-hover">
            Create account
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
