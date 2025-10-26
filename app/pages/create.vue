<script setup lang="ts">
async function createAccount() {
  await navigateTo("/");
}
</script>

<template>
  <form @submit.prevent="createAccount">
    <AppFormContainer>
      <template #title>
        Create account
      </template>
      <template #description>
        Let’s get you started sharing your links!
      </template>

      <AppFormTextField
        id="createAccountEmail"
        type="email"
        name="createAccountEmail"
        label="Email address"
        placeholder="e.g. alex@email.com"
        autocomplete="email"
      >
        <template #icon>
          <Icon name="my-icon:icon-email" />
        </template>
      </AppFormTextField>

      <AppFormTextField
        id="createAccountPassword"
        type="password"
        name="createAccountPassword"
        label="Create password"
        placeholder="At least 8 characters"
        autocomplete="new-password"
      >
        <template #icon>
          <Icon name="my-icon:icon-password" />
        </template>
      </AppFormTextField>

      <AppFormTextField
        id="createAccountPasswordConfirm"
        type="password"
        name="createAccountPasswordConfirm"
        label="Confirm password"
        placeholder="At least 8 characters"
        autocomplete="new-password"
      >
        <template #icon>
          <Icon name="my-icon:icon-password" />
        </template>
      </AppFormTextField>

      <p>Password must contain at least 8 characters</p>

      <template #controls>
        <AppFormButton type="submit">
          Create new account
        </AppFormButton>
      </template>

      <template #footer>
        Already have an account?
        <NuxtLink to="/">
          Login
        </NuxtLink>
      </template>
    </AppFormContainer>
  </form>
</template>
