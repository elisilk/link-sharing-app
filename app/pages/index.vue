<script setup lang="ts">
async function login() {
  await navigateTo("/links");
}
</script>

<template>
  <form novalidate @submit.prevent="login">
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
          :error-messages="{
            badInput: 'Must be an email address',
            patternMismatch: 'Must be a valid email address',
            typeMismatch: 'Must be a valid email type',
          }"
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
          :error-messages="{
            valueMissing: 'Can\'t be empty',
          }"
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
