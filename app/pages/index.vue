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

      <AppFormField
        id="loginEmail"
        type="email"
        name="loginEmail"
        label="Email address"
        placeholder="e.g. alex@email.com"
      />
      <AppFormField
        id="loginPassword"
        type="password"
        name="loginPassword"
        label="Password"
        placeholder="Enter your password"
      />

      <template #controls>
        <AppFormButton type="submit">
          Login
        </AppFormButton>
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
