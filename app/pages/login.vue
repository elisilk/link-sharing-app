<script setup lang="ts">
const supabase = useSupabaseClient();
const redirectInfo = useSupabaseCookieRedirect();
const user = useSupabaseUser();

const email = ref("");
const password = ref("");
const loading = ref(false);

function redirect() {
  // Get redirect path, and clear it from the cookie
  const path = redirectInfo.pluck();
  // Redirect to the saved path, or fallback to home
  return navigateTo(path || "/");
}

watch(user, () => {
  // console.log(`Login page!\nRedirecting to: -> ${redirectInfo.path.value}`);
  if (user.value) {
    // Get redirect path, and clear it from the cookie
    const path = redirectInfo.pluck();
    // Redirect to the saved path, or fallback to home
    return navigateTo(path || "/");
  }
}, { immediate: true });

async function signInWithPassword() {
  loading.value = true;
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  loading.value = false;

  if (error) {
    // console.log(error);
    return;
  }

  // console.log(`Signin successful!\nRedirecting to: -> ${redirectInfo.path.value}`);
  redirect();
}
</script>

<template>
  <form novalidate @submit.prevent="signInWithPassword">
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
          v-model="email"
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
          v-model="password"
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
        <button
          type="submit"
          class="btn"
          :disabled="loading"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </template>

      <template #footer>
        Don’t have an account?
        <NuxtLink to="/register">
          Create account
        </NuxtLink>
      </template>
    </AppFormContainer>
  </form>
</template>
