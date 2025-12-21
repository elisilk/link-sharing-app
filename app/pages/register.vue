<script setup lang="ts">
async function createAccount() {
  await navigateTo("/");
}
</script>

<template>
  <form novalidate @submit.prevent="createAccount">
    <AppFormContainer>
      <template #title>
        Create account
      </template>
      <template #description>
        Let’s get you started sharing your links!
      </template>

      <ClientOnly>
        <AppFormTextField
          id="createAccountEmail"
          type="email"
          name="createAccountEmail"
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
          id="createAccountPassword"
          type="password"
          name="createAccountPassword"
          label="Create password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
          :error-messages="{
            valueMissing: 'Can\'t be empty',
          }"
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
          :error-messages="{
            valueMissing: 'Can\'t be empty',
          }"
        >
          <template #icon>
            <Icon name="my-icon:icon-password" />
          </template>
        </AppFormTextField>
      </ClientOnly>

      <p>Password must contain at least 8 characters</p>

      <template #controls>
        <button type="submit" class="btn">
          Create new account
        </button>
      </template>

      <template #footer>
        Already have an account?
        <NuxtLink to="/login">
          Login
        </NuxtLink>
      </template>
    </AppFormContainer>
  </form>
</template>
