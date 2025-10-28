<script setup lang="ts">
async function login() {
  await navigateTo("/links");
}
</script>

<template>
  <form @submit.prevent="login">
    <AppFormContainer>
      <template #title>
        Login
      </template>
      <template #description>
        Add your details below to get back into the app
      </template>

      <ClientOnly>
        <AppFormTextField
          id="loginEmail"
          type="email"
          name="loginEmail"
          label="Email address"
          placeholder="e.g. alex@email.com"
          autocomplete="email"
        >
          <template #icon>
            <Icon name="my-icon:icon-email" />
          </template>
        </AppFormTextField>

        <AppFormTextField
          id="loginPassword"
          type="password"
          name="loginPassword"
          label="Password"
          placeholder="Enter your password"
          autocomplete="current-password"
        >
          <template #icon>
            <Icon name="my-icon:icon-password" />
          </template>
        </AppFormTextField>
      </ClientOnly>

      <template #controls>
        <button type="submit" class="btn">
          Login
        </button>
      </template>

      <template #footer>
        Don’t have an account?
        <NuxtLink to="/create">
          Create account
        </NuxtLink>
      </template>
    </AppFormContainer>
  </form>
</template>
