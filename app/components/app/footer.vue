<script setup lang="ts">
const client = useSupabaseClient();

async function logout() {
  await client.auth.signOut();
  navigateTo("/login");
}
</script>

<template>
  <footer>
    <form id="logout-form" @submit.prevent="logout">
      <button type="submit" class="btn btn-secondary">
        Logout
      </button>
    </form>
  </footer>
</template>

<style scoped>
footer {
  padding: var(--space-200);
}

footer button {
  inline-size: unset;
}
</style>
